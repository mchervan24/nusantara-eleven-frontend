<<<<<<< HEAD
// src/components/ProductCard.tsx
import React from 'react';
import { Product } from '../types/Product';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Gunakan 'imageUrl' dan fallback jika kosong
  const imageUrl = product.imageUrl || 'https://via.placeholder.com/400x400?text=No+Image';

  return (
    // Gunakan '_id' untuk link ke halaman detail produk
    <Link to={`/products/${product._id}`} className="block group">
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
        {/* Gambar Produk */}
        <div className="relative overflow-hidden">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-64 object-cover transform transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-white text-sm font-semibold p-2 bg-gray-900 bg-opacity-75 rounded">Lihat Detail</span>
          </div>
        </div>

        {/* Informasi Produk */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 leading-tight">{product.name}</h3>
          {/* Anda mungkin ingin menampilkan klub dan musim di sini jika data backend Anda menyediakan */}
          {/* Untuk backend Anda, mungkin lebih cocok menampilkan deskripsi singkat atau kategori */}
          <p className="text-sm text-gray-500 mb-2">
            {product.category && `Kategori: ${product.category}`}
            {product.stock !== undefined && product.stock !== null && ` | Stok: ${product.stock}`}
          </p>
          <p className="text-xl font-bold text-gray-800">Rp{product.price.toLocaleString('id-ID')}</p>
        </div>
      </div>
    </Link>
=======
// frontend/src/components/ProductCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { addToCart as utilAddToCart } from '../utils/cart';
import { Product } from '../types/Product'; // Import tipe Product

interface ProductCardProps {
  product: Product; // Menerima objek produk lengkap
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { _id, name, price, stock, imageUrl, team, category } = product; // Destrukturisasi properti

  const handleAddToCart = () => {
    utilAddToCart(product, 1); // Teruskan objek product lengkap
    toast.success(`${name} ditambahkan ke keranjang!`);
  };

  return (
    <div className="border rounded-lg p-4 bg-white shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <img
        src={imageUrl || "https://via.placeholder.com/300x200?text=No+Image"} // Menggunakan imageUrl
        alt={name}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <div className="flex-grow">
        <h2 className="text-xl font-semibold text-gray-800 mb-1">{name}</h2> {/* Menggunakan name */}
        {team && <p className="text-sm text-gray-600 mb-1">Tim: <span className="font-medium">{team}</span></p>}
        {category && <p className="text-sm text-gray-600 mb-1">Kategori: <span className="font-medium">{category}</span></p>}
        <p className="text-sm text-gray-600 mb-1">Stok: <span className="font-medium">{stock}</span></p>
        <p className="text-sm text-gray-600 mb-3">Harga: <span className="font-bold text-green-700">Rp{price.toLocaleString('id-ID')}</span></p>
      </div>
      
      <div className="mt-auto">
        <Link
          to={`/detail/${_id}`}
          className="block w-full text-center bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-colors duration-300 mb-2"
        >
          Lihat Detail
        </Link>
        <button
          onClick={handleAddToCart}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300"
          disabled={stock === 0} // Nonaktifkan tombol jika stok 0
        >
          {stock === 0 ? "Stok Habis" : "Tambah ke Keranjang"}
        </button>
      </div>
    </div>
>>>>>>> 1f4aa32 (Fix: Correct react-router-dom version and type imports for Vercel build)
  );
};

export default ProductCard;