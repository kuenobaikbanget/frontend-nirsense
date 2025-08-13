import { Link } from "react-router-dom";
import HistoryItem from "../../components/HistoryItem.jsx";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
} from "recharts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarChart } from "@fortawesome/free-solid-svg-icons";

const History = () => {
  const scans = [
    {
      id: 1,
      date: "2025-03-15",
      karotenoid: 360, // Rata-rata karotenoid dari semua area
      status: "Baik",
      progress: "+2.6%", // Perubahan persentase dari scan sebelumnya
      rekomendasi: "Pertahankan pola makan dan gaya hidup sehat.",
      karotenoidReadings: [
        { name: "Dahi", value: 350 },
        { name: "Pipi Kiri", value: 365 },
        { name: "Pipi Kanan", value: 360 },
        { name: "Hidung", value: 355 },
        { name: "Dagu", value: 370 },
      ],
    },
    {
      id: 2,
      date: "2025-04-25",
      karotenoid: 375,
      status: "Baik",
      progress: "+4.1%",
      rekomendasi: "Tingkatkan konsumsi buah dan sayur berwarna oranye.",
      karotenoidReadings: [
        { name: "Dahi", value: 370 },
        { name: "Pipi Kiri", value: 380 },
        { name: "Pipi Kanan", value: 375 },
        { name: "Hidung", value: 370 },
        { name: "Dagu", value: 380 },
      ],
    },
    {
      id: 3,
      date: "2025-05-05",
      karotenoid: 388,
      status: "Sangat Baik",
      progress: "+3.5%",
      rekomendasi: "Pertahankan pola makan dan gaya hidup sehat.",
      karotenoidReadings: [
        { name: "Dahi", value: 390 },
        { name: "Pipi Kiri", value: 395 },
        { name: "Pipi Kanan", value: 385 },
        { name: "Hidung", value: 380 },
        { name: "Dagu", value: 390 },
      ],
    },
    {
      id: 4,
      date: "2025-06-15",
      karotenoid: 410,
      status: "Sangat Baik",
      progress: "+5.7%",
      rekomendasi: "Pertahankan pola makan dan gaya hidup sehat.",
      karotenoidReadings: [
        { name: "Dahi", value: 410 },
        { name: "Pipi Kiri", value: 415 },
        { name: "Pipi Kanan", value: 405 },
        { name: "Hidung", value: 400 },
        { name: "Dagu", value: 420 },
      ],
    },
    {
      id: 5,
      date: "2025-07-10",
      karotenoid: 395,
      status: "Baik",
      progress: "-3.6%",
      rekomendasi: "Tingkatkan konsumsi buah dan sayur berwarna oranye.",
      karotenoidReadings: [
        { name: "Dahi", value: 400 },
        { name: "Pipi Kiri", value: 390 },
        { name: "Pipi Kanan", value: 395 },
        { name: "Hidung", value: 400 },
        { name: "Dagu", value: 390 },
      ],
    },
    {
      id: 6,
      date: "2025-08-05",
      karotenoid: 380,
      status: "Cukup Baik",
      progress: "-3.8%",
      rekomendasi: "Fokus pada makanan kaya karotenoid dan antioksidan.",
      karotenoidReadings: [
        { name: "Dahi", value: 385 },
        { name: "Pipi Kiri", value: 375 },
        { name: "Pipi Kanan", value: 380 },
        { name: "Hidung", value: 370 },
        { name: "Dagu", value: 390 },
      ],
    },
  ];

  const trenData = {
    monthly: [
      { period: "Mar", karotenoid: 350, year: "2025" },
      { period: "Apr", karotenoid: 365, year: "2025" },
      { period: "Mei", karotenoid: 380, year: "2025" },
      { period: "Jun", karotenoid: 395, year: "2025" },
      { period: "Jul", karotenoid: 410, year: "2025" },
      { period: "Ags", karotenoid: 440, year: "2025" },
    ],
  };

  const getCurrentData = () => trenData["monthly"] || [];
  return (
    <div className="p-6 min-h-screen">
      <div className="bg-slate-600/50 border-slate-600 border-1 rounded-xl p-10 mb-8">
        <h2 className="text-2xl font-semibold mb-6">
          Progres Kesehatan Kulit Wajah
        </h2>
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="w-full md:w-3/5">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={getCurrentData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis dataKey="period" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#263f7d",
                    border: "1px solid #64748B",
                    borderRadius: "6px",
                    color: "white",
                  }}
                  formatter={(value) => [value + " μg/cm²", "Karotenoid"]}
                />
                <Line
                  type="monotone"
                  dataKey="karotenoid"
                  stroke="#56E1E9"
                  strokeWidth={2}
                  dot={{ fill: "#56E1E9", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full md:w-2/5 p-6 align-bottom bg-slate-800/20 rounded-xl shadow-lg">
            <p className="text-slate-200 text-lg">
              <FontAwesomeIcon icon={faBarChart} /> Menampilkan data bulanan.
            </p>
            <p className="text-slate-400 mt-2">
              Berdasarkan data, tren menunjukkan{" "}
              <b>peningkatan yang konsisten</b> dari bulan Maret hingga Agustus
              2024. Peningkatan ini adalah indikasi positif dari perbaikan
              kondisi kulit Anda.
            </p>
          </div>
        </div>
        {/* <div className="mt-4 p-4 bg-slate-600 rounded-lg">
          <p className="text-slate-200">
            📈 Menampilkan data bulanan - Trend menunjukkan peningkatan yang
            konsisten
          </p>
        </div> */}
      </div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Riwayat Pemeriksaan</h1>
        <div className="text-sm text-slate-400">
          {scans.length} data ditemukan
        </div>
      </div>
      <div className="bg-slate-600/50 rounded-2xl overflow-hidden border border-slate-700 ">
        {scans.map((scan, index) => (
          <Link to={`/history/${scan.id}`} key={scan.id}>
            <HistoryItem scan={scan} idx={index} long={scans.length} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default History;
