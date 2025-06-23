// frontend/src/utils/cart.ts
import { CartItem, Product } from '../types/Product';

const CART_KEY = "cart_items";

export const getCart = (): CartItem[] => {
  const raw = localStorage.getItem(CART_KEY);
  return raw ? JSON.parse(raw) : [];
};

// Fungsi untuk menambahkan produk ke keranjang
export const addToCart = (product: Product, quantity: number = 1) => {
  const cart = getCart();
  const existingItemIndex = cart.findIndex(
    (item) => item._id === product._id
  );

  if (existingItemIndex >= 0) {
    // Jika produk sudah ada, tingkatkan kuantitasnya
    cart[existingItemIndex].quantity += quantity;
  } else {
    // Jika produk belum ada, tambahkan sebagai item baru
    cart.push({
      _id: product._id,
      name: product.name,
      imageUrl: product.imageUrl,
      price: product.price,
      quantity: quantity,
      // Tambahkan properti lain yang relevan jika perlu (misal: ukuran, nameset)
    });
  }
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const removeFromCart = (_id: string) => {
  let cart = getCart();
  cart = cart.filter((item) => item._id !== _id);
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const updateCartItemQuantity = (_id: string, quantity: number) => {
  const cart = getCart();
  const existingItemIndex = cart.findIndex((item) => item._id === _id);

  if (existingItemIndex >= 0) {
    if (quantity <= 0) {
      removeFromCart(_id);
    } else {
      cart[existingItemIndex].quantity = quantity;
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }
  }
};

export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
};