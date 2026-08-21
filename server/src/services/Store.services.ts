import { pool } from '../config/pg';
import type {
  CreateProductData,
  ExistingProductImage,
  NewProduct,
  UpdateFormProductData,
} from '../types/product.types';
import { uploadImage } from '../utils/UploadImage';
import { UpdateProductData } from '../types/product.types';
import { supabaseAdmin } from '../config/supabase';

// ============================================================
// CREATE PRODUCT
// ============================================================

export async function createProduct(
  data: CreateProductData
): Promise<NewProduct> {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // --------------------------------------------------------
    // 1. Create product
    // --------------------------------------------------------

    const productResult = await client.query(
      `
      INSERT INTO products (
        store_id,
        category_id,
        name,
        description,
        sku,
        price,
        status,
        stock,
        discount
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING id
      `,
      [
        data.storeid,
        data.categoryid,
        data.name,
        data.description,
        data.sku,
        data.price,
        data.status,
        data.stock,
        data.discount ?? 0,
      ]
    );

    const productId = productResult.rows[0].id;

    // --------------------------------------------------------
    // 2. Create variants
    // --------------------------------------------------------

    const productVariants = (
      await Promise.all(
        data.variants.map((v) => {
          const sku = `${data.name}-${v.color}-${v.size}-${Date.now()}`;

          return client.query(
            `
            INSERT INTO product_variants (
              product_id,
              sku,
              size,
              color,
              price,
              stock
            )
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING
              id,
              product_id,
              sku,
              size,
              color,
              price,
              stock
            `,
            [productId, sku, v.size, v.color, v.price, v.stock]
          );
        })
      )
    ).map((result) => result.rows[0]);

    // --------------------------------------------------------
    // 3. Upload product images
    // --------------------------------------------------------

    const productImageUrls = await Promise.all(
      data.images.map((image) =>
        uploadImage(image, `products/${productId}`, 'product-image')
      )
    );

    // --------------------------------------------------------
    // 4. Save product images
    // --------------------------------------------------------

    await Promise.all(
      productImageUrls.map((url, index) =>
        client.query(
          `
          INSERT INTO product_images (
            product_id,
            image_url,
            is_primary
          )
          VALUES ($1, $2, $3)
          `,
          [productId, url, index === 0]
        )
      )
    );

    // --------------------------------------------------------
    // 5. Commit
    // --------------------------------------------------------

    await client.query('COMMIT');

    // --------------------------------------------------------
    // 6. Return product
    // --------------------------------------------------------

    return {
      id: productId,
      storeId: data.storeid,
      categoryId: data.categoryid,
      name: data.name,
      description: data.description,
      sku: data.sku,
      price: data.price,
      status: data.status,
      stock: data.stock,
      discount: data.discount ?? 0,
      images: productImageUrls,
      variants: productVariants,
    };
  } catch (error) {
    await client.query('ROLLBACK');

    throw error;
  } finally {
    client.release();
  }
}

