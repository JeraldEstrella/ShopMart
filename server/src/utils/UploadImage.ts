import { supabaseAdmin } from '../config/supabase';

export async function uploadImage(
  file: Express.Multer.File,
  folder: string,
  bucket: 'product-image'
): Promise<string> {
  const fileName = `${Date.now()}-${file.originalname}`;

  const filePath = `${folder}/${fileName}`;

  const { error } = await supabaseAdmin.storage
    .from(bucket)
    .upload(filePath, file.buffer, {
      contentType: file.mimetype,
      upsert: false,
    });

  if (error) {
    throw new Error(`Image upload failed: ${error.message}`);
  }

  const { data } = supabaseAdmin.storage
    .from('product-image')
    .getPublicUrl(filePath);

  return data.publicUrl;
}
