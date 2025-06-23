// frontend/src/pages/Detail.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { Product } from '../types/Product';
import { addToCart as utilAddToCart } from '../utils/cart';

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // ID produk dari URL
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return; // Pastikan ID ada

      try {
        const res = await api.get(`/api/products/${id}`); // Endpoint sesuai backend
        setProduct(res.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Gagal mengambil detail produk.");
        toast.error("Gagal mengambil detail produk.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      utilAddToCart(product, 1);
      toast.success(`${product.name} ditambahkan ke keranjang!`);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500 p-6">Memuat detail produk...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 p-6">Error: {error}</p>;
  }

  if (!product) {
    return <p className="text-center text-gray-500 p-6">Produk tidak ditemukan.</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg my-10 flex flex-col md:flex-row">
      <div className="md:w-1/2">
        <img
          src={product.imageUrl || "https://via.placeholder.com/400x300?text=No+Image"}
          alt={product.name}
          className="w-full h-auto object-cover rounded-lg shadow-md"
        />
      </div>
      <div className="md:w-1/2 md:pl-8 mt-6 md:mt-0">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
        {product.team && <p className="text-lg text-gray-700 mb-1">Tim: <span className="font-semibold">{product.team}</span></p>}
        {product.category && <p className="text-lg text-gray-700 mb-1">Kategori: <span className="font-semibold">{product.category}</span></p>}
        <p className="text-2xl font-bold text-green-700 mb-4">Rp{product.price.toLocaleString('id-ID')}</p>
        <p className="text-gray-800 mb-4 leading-relaxed">{product.description}</p>
        <p className="text-md text-gray-600 mb-4">Stok Tersedia: <span className="font-semibold">{product.stock}</span></p>
        
        <button
          onClick={handleAddToCart}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-md text-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300"
          disabled={product.stock === 0}
        >
          {product.stock === 0 ? "Stok Habis" : "Tambah ke Keranjang"}
        </button>
      </div>
    </div>
  );
};
export default Detail;