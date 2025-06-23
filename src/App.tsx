// src/App.tsx
import React from 'react';
// Pastikan Anda sudah menginstal react-router-dom: npm install react-router-dom
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Impor komponen Header yang sudah Anda buat
import Header from './components/Header';
// Impor halaman daftar produk
import ProductListPage from './pages/ProductListPage';
// Impor halaman detail produk
import ProductDetailPage from './pages/ProductDetailPage';

function App() {
  return (
    // Gunakan Router untuk mengaktifkan routing di aplikasi Anda
    <Router>
      {/* Header akan ditampilkan di semua halaman karena berada di luar Routes */}
      <Header />
      <main>
        {/* Routes mendefinisikan rute-rute aplikasi Anda */}
        <Routes>
          {/* Rute untuk halaman utama (daftar produk). Jika URL adalah '/', tampilkan ProductListPage */}
          <Route path="/" element={<ProductListPage />} />
          {/* Rute alternatif untuk halaman produk, jika Anda ingin '/products' juga menunjuk ke sana */}
          <Route path="/products" element={<ProductListPage />} />
          {/* Rute untuk halaman detail produk. ':id' adalah parameter dinamis (ID produk) */}
          <Route path="/products/:id" element={<ProductDetailPage />} />
          {/* Anda bisa menambahkan rute lain di sini nanti, misalnya untuk keranjang, login, dll. */}
        </Routes>
      </main>
      {/* Anda bisa menambahkan komponen Footer di sini jika ada */}
    </Router>
  );
}

export default App;