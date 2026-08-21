import type { Product } from '../types/product.types';

class StoreService {
  async addProduct(productData: Product) {
    if (!productData || !productData.title || !productData.price) {
      throw new Error('Invalid input, please complete all fields.');
    }

    const response = await fetch(
      `http://localhost:8080/api/product/addproduct`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Cannot add this product');
    }

    const data = await response.json();
    return data;
  }

  async getStoreProducts(storeId: string): Promise<Product[]> {
    if (storeId) throw new Error('StoreID is missings');

    const response = await fetch(
      `http://localhost:8080/api/store/get/${storeId}`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData || 'Cannot get the store products');
    }

    const data = await response.json();

    return data;
  }

  async updateProduct(productData: Product) {
    if (productData) throw new Error('Product Input the required field');

    const { id } = productData;
    const productId = Number(id);

    const response = await fetch(
      `http://localhost:8080/api/product/update/${productId}`,
      {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Cannot update the product');
    }

    const data = response.json();

    return data;
  }
}
