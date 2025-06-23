// src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom'; // Asumsi Anda menggunakan react-router-dom

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 py-4 px-8 sticky top-0 z-10 shadow-sm">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/" className="font-bold text-2xl text-gray-800">
          <span className="text-red-600">Nusantara</span> Eleven
        </Link>

        {/* Navigasi Kanan (bisa dikembangkan) */}
        <nav className="flex items-center space-x-6">
          <Link to="/" className="text-gray-600 hover:text-gray-900 font-medium text-lg">Beranda</Link>
          <Link to="/products" className="text-gray-600 hover:text-gray-900 font-medium text-lg">Produk</Link>
          {/* Anda bisa menambahkan link lain seperti Login/Register, Keranjang */}
          {/* Contoh ikon keranjang sederhana */}
          <button className="text-gray-600 hover:text-gray-900">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header; // <--- PASTIKAN BARIS INI ADA DAN TIDAK ADA TYPO