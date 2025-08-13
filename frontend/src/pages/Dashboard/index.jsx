import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLong } from "@fortawesome/free-solid-svg-icons";

// Komponen untuk menampilkan skor utama dalam bentuk lingkaran
const ScoreCircle = ({ score }) => {
  const percentage = (score / 500) * 100; // Asumsi skor maksimal 500
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-48 h-48 mx-auto">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {/* Lingkaran latar belakang */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="transparent"
          stroke="#374151" // slate-700
          strokeWidth="10"
        />
        {/* Lingkaran progres */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="transparent"
          stroke="#56E1E9" // cyan-400
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 50 50)"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold text-white">{score}</span>
        <span className="text-sm text-slate-400">Skor Rata-rata</span>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();

  // Data disamakan dengan file scanDetail.jsx
  const lastScanData = {
    overallScore: 440,
    status: "Cukup Baik",
    date: "5 Agustus 2025",
    summary: "Fokus pada makanan kaya karotenoid dan antioksidan untuk meningkatkan level antioksidan kulit.",
    areas: [
        { name: "Dahi", value: 385, color: "#FF6B35" },
        { name: "Pipi Kiri", value: 375, color: "#F7931E" },
        { name: "Pipi Kanan", value: 380, color: "#FFD23F" },
        { name: "Hidung", value: 370, color: "#06FFA5" },
        { name: "Dagu", value: 390, color: "#4ECDC4" },
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

  return (
    <div className="max-w-5xl mx-auto p-4 animate-fade-in">
      <div className="text-left mb-8">
        <h1 className="text-4xl font-bold text-white">Selamat Datang, John!</h1>
        <p className="text-slate-300 text-lg">
          Lihat progres kesehatan kulitmu hari ini.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 text-center flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">
              Skor Karotenoid Anda
            </h2>
            <div className="flex justify-center mb-4">
              <ScoreCircle score={lastScanData.overallScore} />
            </div>
            <p className={`text-2xl font-bold ${getStatusColor(lastScanData.status)}`}>
              {lastScanData.status}
            </p>
          </div>
          <button
            onClick={() => navigate("/scan")}
            className="w-full mt-6 bg-cyan-500 text-black font-bold py-3 rounded-xl hover:bg-cyan-400 transition-all duration-300 transform hover:scale-105"
          >
            Mulai Pindai Wajah
          </button>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-4">
              Ringkasan Pemindaian Terakhir
            </h2>
            <p className="text-slate-400 mb-1">
              Tanggal: {lastScanData.date}
            </p>
            <p className="text-slate-200 text-lg leading-relaxed">
              "{lastScanData.summary}"
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-4">
              Detail Karotenoid per Area
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {lastScanData.areas.map((item) => (
                <div key={item.name} className="bg-white/5 p-4 rounded-xl">
                  <div className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-3"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-slate-300">{item.name}</span>
                  </div>
                  <p className="text-2xl font-bold text-white mt-1">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
             <div
                onClick={() => navigate("/history")}
                className="group bg-transparent text-cyan-400 pt-4 rounded-xl mt-2 text-right font-semibold hover:text-white transition-colors cursor-pointer"
              >
                <span>Lihat Riwayat Lengkap</span>
                <FontAwesomeIcon
                  icon={faRightLong}
                  className="ml-2 transform group-hover:translate-x-2 transition-transform"
                />
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;