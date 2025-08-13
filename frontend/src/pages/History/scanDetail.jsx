import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment-timezone";

const ScanDetail = () => {
  const { scanId } = useParams();
  const navigate = useNavigate();
  const scanData = {
    id: scanId,
    date: "2025-08-05",
    time: "14:30 WIB",
    karotenoid: 440,
    target: 450,
    status: "Cukup Baik",
    progress: "-3.8%",
    rekomendasi:
      "Fokus pada makanan kaya karotenoid dan antioksidan untuk meningkatkan level antioksidan kulit.",
    karotenoidReadings: [
      {
        name: "Dahi",
        value: 385,
        color: "#FF6B35",
        status: "Baik",
        description: "Area dahi menunjukkan kadar karotenoid yang optimal.",
      },
      {
        name: "Pipi Kiri",
        value: 375,
        color: "#F7931E",
        status: "Cukup",
        description: "Sedikit di bawah rata-rata, butuh perawatan khusus.",
      },
      {
        name: "Pipi Kanan",
        value: 380,
        color: "#FFD23F",
        status: "Baik",
        description: "Kadar karotenoid dalam rentang normal.",
      },
      {
        name: "Hidung",
        value: 370,
        color: "#06FFA5",
        status: "Cukup",
        description: "Area yang sering terpapar, butuh perlindungan ekstra.",
      },
      {
        name: "Dagu",
        value: 390,
        color: "#4ECDC4",
        status: "Sangat Baik",
        description: "Kadar karotenoid tertinggi di area wajah.",
      },
    ],
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Sangat Baik":
        return "text-green-400";
      case "Baik":
        return "text-cyan-400";
      case "Cukup Baik":
      case "Cukup":
        return "text-yellow-400";
      case "Kurang":
        return "text-red-400";
      default:
        return "text-orange-400";
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case "Sangat Baik":
        return "bg-green-500/20 border-green-500/50";
      case "Baik":
        return "bg-cyan-500/20 border-cyan-500/50";
      case "Cukup Baik":
      case "Cukup":
        return "bg-yellow-500/20 border-yellow-500/50";
      case "Kurang":
        return "bg-red-500/20 border-red-500/50";
      default:
        return "bg-orange-500/20 border-orange-500/50";
    }
  };

  const progressToTarget = scanData.target - scanData.karotenoid;

  return (
    <div className="animate-fade-in p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-cyan-400 hover:text-white transition-colors mb-4 md:mb-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Kembali
          </button>
          <div className="text-right">
            <h1 className="text-2xl font-bold">Detail Pemeriksaan</h1>
            <p className="text-slate-400">
              {moment.tz(scanData.date, "Asia/Jakarta").format("DD MMMM YYYY")}
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div
          className={`p-6 rounded-2xl border ${getStatusBg(scanData.status)}`}
        >
          <div className="text-sm text-slate-300">Status</div>
          <div
            className={`text-2xl font-bold ${getStatusColor(scanData.status)}`}
          >
            {scanData.status}
          </div>
        </div>
        <div
          className={`p-6 rounded-2xl border ${
            scanData.progress.includes("+")
              ? "bg-green-500/20 border-green-500/30"
              : "bg-red-500/20 border-red-500/30"
          }`}
        >
          <div className="text-sm text-slate-300">Progres</div>
          <div
            className={`text-2xl font-bold ${
              scanData.progress.includes("+")
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {scanData.progress}
          </div>
        </div>
        <div className="p-6 rounded-2xl border bg-orange-500/20 border-orange-500/30">
          <div className="text-sm text-slate-300">Rata-rata</div>
          <div className="text-2xl font-bold text-orange-400">
            {scanData.karotenoid}
          </div>
        </div>
        <div className="p-6 rounded-2xl border bg-[#56e9ac32] border-[#56e9a26d]">
          <div className="text-sm text-slate-300">Menuju Target</div>
          <div className="text-2xl font-bold text-emerald-400">
            {progressToTarget > 0
              ? `${progressToTarget} lagi`
              : "Target Tercapai!"}
          </div>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 mb-8 border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-6">
          Analisis Karotenoid per Area Wajah
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {scanData.karotenoidReadings.map((reading, index) => (
            <div
              key={index}
              className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full shadow-lg"
                    style={{ backgroundColor: reading.color }}
                  ></div>
                  <h3 className="text-xl font-bold text-white">
                    {reading.name}
                  </h3>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBg(
                    reading.status
                  )}`}
                >
                  {reading.status}
                </div>
              </div>
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-white mb-1">
                  {reading.value}
                </div>
                <div className="text-sm text-slate-400"></div>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                <div
                  className="h-3 rounded-full transition-all duration-700 shadow-sm"
                  style={{
                    width: `${(reading.value / 500) * 100}%`,
                    backgroundColor: reading.color,
                    boxShadow: `0 0 10px ${reading.color}50`,
                  }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>0</span>
                <span>500</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-6">
          Catatan & Rekomendasi
        </h2>
        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-6 border border-blue-500/20">
          <p className="text-slate-200 leading-relaxed text-lg">
            {scanData.rekomendasi}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScanDetail;
