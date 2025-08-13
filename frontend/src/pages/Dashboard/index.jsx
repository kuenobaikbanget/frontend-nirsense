import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLong } from "@fortawesome/free-solid-svg-icons";

// Komponen untuk menampilkan skor utama dalam bentuk lingkaran
const ScoreCircle = ({ score }) => {
  const percentage = (score / 500) * 100; 
  const circumference = 2 * Math.PI * 80; 
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
  
    <div className="relative w-75 h-96 mx-auto">
      <svg className="w-full h-full" viewBox="0 0 180 180"> 
        {/* Lingkaran latar belakang */}
        <circle
          cx="90"
          cy="90"
          r="80"
          fill="transparent"
          stroke="#374151" 
          strokeWidth="14" 
        />
        {/* Lingkaran progres */}
        <circle
          cx="90"
          cy="90"
          r="80"
          fill="transparent"
          stroke="#56E1E9" 
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 90 90)"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-6xl font-bold text-white">{score}</span> 
        <span className="text-xl text-slate-400 mt-2">Skor Rata-rata</span> 
      </div>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();

  const lastScanData = {
    overallScore: 408,
    status: "Sangat Baik",
    date: "5 Agustus 2025",
    summary: "Skor antioksidan Anda menunjukkan peningkatan. Pertahankan!",
    areas: [
      { name: "Dahi", value: 410, color: "#3B82F6" },
      { name: "Pipi Kiri", value: 415, color: "#8B5CF6" },
      { name: "Pipi Kanan", value: 405, color: "#10B981" },
      { name: "Hidung", value: 400, color: "#F59E0B" },
      { name: "Dagu", value: 420, color: "#EF4444" },
    ],
  };

  const getStatusColor = (status) => {
    if (status === "Sangat Baik") return "text-emerald-400";
    if (status === "Baik") return "text-cyan-400";
    return "text-amber-400";
  };

  return (
    <div className="max-w-5xl mx-auto p-4 animate-fade-in">
      <div className="text-left mb-8">
        <h1 className="text-4xl font-bold text-white">Selamat Datang, John!</h1>
        <p className="text-slate-300 text-lg">
          Lihat progres kesehatan kulitmu hari ini.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Kolom Kiri: Skor dan Tombol Scan */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 text-center flex flex-col justify-between">
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

        {/* Kolom Kanan: Ringkasan dan Detail Area */}
        <div className="flex flex-col gap-8">
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