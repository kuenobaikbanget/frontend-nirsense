import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSprayCan,
  faMobileAlt,
  faStopwatch,
  faChartBar,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";

const instructionSteps = [
    { step: 1, title: "Bersihkan Wajah", description: "Bersihkan wajah dari makeup, kotoran, atau minyak berlebih untuk hasil akurat.", icon: faSprayCan },
    { step: 2, title: "Pilih Area Wajah", description: "Pilih area wajah yang ingin dianalisis dengan mengklik ikon di bawah.", icon: faCircle },
    { step: 3, title: "Posisikan Alat", description: "Dekatkan sensor pada area wajah yang ingin dianalisis (jarak 2-3cm).", icon: faMobileAlt },
    { step: 4, title: "Mulai Scanning", description: "Tekan tombol scan dan tetap diam selama 5-10 detik.", icon: faStopwatch },
    { step: 5, title: "Lihat Hasil Deteksi", description: "Hasil analisis akan muncul beserta rekomendasi perawatan.", icon: faChartBar },
];

const faceAreas = [
  { id: "dahi", name: "Dahi", position: "top-6 left-1/2 transform -translate-x-1/2" },
  { id: "pipi-kiri", name: "Pipi Kiri", position: "top-1/2 left-4 transform -translate-y-1/2" },
  { id: "hidung", name: "Hidung", position: "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" },
  { id: "pipi-kanan", name: "Pipi Kanan", position: "top-1/2 right-4 transform -translate-y-1/2" },
  { id: "dagu", name: "Dagu", position: "bottom-6 left-1/2 transform -translate-x-1/2" },
];

const MulaiScan = () => {
  const [isScanning, setIsScanning] = useState(false);
  const navigate = useNavigate();
  const [selectedArea, setSelectedArea] = useState("");

  const handleScanDemo = () => {
    if (!selectedArea) {
      alert("Silakan pilih area wajah terlebih dahulu!");
      return;
    }
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      navigate("/results");
    }, 3000);
  };

  const handleAreaSelect = (areaId) => {
    setSelectedArea(areaId === selectedArea ? "" : areaId);
  };

  return (
    <div className="max-w-md lg:max-w-5xl md:max-w-2xl mx-auto mt-2 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[#56E1E9]">Pindai Wajah Anda</h1>
        <p className="text-white italic">Ikuti langkah-langkah di bawah ini untuk memulai.</p>
      </div>

      <div className="bg-slate-600/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-600 border-opacity-20 mb-8">
        <div className="space-y-5">
          <h2 className="text-xl font-semibold text-center">Cara Penggunaan Alat</h2>
          <div className="grid grid-cols-1 lg:grid-cols-5 md:grid-cols-3 gap-6">
            {instructionSteps.map((item) => (
              <div key={item.step} className="bg-slate-400/50 p-5 rounded-lg hover:bg-slate-600/50 transition-colors duration-200">
                <div className="flex items-center mb-3">
                  <FontAwesomeIcon icon={item.icon} className="text-2xl mr-3" />
                  <div>
                    <span className="text-[#56E1E9] font-semibold">Step {item.step}</span>
                    <h3 className="font-medium text-white">{item.title}</h3>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center rounded-lg">
            <div className="bg-slate-600/50 rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4 text-center text-white">
                Pilih Area Wajah untuk Dianalisis
              </h3>
              <div className="flex justify-center">
                <div className="relative w-48 h-60">
                  <div className="absolute inset-2 bg-slate-800/30 rounded-full"></div>
                  {faceAreas.map((area) => (
                    <button
                      key={area.id}
                      onClick={() => handleAreaSelect(area.id)}
                      className={`absolute w-6 h-6 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${area.position} ${
                        selectedArea === area.id
                          ? "bg-[#56E1E9] border-[#49d1d8] shadow-lg shadow-[#74a1a3]"
                          : "bg-slate-600 border-slate-400 hover:bg-slate-500"
                      }`}
                      title={area.name}
                    >
                      {selectedArea === area.id && <span className="text-white text-xs font-bold"></span>}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-center text-white text-xs my-5">
              Pastikan tidak ada cahaya kuat yang mengganggu selama proses pemeriksaan.
            </p>
            <button
              onClick={handleScanDemo}
              disabled={isScanning || !selectedArea}
              className={`px-6 py-3 rounded-full w-full font-medium transition-colors duration-200 ${
                isScanning || !selectedArea
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#112C70] to-[#56E1E9] hover:shadow-xl hover:-translate-y-0.5"
              }`}
            >
              {isScanning ? "Pemeriksaan Berlangsung..." : `Mulai Pemeriksaan Area ${selectedArea.replace("-", " ")}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MulaiScan;