// src/api/productApi.ts

// Pastikan BASE_URL ini benar-benar URL utama backend Anda
const BASE_URL = 'https://nusantara-eleven-api-backend-production.up.railway.app/api';

export const fetchProducts = async () => {
  try {
    // URL lengkap untuk mendapatkan semua produk
    const response = await fetch(`${BASE_URL}/products`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // Jika backend Anda langsung mengembalikan array produk (bukan { message: '...', data: [...] }),
    // maka cukup return data;
    return data; // Sesuaikan ini: jika backend langsung array, cukup 'return data;'
                 // Jika seperti Laravel sebelumnya, maka 'return data.data;'
                 // Dari percobaan, backend Anda langsung mengembalikan array produk.
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const fetchProductById = async (id: string) => { // 'id' di sini adalah '_id' dari backend
  try {
    // URL lengkap untuk mendapatkan detail produk berdasarkan ID
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // Sama seperti fetchProducts, sesuaikan return jika backend langsung mengembalikan objek produk
    return data; // Jika backend langsung objek, cukup 'return data;'
                 // Jika seperti Laravel sebelumnya, maka 'return data.data;'
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    return null;
  }
};