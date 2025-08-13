import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLong } from "@fortawesome/free-solid-svg-icons";

const getStatusGradient = (score) => {
  if (score > 400) return "from-emerald-400 to-teal-500";
  if (score > 350) return "from-cyan-400 to-blue-500";
  return "from-amber-400 to-orange-500";
};

const getStatusText = (score) => {
  if (score > 400) return "Kulit Sangat Baik!";
  if (score > 350) return "Kondisi Kulit Baik!";
  return "Butuh Perawatan Extra!";
};

const ScanResults = () => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setAnimationComplete(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const scanData = {
    date: "2025-08-13",
    time: "15:57 WIB",
    karotenoid: 460,
    karotenoidReadings: [
      { name: "Dahi", value: 460, color: "#FF6B35", status: "Baik"},
      { name: "Pipi Kiri", value: null, color: "#F79E1E", status: "Belum Dipindai"},
      { name: "Pipi Kanan", value: null, color: "#FFD23F", status: "Belum Dipindai"},
      { name: "Hidung", value: null, color: "#06FFA5", status: "Belum Dipindai"},
      { name: "Dagu", value: null, color: "#4ECDC4", status: "Belum Dipindai"},
    ],
    recommendations: [
      "Fokus pada makanan kaya karotenoid dan antioksidan untuk meningkatkan level antioksidan kulit.",
      "Gunakan serum vitamin C di pagi hari untuk melindungi dan meningkatkan karotenoid kulit.",
    ],
    comparison: {
      previousScore: 385,
      change: "+20",
    },
  };

  const AreaCard = ({ reading, index }) => {
    const isScanned = reading.value !== null;
    return (
      <div
        className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 ${
          isScanned
            ? "bg-gradient-to-br from-white/10 to-white/5 border-white/20"
            : "bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50"
        }`}
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div className="relative p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div
                className="w-4 h-4 rounded-full mr-3 shadow-lg"
                style={{ backgroundColor: reading.color, boxShadow: `0 0 10px ${reading.color}40` }}
              ></div>
              <span className="font-semibold text-white text-lg">{reading.name}</span>
            </div>
            <span className={`text-xs font-medium px-3 py-1 rounded-full ${isScanned ? "text-cyan-300 bg-cyan-500/10" : "text-slate-300 bg-slate-700/50"}`}>{reading.status}</span>
          </div>
          {isScanned ? (
            <div>
              <div className="text-3xl font-bold text-white mb-2">{reading.value}</div>
              <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden">
                <div
                  className="h-3 rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: animationComplete ? `${(reading.value / 500) * 100}%` : "0%",
                    background: `linear-gradient(90deg, ${reading.color}99, ${reading.color})`,
                    boxShadow: `0 0 8px ${reading.color}60`,
                  }}
                ></div>
              </div>
              <div className="flex justify-between text-sm text-slate-400 mt-1">
                <span>0</span>
                <span>500</span>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-8 h-8 mx-auto rounded-full bg-slate-700/50 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="animate-fade-in mx-6">
      <div className="flex justify-between items-end mb-2">
        <h1 className="text-3xl font-bold">Hasil Pemeriksaan</h1>
        <div className="text-right">
          <div className="text-slate-300 text-sm font-medium">{scanData.date}</div>
          <div className="text-slate-400 text-sm">{scanData.time}</div>
        </div>
      </div>
      <p className="text-white text-opacity-70 mb-8">
        Penjelasan Lengkap Mengenai Kondisi Kulit Anda
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Kolom Kiri: Skor dan Info Karotenoid */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl text-center">
            <h2 className="text-xl font-semibold mb-4">Skor Antioksidan</h2>
            <p className="text-6xl font-bold mb-4">{scanData.karotenoid}</p>
            <div className={`inline-flex items-center px-6 py-1 rounded-xl text-lg font-semibold bg-gradient-to-r ${getStatusGradient(scanData.karotenoid)} border border-white/20 shadow-lg`}>
              {getStatusText(scanData.karotenoid)}
            </div>
            <div className="mt-6 p-2 bg-white/5 rounded-xl border border-white/10">
              <div className={`flex items-center justify-center gap-2 text-lg font-semibold ${scanData.comparison.change.startsWith("+") ? "text-emerald-400" : "text-red-400"}`}>
                {scanData.comparison.change} dibandingkan pemeriksaan terakhir
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl flex-grow">
            <h3 className="text-xl font-semibold mb-4 text-center">Apa itu Karotenoid?</h3>
            <p className="text-slate-200 leading-relaxed text-base text-justify">
              Karotenoid adalah pigmen alami dan antioksidan kuat. Skor yang tinggi menunjukkan pertahanan kulit yang kuat terhadap kerusakan akibat radikal bebas dan sinar UV.
              Oleh karena itu, karotenoid yang terakumulasi di dalam lapisan kulit bertindak sebagai perisai internal pertama. Mereka membantu menyerap radiasi UV dan menetralkan radikal bebas sebelum sempat merusak struktur penting seperti kolagen dan elastin, yang menjaga kulit tetap kencang dan kenyal.
            </p>
          </div>
        </div>

        {/* Kolom Kanan: Kadar Karotenoid per Area Wajah */}
        <div className="lg:col-span-2 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
          <h2 className="text-xl font-semibold mb-6">Kadar Karotenoid per Area Wajah</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {scanData.karotenoidReadings.map((reading, index) => (
              <AreaCard key={index} reading={reading} index={index} />
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl mt-6">
        <h2 className="text-xl font-semibold mb-6">Rekomendasi Perawatan</h2>
        <div className="space-y-4">
          {scanData.recommendations.map((rec, index) => (
            <div key={index} className="bg-white/5 rounded-xl p-4 border border-white/10">
              <p className="text-slate-200 leading-relaxed">{rec}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Tombol Lihat Riwayat */}
      <div className="mt-8 text-center">
        <button
          onClick={() => navigate("/history")}
          className="group bg-transparent text-cyan-400 py-3 px-6 rounded-xl font-semibold hover:text-white transition-colors text-lg"
        >
          <span>Lihat Riwayat Pemeriksaan</span>
          <FontAwesomeIcon
            icon={faRightLong}
            className="ml-2 transform group-hover:translate-x-2 transition-transform"
          />
        </button>
      </div>
    </div>
  );
};

export default ScanResults;