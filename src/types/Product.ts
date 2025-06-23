// src/types/Product.ts

export interface Product {
  _id: string; // Ubah dari 'id: number' menjadi '_id: string'
  name: string;
  description: string;
  price: number;
  stock: number; // Tambahkan field 'stock'
  imageUrl?: string; // Ubah dari 'image_url?: string' menjadi 'imageUrl?: string'
  category?: string; // Tambahkan field 'category'
  // createdAt dan updatedAt mungkin ada atau tidak dari backend ini.
  // Jika ada, tambahkan: createdAt?: string; updatedAt?: string;
  // Jika tidak, abaikan. Untuk saat ini, kita ikuti yang ada di backend.
}