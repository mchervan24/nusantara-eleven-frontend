// frontend/src/pages/Checkout.tsx
import React, { useState, useEffect } from 'react';
import { getCart, clearCart } from '../utils/cart';
import { CartItem } from '../types/Product';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios'; // Pastikan axios terkonfigurasi

const Checkout: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod'); // Default COD
  const navigate = useNavigate();

  useEffect(() => {
    const items = getCart();
    if (items.length === 0) {
      toast.error("Keranjang Anda kosong. Silakan belanja terlebih dahulu.");
      navigate('/products');
    }
    setCartItems(items);
  }, [navigate]);

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      toast.error("Keranjang kosong. Tidak bisa melakukan checkout.");
      return;
    }
    if (!address.trim()) {
      toast.error("Alamat pengiriman tidak boleh kosong.");
      return;
    }

    try {
      const orderData = {
        items: cartItems.map(item => ({
          productId: item._id, // Sesuaikan dengan ID produk di backend
          quantity: item.quantity,
          price: item.price,
          // tambahkan properti lain yang relevan seperti ukuran, nameset jika ada
        })),
        shippingAddress: address,
        paymentMethod: paymentMethod,
        totalPrice: calculateTotalPrice(),
      };

      // Asumsi ada endpoint /api/orders untuk membuat pesanan
      const response = await api.post('/api/orders', orderData); 
      
      clearCart(); // Kosongkan keranjang setelah berhasil checkout
      toast.success('Pesanan Anda berhasil dibuat!');
      navigate(`/orders`); // Arahkan ke halaman daftar pesanan atau detail pesanan baru
      // Jika backend mengembalikan ID pesanan: navigate(`/orders/${response.data.orderId}`);
    } catch (error: any) {
      console.error('Error saat membuat pesanan:', error);
      toast.error(error.response?.data?.message || 'Gagal membuat pesanan. Silakan coba lagi.');
    }
  };

  if (cartItems.length === 0) {
    return null; // Atau tampilkan pesan loading/pengalihan
  }

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg my-10">
      <h1 className="text-3xl font-bold text-blue-600 mb-8 text-center">Checkout</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Ringkasan Pesanan</h2>
        {cartItems.map((item) => (
          <div key={item._id} className="flex justify-between items-center border-b border-gray-200 py-2">
            <div className="flex items-center">
              <img src={item.imageUrl || "https://via.placeholder.com/50x50"} alt={item.name} className="w-12 h-12 object-cover rounded-md mr-3" />
              <p className="text-gray-700">{item.name} x {item.quantity}</p>
            </div>
            <p className="font-semibold">Rp{(item.price * item.quantity).toLocaleString('id-ID')}</p>
          </div>
        ))}
        <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-300">
          <p className="text-xl font-bold text-gray-800">Total Pembayaran:</p>
          <p className="text-2xl font-bold text-blue-700">Rp{calculateTotalPrice().toLocaleString('id-ID')}</p>
        </div>
      </div>

      <form onSubmit={handleSubmitOrder}>
        <div className="mb-6">
          <label htmlFor="address" className="block text-gray-700 text-lg font-semibold mb-2">Alamat Pengiriman</label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={4}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Masukkan alamat lengkap Anda..."
            required
          ></textarea>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-lg font-semibold mb-2">Metode Pembayaran</label>
          <div className="flex items-center space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={paymentMethod === 'cod'}
                onChange={() => setPaymentMethod('cod')}
                className="form-radio h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-gray-700">Cash On Delivery (COD)</span>
            </label>
            {/* Anda bisa menambahkan opsi pembayaran lain di sini */}
            {/* <label className="inline-flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="bank_transfer"
                checked={paymentMethod === 'bank_transfer'}
                onChange={() => setPaymentMethod('bank_transfer')}
                className="form-radio h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-gray-700">Transfer Bank</span>
            </label> */}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-md text-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors duration-300"
        >
          Konfirmasi Pesanan
        </button>
      </form>
    </div>
  );
};
export default Checkout;