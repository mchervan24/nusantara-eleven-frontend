<<<<<<< HEAD
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
=======
// frontend/src/types/product.ts
export interface Product {
  _id: string; // ID dari MongoDB
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  imageUrl?: string; // Sesuai dengan backend
  team?: string;
  country?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface CartItem {
  _id: string; // ID produk
  name: string; // Nama produk
  imageUrl?: string;
  price: number;
  quantity: number;
  // Jika ada ukuran atau nameset, bisa ditambahkan di sini
  // ukuran?: string;
  // nameset?: string;
>>>>>>> 1f4aa32 (Fix: Correct react-router-dom version and type imports for Vercel build)
}