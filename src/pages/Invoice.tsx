// frontend/src/pages/Invoice.tsx
import React, { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import toast from 'react-hot-toast';
import html2pdf from 'html2pdf.js/dist/html2pdf.min.js'; // Pastikan path ini benar

interface InvoiceItem {
  _id: string;
  name: string;
  quantity: number;
  price: number;
}

interface InvoiceData {
  _id: string;
  items: InvoiceItem[];
  totalPrice: number;
  shippingAddress: string;
  paymentMethod: string;
  status: string;
  createdAt: string;
  user: {
    name: string;
    email: string;
  };
  // Tambahkan properti lain yang mungkin ada di objek faktur dari backend
}

const Invoice: React.FC = () => {
  const invoiceRef = useRef<HTMLDivElement>(null);
  const { id } = useParams<{ id: string }>();
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      if (!id) {
        setError("ID Faktur tidak ditemukan.");
        setLoading(false);
        return;
      }
      try {
        // Asumsi endpoint untuk detail faktur berdasarkan ID
        const res = await api.get(`/api/invoices/${id}`); // Sesuaikan endpoint
        setInvoiceData(res.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Gagal mengambil detail faktur.');
        toast.error('Gagal mengambil detail faktur.');
      } finally {
        setLoading(false);
      }
    };
    fetchInvoice();
  }, [id]);

  const generatePdf = () => {
    if (invoiceRef.current && invoiceData) {
      toast.promise(
        html2pdf().from(invoiceRef.current).save(`invoice-${invoiceData._id}.pdf`),
        {
          loading: 'Membuat PDF...',
          success: 'PDF berhasil dibuat!',
          error: 'Gagal membuat PDF.',
        }
      );
    } else {
      toast.error("Data faktur tidak lengkap untuk membuat PDF.");
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500 p-6">Memuat faktur...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 p-6">Error: {error}</p>;
  }

  if (!invoiceData) {
    return <p className="text-center text-gray-500 p-6">Faktur tidak ditemukan.</p>;
  }

  return (
    <div className="p-6">
      <div ref={invoiceRef} className="bg-white p-8 shadow-lg rounded-lg max-w-2xl mx-auto print:shadow-none print:border-none">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Faktur Pembelian</h1>
        <div className="mb-6 border-b pb-4">
          <p className="text-gray-700"><strong>No. Faktur:</strong> {invoiceData._id}</p>
          <p className="text-gray-700"><strong>Tanggal:</strong> {new Date(invoiceData.createdAt).toLocaleDateString()}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Info Pelanggan:</h2>
            <p className="text-gray-700">{invoiceData.user?.name || 'N/A'}</p>
            <p className="text-gray-700">{invoiceData.user?.email || 'N/A'}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Alamat Pengiriman:</h2>
            <p className="text-gray-700">{invoiceData.shippingAddress}</p>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Detail Pesanan:</h2>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Produk</th>
                <th className="py-2 px-4 border-b text-center">Qty</th>
                <th className="py-2 px-4 border-b text-right">Harga Satuan</th>
                <th className="py-2 px-4 border-b text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.items.map((item) => (
                <tr key={item._id}>
                  <td className="py-2 px-4 border-b">{item.name}</td>
                  <td className="py-2 px-4 border-b text-center">{item.quantity}</td>
                  <td className="py-2 px-4 border-b text-right">Rp{item.price.toLocaleString('id-ID')}</td>
                  <td className="py-2 px-4 border-b text-right">Rp{(item.price * item.quantity).toLocaleString('id-ID')}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3} className="py-2 px-4 text-right font-bold">Total Pembayaran:</td>
                <td className="py-2 px-4 text-right font-bold text-blue-700">Rp{invoiceData.totalPrice.toLocaleString('id-ID')}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-700">Metode Pembayaran: <span className="font-semibold">{invoiceData.paymentMethod}</span></p>
          <p className="text-gray-700 mt-2">Status: <span className="font-semibold">{invoiceData.status}</span></p>
          <p className="mt-8 text-sm text-gray-500">Terima kasih atas pembelian Anda!</p>
        </div>
      </div>
      <div className="text-center mt-6">
        <button
          onClick={generatePdf}
          className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors duration-300 print:hidden"
        >
          Unduh Faktur PDF
        </button>
      </div>
    </div>
  );
};
export default Invoice;