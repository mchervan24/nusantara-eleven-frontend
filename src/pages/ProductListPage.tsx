// src/pages/ProductListPage.tsx
import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../api/productApi';
import { Product } from '../types/Product';
import ProductCard from '../components/ProductCard';

const ProductListPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]); // Pastikan inisialisasi sebagai array kosong
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        // Pastikan data yang diterima adalah array sebelum disimpan ke state
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          // Jika data bukan array (misal objek kosong atau null), set error
          setError("Format data produk tidak valid dari API.");
          console.error("API response was not an array:", data);
        }
      } catch (err) {
        setError("Gagal memuat produk. Silakan coba lagi nanti.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  if (loading) {
    return <div className="text-center p-8 text-xl font-semibold">Memuat produk...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-600 font-semibold">{error}</div>;
  }

  return (
    <div className="container mx-auto px-8 py-8">
      {/* Hero Section Sederhana ala Nike */}
      <div className="bg-gray-100 p-12 mb-10 rounded-lg text-center">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">Temukan Jersey Impianmu</h1>
        <p className="text-xl text-gray-600">Koleksi terbaru dari klub favoritmu.</p>
      </div>

      {/* Area Filter & Sorting (Placeholder Inspirasi Nike) */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Semua Jersey</h2>
        <div className="flex items-center space-x-4">
          <select className="border border-gray-300 rounded-md p-2 text-gray-700">
            <option>Urutkan Berdasarkan</option>
            <option>Harga: Rendah ke Tinggi</option>
            <option>Harga: Tinggi ke Rendah</option>
            <option>Terbaru</option>
          </select>
          <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
            </svg>
            Filter
          </button>
        </div>
      </div>

      {/* Grid Produk */}
      {/* Tambahkan kondisi untuk memastikan 'products' adalah array dan tidak kosong */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map(product => (
            // Pastikan product._id ada dan unik untuk key
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        // Tampilkan pesan jika tidak ada produk setelah loading selesai
        <p className="text-center text-gray-600 mt-10">Tidak ada produk ditemukan. Pastikan backend Anda berjalan dan memiliki data.</p>
      )}
    </div>
  );
};

export default ProductListPage;