// frontend/src/pages/Register.tsx
import React, { useState } from "react";
import api from "../api/axios"; // Menggunakan instance api yang sudah dikonfigurasi
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/register", { // Sesuaikan endpoint jika berbeda
        name,
        email,
        password,
      });

      const { token } = response.data; // Asumsi backend mengembalikan token
      localStorage.setItem("token", token);
      toast.success("Registrasi berhasil! Anda sekarang masuk.");
      navigate("/");
    } catch (error: any) {
      console.error("❌ Registrasi gagal:", error);
      toast.error(
        error?.response?.data?.message ||
          "Gagal mendaftar. Periksa kembali input atau koneksi Anda."
      );
    }
  };

  return (
    <div className="max-w-sm mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Daftar Akun</h1>
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama Lengkap"
          className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
          required
        />
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
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors duration-300"
        >
          Daftar
        </button>
      </form>

      <p className="text-center mt-6 text-sm text-gray-600">
        Sudah punya akun?{" "}
        <a href="/login" className="text-blue-600 hover:underline">
          Masuk di sini
        </a>
      </p>
    </div>
  );
};

export default Register;