// frontend/src/pages/Cart.tsx
import React, { useEffect, useState } from 'react';
import { getCart, updateCartItemQuantity, removeFromCart, clearCart } from '../utils/cart';
import { CartItem } from '../types/Product';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setCartItems(getCart());
  }, []);

  const handleQuantityChange = (_id: string, newQuantity: number) => {
    updateCartItemQuantity(_id, newQuantity);
    setCartItems(getCart()); // Perbarui state keranjang
    if (newQuantity > 0) {
      toast.success("Kuantitas diperbarui!");
    } else {
      toast.success("Produk dihapus dari keranjang!");
    }
  };

  const handleRemoveItem = (_id: string) => {
    removeFromCart(_id);
    setCartItems(getCart()); // Perbarui state keranjang
    toast.success("Produk dihapus dari keranjang!");
  };

  const handleClearCart = () => {
    clearCart();
    setCartItems([]);
    toast.success("Keranjang belanja dikosongkan!");
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg my-10">
      <h1 className="text-3xl font-bold text-blue-600 mb-8 text-center">Keranjang Belanja Anda</h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-600">
          <p className="text-lg mb-4">Keranjang Anda kosong.</p>
          <Link to="/products" className="bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600 transition">
            Mulai Belanja
          </Link>
        </div>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item._id} className="flex items-center border-b border-gray-200 py-4 last:border-b-0">
              <img
                src={item.imageUrl || "https://via.placeholder.com/100x80?text=No+Image"}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-md mr-4"
              />
              <div className="flex-grow">
                <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
                <p className="text-gray-600">Harga: Rp{item.price.toLocaleString('id-ID')}</p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                    className="bg-gray-200 text-gray-700 px-3 py-1 rounded-l-md hover:bg-gray-300 transition"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 border-t border-b border-gray-200">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                    className="bg-gray-200 text-gray-700 px-3 py-1 rounded-r-md hover:bg-gray-300 transition"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemoveItem(item._id)}
                    className="ml-4 text-red-500 hover:text-red-700 transition"
                  >
                    Hapus
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">Rp{(item.price * item.quantity).toLocaleString('id-ID')}</p>
              </div>
            </div>
          ))}

          <div className="mt-8 pt-4 border-t border-gray-300 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Total:</h2>
            <p className="text-2xl font-bold text-blue-700">Rp{calculateTotalPrice().toLocaleString('id-ID')}</p>
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={handleClearCart}
              className="bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600 transition"
            >
              Kosongkan Keranjang
            </button>
            <Link
              to="/checkout"
              className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition"
            >
              Lanjutkan ke Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
export default Cart;