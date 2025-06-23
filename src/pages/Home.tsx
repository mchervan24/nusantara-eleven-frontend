// frontend/src/pages/Home.tsx
import React from 'react';
import Products from './Products'; // Mengimpor komponen Products

const Home: React.FC = () => {
  return (
    <div>
      {/* Anda bisa menambahkan header, banner, atau komponen lain di sini */}
      <h1 className="text-4xl font-bold text-center my-8 text-blue-800">Selamat Datang di Toko Jersey!</h1>
      <p className="text-xl text-center text-gray-600 mb-10">Temukan jersey favorit Anda dari seluruh dunia.</p>
      
      {/* Bagian untuk menampilkan produk, bisa saja Products di sini */}
      <Products />
    </div>
  );
};
export default Home;