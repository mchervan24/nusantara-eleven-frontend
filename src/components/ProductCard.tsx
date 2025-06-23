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
  );
};

export default ProductCard;