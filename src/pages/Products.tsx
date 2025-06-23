// frontend/src/pages/Products.tsx
import { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import ProductCard from "../components/ProductCard"; // Mengimpor ProductCard
import { Product } from '../types/Product'; // Import tipe Product

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]); // Menggunakan nama products
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/api/products"); // Endpoint sesuai backend
        setProducts(res.data); // Backend mengembalikan array produk langsung, bukan { data: [...] }
      } catch (err: any) {
        setError(err.response?.data?.message || "Gagal mengambil data produk.");
        toast.error("Gagal mengambil data produk.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500 p-6">Memuat produk...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 p-6">Error: {error}</p>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">Daftar Jersey</h1>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
           <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p className="col-span-full text-center text-gray-500">Tidak ada produk yang ditemukan.</p>
      )}
    </div>
  );
};

export default Products;