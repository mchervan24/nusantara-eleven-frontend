// frontend/src/pages/Login.tsx
import React, { useState } from "react";
import api from "../api/axios"; // Menggunakan instance api yang sudah dikonfigurasi
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/login", { // Sesuaikan endpoint jika berbeda
        email,
        password,
      });

      const { token } = response.data; // Asumsi backend mengembalikan token
      localStorage.setItem("token", token);
      toast.success("Login berhasil!");
      navigate("/");
    } catch (error: any) {
      console.error("❌ Login gagal:", error);
      toast.error(
        error?.response?.data?.message ||
        "Login gagal. Periksa kembali email dan password."
      );
    }
  };

  const handleGoogleLogin = () => {
    // Ini harus mengarahkan ke endpoint backend Anda yang memulai alur Google OAuth
    // Contoh: window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/google`;
    toast.info("Fitur login Google belum diimplementasikan sepenuhnya. Silakan gunakan form login biasa.");
    console.log("Mengarahkan ke Google login...");
  };

  return (
    <div className="max-w-sm mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Masuk Akun</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
          required
        />
        <div className="relative">
          <input
            type={showPass ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full border border-gray-300 px-4 py-2 rounded-md pr-16 focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-blue-600 hover:text-blue-800 focus:outline-none"
          >
            {showPass ? "Sembunyikan" : "Lihat"}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300"
        >
          Masuk
        </button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-gray-500">Atau</p>
        <button
          onClick={handleGoogleLogin}
          className="mt-4 w-full flex items-center justify-center bg-red-500 text-white py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors duration-300"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.24 10.26h-1.9v3.66h3.29c-.14 1.13-.7 2.05-1.55 2.64v2.54h3.27c1.92-1.77 3.04-4.38 3.04-7.51 0-.51-.05-1-.15-1.46z"/>
            <path d="M5.4 14.54c-.21-.6-.33-1.24-.33-1.92s.12-1.32.33-1.92v-2.54H2.08c-.46.92-.72 1.94-.72 3.06s.26 2.14.72 3.06L5.4 14.54z"/>
            <path d="M12.24 5.86c1.78 0 3.23.73 4.31 1.69l2.87-2.87C17.58 2.76 15.02 1.5 12.24 1.5c-4.14 0-7.7 2.5-9.15 6.06l3.32 2.54c.72-2.14 2.82-3.74 5.83-3.74z"/>
            <path d="M22.24 12.24c0-.9-.08-1.78-.24-2.64H12.24v3.66h6.6c-.2 1.25-.8 2.37-1.77 3.19v2.54h3.27c1.92-1.77 3.04-4.38 3.04-7.51z"/>
          </svg>
          Masuk dengan Google
        </button>
      </div>

      <p className="text-center mt-6 text-sm text-gray-600">
        Belum punya akun?{" "}
        <a href="/register" className="text-blue-600 hover:underline">
          Daftar di sini
        </a>
      </p>
    </div>
  );
};

export default Login;