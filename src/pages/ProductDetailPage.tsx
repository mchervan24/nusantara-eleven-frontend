// src/pages/ProductDetailPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../api/productApi';
import { Product } from '../types/Product'; // Pastikan hanya ada SATU baris ini

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Dapatkan ID dari URL, ini akan menjadi '_id'
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProduct = async () => {
      if (!id) {
        setError("ID produk tidak valid.");
        setLoading(false);
        return;
      }
      try {
        const data = await fetchProductById(id); // Gunakan ID dari params
        setProduct(data);
      } catch (err) {
        setError("Gagal memuat detail produk. Silakan coba lagi nanti.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]); // Dependensi ID agar useEffect dijalankan lagi jika ID berubah

  if (loading) {
    return <div className="text-center p-8 text-xl font-semibold">Memuat detail produk...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-600 font-semibold">{error}</div>;
  }

  if (!product) {
    return <div className="text-center p-8 text-gray-600">Produk tidak ditemukan.</div>;
  }

  // Gunakan 'imageUrl' dari data produk
  const primaryImageUrl = product.imageUrl || 'https://via.placeholder.com/600x600?text=No+Image';

  return (
    <div className="container mx-auto px-8 py-8">
      <div className="flex flex-col md:flex-row gap-12 bg-white rounded-lg shadow-lg p-8">
        {/* Gambar Produk - Sisi Kiri */}
        <div className="md:w-1/2 flex flex-col items-center">
          <img
            src={primaryImageUrl}
            alt={product.name}
            className="w-full max-w-lg h-auto object-contain rounded-lg shadow-md mb-4"
          />
          {/* Thumbnail Gallery - Bisa dikembangkan jika ada multiple images */}
        </div>

        {/* Detail Produk - Sisi Kanan */}
        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-xl text-gray-600 mb-4">
              {product.category && `Kategori: ${product.category}`}
              {product.stock !== undefined && product.stock !== null && ` | Stok: ${product.stock}`}
            </p>
            <p className="text-5xl font-bold text-red-600 mb-6">Rp{product.price.toLocaleString('id-ID')}</p>

            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Deskripsi</h2>
              <p className="text-gray-700 leading-relaxed">
                {product.description || 'Tidak ada deskripsi tersedia untuk jersey ini.'}
              </p>
            </div>

            {/* Opsi Ukuran & Kuantitas (Contoh Inspirasi) */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Pilih Ukuran</h2>
              <div className="flex space-x-3 mb-4">
                {['S', 'M', 'L', 'XL'].map(size => (
                  <button
                    key={size}
                    className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {size}
                  </button>
                ))}
              </div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Kuantitas</h2>
              <input
                type="number"
                min="1"
                defaultValue="1"
                className="border border-gray-300 rounded-md p-2 w-20 text-center"
              />
            </div>
          </div>

          {/* Tombol Tambah ke Keranjang */}
          <button className="bg-gray-900 text-white font-bold py-4 px-6 rounded-lg text-xl hover:bg-gray-700 transition-colors duration-300">
            Tambah ke Keranjang
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;