export async function updateProduct(
  productId: string,
  storeId: string,
  data: UpdateFormProductData
): Promise<UpdateProductData> {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // --------------------------------------------------------
    // 1. Check product belongs to store
    // --------------------------------------------------------

    const existingProduct = await client.query(
      `
      SELECT id
      FROM products
      WHERE id = $1
      AND store_id = $2
      `,
      [productId, storeId]
    );

    if (existingProduct.rows.length === 0) {
      throw new Error('Product not found or you do not own this product');
    }

    const productResult = await client.query(
      `
      UPDATE products
      SET
        category_id = $1,
        name = $2,
        description = $3,
        sku = $4,
        price = $5,
        status = $6,
        stock = $7,
        discount = $8,
        updated_at = NOW()
      WHERE id = $9
      AND store_id = $10
      RETURNING id
      `,
      [
        data.categoryid,
        data.name,
        data.description,
        data.sku,
        data.price,
        data.status,
        data.stock,
        data.discount ?? 0,
        productId,
        storeId,
      ]
    );

    await client.query(
      `
      DELETE FROM product_variants
      WHERE product_id = $1
      `,
      [productId]
    );

    const productVariants = (
      await Promise.all(
        data.variants.map((v) => {
          const sku = `${data.name}-${v.color}-${v.size}-${Date.now()}`;

          return client.query(
            `
            INSERT INTO product_variants (
              product_id,
              sku,
              size,
              color,
              price,
              stock
            )
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING
              id,
              product_id,
              sku,
              size,
              color,
              price,
              stock
            `,
            [productId, sku, v.size, v.color, v.price, v.stock]
          );
        })
      )
    ).map((result) => result.rows[0]);

    const existingImageResult = await client.query(
      `SELECT id, image_url, is_primary
      FROM product_images
      WHERE product_id = $1
      ORDER BY created_at ASC
      `,
      [productId]
    );

    let productImagesUrl: string[] = existingImageResult.rows.map(
      (image: ExistingProductImage) => image.image_url
    );

    if (data.images && data.images.length > 0) {
      const oldFilePaths = productImagesUrl.map(
        (url) => url.split('/storage/v1/object/public/product-image/')[1]
      );

      if (oldFilePaths.length > 0) {
        const { error: storageError } = await supabaseAdmin.storage
          .from('product-image')
          .remove(oldFilePaths);

        if (storageError) {
          throw new Error(
            `Failed to delete old product images: ${storageError.message}`
          );
        }
      }

      await client.query(
        `
        DELETE FROM product_images
        WHERE product_id = $1
        `,
        [productId]
      );

      productImagesUrl = await Promise.all(
        data.images.map((image) =>
          uploadImage(image, `products/${productId}`, 'product-image')
        )
      );

      await Promise.all(
        productImagesUrl.map((url, index) =>
          client.query(
            `
            INSERT INTO product_images (
              product_id,
              image_url,
              is_primary
            )
            VALUES ($1, $2, $3)
            `,
            [productId, url, index === 0]
          )
        )
      );
    }

    await client.query('COMMIT');

    const updatedProduct: UpdateProductData = {
      id: productResult.rows[0].id,
      storeid: productResult.rows[0].store_id,
      categoryid: productResult.rows[0].category_id,

      name: productResult.rows[0].name,
      description: productResult.rows[0].description,
      sku: productResult.rows[0].sku,

      price: productResult.rows[0].price,
      status: productResult.rows[0].status,
      stock: productResult.rows[0].stock,
      discount: productResult.rows[0].discount,

      images: productImagesUrl,

      variants: productVariants,
    };

    return updatedProduct;
  } catch (error) {
    await client.query('ROLLBACK');

    throw error;
  } finally {
    client.release();
  }
}

export async function deleteProduct(productId: string, storeId: string) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // --------------------------------------------------------
    // 1. Check ownership
    // --------------------------------------------------------

    const existingProduct = await client.query(
      `
      SELECT id
      FROM products
      WHERE id = $1
      AND store_id = $2
      `,
      [productId, storeId]
    );

    if (existingProduct.rows.length === 0) {
      throw new Error('Product not found or you do not own this product');
    }

    // --------------------------------------------------------
    // 2. Delete product
    // --------------------------------------------------------
    //
    // product_images → ON DELETE CASCADE
    //
    // product_variants → ON DELETE CASCADE
    //
    // variant_images → ON DELETE CASCADE
    //

    await client.query(
      `
      DELETE FROM products
      WHERE id = $1
      AND store_id = $2
      `,
      [productId, storeId]
    );

    // --------------------------------------------------------
    // 3. Commit
    // --------------------------------------------------------

    await client.query('COMMIT');

    return {
      message: 'Product deleted successfully',
      productId,
    };
  } catch (error) {
    await client.query('ROLLBACK');

    throw error;
  } finally {
    client.release();
  }
}
