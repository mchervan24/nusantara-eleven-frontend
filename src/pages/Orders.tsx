// frontend/src/pages/Orders.tsx
import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

interface OrderItem {
  _id: string;
  name: string;
  quantity: number;
  price: number;
  imageUrl?: string;
}

interface Order {
  _id: string;
  items: OrderItem[];
  totalPrice: number;
  shippingAddress: string;
  paymentMethod: string;
  status: string;
  createdAt: string;
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Asumsi endpoint untuk mengambil pesanan pengguna yang terautentikasi
        const res = await api.get('/api/orders/my-orders'); 
        setOrders(res.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Gagal mengambil daftar pesanan.');
        toast.error('Gagal mengambil daftar pesanan.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500 p-6">Memuat daftar pesanan...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 p-6">Error: {error}</p>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white shadow-lg rounded-lg my-10">
      <h1 className="text-3xl font-bold text-blue-600 mb-8 text-center">Daftar Pesanan Anda</h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">Anda belum memiliki pesanan.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="border border-gray-200 rounded-md p-4 shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-semibold text-gray-800">Pesanan ID: {order._id}</h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                  order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {order.status}
                </span>
              </div>
              <p className="text-gray-600 mb-2">Tanggal Pesan: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p className="text-gray-600 mb-2">Total: <span className="font-bold text-green-700">Rp{order.totalPrice.toLocaleString('id-ID')}</span></p>
              
              <div className="mb-3">
                <h3 className="text-lg font-medium text-gray-700 mb-2">Item Pesanan:</h3>
                <ul className="list-disc pl-5">
                  {order.items.map((item) => (
                    <li key={item._id} className="text-gray-600">
                      {item.name} x {item.quantity} (Rp{item.price.toLocaleString('id-ID')})
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-right mt-4">
                <Link
                  to={`/invoice/${order._id}`}
                  className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
                >
                  Lihat Faktur
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Orders;