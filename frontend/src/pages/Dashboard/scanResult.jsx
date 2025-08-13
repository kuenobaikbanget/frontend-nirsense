import SkinRadialChart from "../../components/SkinRadialChart";
import { useEffect, useState } from "react";

const getStatusGradient = (score) => {
  if (score > 350) return "from-emerald-400 to-teal-500";
  if (score > 380) return "from-blue-400 to-indigo-500";
  if (score > 400) return "from-amber-400 to-orange-500";
  return "from-orange-400 to-yellow-500";
};

const getStatusText = (score) => {
  if (score > 350) return "Kulit Sangat Baik!";
  if (score > 380) return "Kondisi Kulit Baik!";
  if (score > 400) return "Kulit Cukup Sehat";
  return "Butuh Perawatan Extra!";
};

const ScanResults = () => {
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimationComplete(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const scanData = {
    date: "2025-08-09",
    time: "15:57 WIB",
    karotenoid: 400,
    karotenoidReadings: [
      {
        name: "Dahi",
        value: 400,
        color: "#3B82F6",
        status: "Baik",
        gradient: "from-blue-400 to-blue-600",
      },
      {
        name: "Pipi Kanan",
        value: null,
        color: "#6366F1",
        status: "Belum Dipindai",
        gradient: "from-indigo-400 to-indigo-600",
      },
      {
        name: "Pipi Kiri",
        value: null,
        color: "#06B6D4",
        status: "Belum Dipindai",
        gradient: "from-cyan-400 to-cyan-600",
      },
      {
        name: "Dagu",
        value: null,
        color: "#8B5CF6",
        status: "Belum Dipindai",
        gradient: "from-purple-400 to-purple-600",
      },
      {
        name: "Hidung",
        value: null,
        color: "#ff3e3e",
        status: "Belum Dipindai",
        gradient: "from-purple-400 to-purple-600",
      },
    ],
    recommendations: [
      "Gunakan serum vitamin C di pagi hari untuk melindungi dan meningkatkan karotenoid kulit.",
      // "Aplikasikan tabir surya broad-spectrum SPF 50+ setiap hari untuk mencegah kerusakan radikal bebas.",
      // "Konsumsi makanan kaya antioksidan seperti wortel, bayam, dan buah beri untuk nutrisi kulit optimal.",
    ],
    comparison: {
      previousScore: 385,
      change: "+15",
    },
  };

  const AreaCard = ({ reading, index }) => {
    const isScanned = reading.value !== null;

    return (
      <div
        className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 ${
          isScanned
            ? "bg-gradient-to-br from-white/10 to-white/5 border-white/20 hover:border-white/40 hover:shadow-lg hover:shadow-blue-500/20"
            : "bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50"
        }`}
        style={{
          animationDelay: `${index * 100}ms`,
        }}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-r ${reading.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
        ></div>

        <div className="absolute top-4 right-4">
          <div className="flex justify-center">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${
                isScanned
                  ? "bg-green-500/10 text-green-400 border-green-500/30"
                  : "bg-slate-500/10 text-slate-400 border-slate-500/30"
              }`}
            >
              {reading.status}
            </span>
          </div>
        </div>

        <div className="relative p-6">
          <div className="flex items-center mb-4">
            <div
              className="w-4 h-4 rounded-full mr-3 shadow-lg"
              style={{
                backgroundColor: reading.color,
                boxShadow: `0 0 10px ${reading.color}40`,
              }}
            ></div>
            <span className="font-semibold text-white text-lg">
              {reading.name}
            </span>
          </div>

          <div>
            {isScanned ? (
              <div className="space-y-2">
                <div className="text-3xl font-bold text-white">
                  {reading.value}
                </div>

                <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-3 rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: animationComplete
                        ? `${(reading.value / 500) * 100}%`
                        : "0%",
                      background: `linear-gradient(90deg, ${reading.color}, ${reading.color}dd)`,
                      boxShadow: `0 0 8px ${reading.color}60`,
                    }}
                  ></div>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">0</span>
                  <span className="text-slate-400">500</span>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-6 h-6 mx-auto rounded-full bg-slate-700/50 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-slate-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="animate-fade-in mx-6">
      <div className="flex justify-between items-end">
        <h1 className="text-3xl font-bold mb-2">Hasil Pemeriksaan</h1>

        <div className="flex justify-between items-center ">
          <div className="text-right">
            <div className="text-slate-300 text-sm font-medium">
              {scanData.date}
            </div>
            <div className="text-slate-400 text-sm"> {scanData.time}</div>
          </div>
        </div>
      </div>

      <p className="text-white text-opacity-70 mb-8">
        Penjelasan Lengkap Mengenai Kondisi Kulit Anda
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-5">
        <div className="xl:col-span-1">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-6 flex items-center justify-center gap-3">
                Skor Antioksidan
              </h2>

              <div className="flex justify-center mb-8">
                <span className="text-5xl font-bold mr-2">
                  {scanData.karotenoid}
                </span>
              </div>
              <div
                className={`inline-flex items-center px-6 py-1 rounded-xl text-lg font-semibold bg-gradient-to-r ${getStatusGradient(
                  scanData.karotenoid
                )} bg-opacity-20 border border-white/20 shadow-lg`}
              >
                {getStatusText(scanData.karotenoid)}
              </div>
              <div className="mt-6 p-2 bg-white/5 rounded-xl border border-white/10">
                <div
                  className={`flex items-center justify-center gap-2 text-lg font-semibold ${
                    scanData.comparison.change.startsWith("+")
                      ? "text-[#56E1E9]"
                      : "text-[#E12353]"
                  }`}
                >
                  {scanData.comparison.change.startsWith("+") ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 7a1 1 0 01-1 1H9v1h2a1 1 0 110 2H9v1h2a1 1 0 110 2H9v1a1 1 0 11-2 0v-1H5a1 1 0 110-2h2v-1H5a1 1 0 110-2h2V8H5a1 1 0 010-2h2V5a1 1 0 112 0v1h2a1 1 0 011 1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  {scanData.comparison.change} dari pemeriksaan terakhir
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl mt-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-yellow-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Apa itu Karotenoid?
            </h3>
            <p className="text-slate-300 leading-relaxed text-sm ">
              Karotenoid adalah pigmen alami dan antioksidan kuat yang ditemukan
              dalam buah dan sayuran. Di kulit, karotenoid berfungsi sebagai
              pelindung dari kerusakan akibat radikal bebas dan sinar UV. Skor
              yang tinggi menunjukkan pertahanan kulit yang kuat.
            </p>

            {/* <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="text-sm font-semibold text-cyan-400 mb-2">
                Tips Cepat:
              </h4>
              <div className="text-xs text-slate-300 space-y-1">
                <div>• Konsumsi wortel, tomat, dan bayam</div>
                <div>• Gunakan tabir surya setiap hari</div>
                <div>• Hindari paparan sinar UV berlebihan</div>
              </div>
            </div> */}
          </div>
        </div>

        <div className="xl:col-span-2">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
            <h2 className="text-xl font-semibold mb-8 flex items-center gap-3">
              Kadar Karotenoid per Area Wajah
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {scanData.karotenoidReadings.map((reading, index) => (
                <AreaCard key={index} reading={reading} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl mt-4">
        <h2 className="text-xl font-semibold mb-8 flex items-center gap-3">
          Catatan & Rekomendasi
        </h2>
        <div className="grid grid-cols-1 gap-6">
          {scanData.recommendations.map((rec, index) => (
            <div
              key={index}
              className="group relative overflow-hidden bg-gradient-to-br from-white/5 to-white/2 rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative flex items-start space-x-4">
                {/* <div className="flex-shrink-0 p-3 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-xl border border-cyan-400/30">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-cyan-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div> */}
                <div>
                  <p className="text-slate-200 leading-relaxed font-medium">
                    {rec}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScanResults;
