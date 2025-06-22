// src/App.tsx (atau src/App.jsx)
import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; // Sesuaikan jika tidak ada file CSS ini

// Interface untuk TypeScript, jika menggunakan JavaScript bisa diabaikan
interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image?: string; // <--- TAMBAHKAN BARIS INI (opsional, karena mungkin ada produk tanpa gambar)
  category?: string; // <--- TAMBAHKAN BARIS INI jika Anda ingin menampilkannya atau memiliki di data
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Ganti URL dengan URL publik API Backend Railway Anda
        const response = await axios.get('https://nusantara-eleven-api-backend-production.up.railway.app/api/products');
        setProducts(response.data);
      } catch (err) {
        setError('Gagal mengambil data produk dari API.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="App">Memuat produk...</div>;
  }

  if (error) {
    return <div className="App" style={{ color: 'red' }}>Error: {error}</div>;
  }

  return (
    <div className="App">
      <h1>Daftar Produk Nusantara Eleven</h1>
      {products.length === 0 ? (
        <p>Tidak ada produk ditemukan. Coba pastikan backend Anda memiliki data atau jalankan seeder.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              {/* Tambahkan tag gambar di sini */}
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: '150px', height: 'auto', marginBottom: '10px' }} // Sesuaikan gaya jika diperlukan
                />
              )}
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>Harga: Rp {product.price}</p>
              <p>Stok: {product.stock}</p>
              {product.category && <p>Kategori: {product.category}</p>} {/* Menampilkan kategori jika ada */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;