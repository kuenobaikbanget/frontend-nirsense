import "./App.css";
import "./styles/index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout.jsx";
import Dashboard from "./pages/Dashboard/index.jsx";
import MulaiScan from "./pages/Dashboard/mulaiScan.jsx"; // <-- Impor dari file baru
import History from "./pages/History/index.jsx";
import ScanResults from "./pages/Dashboard/scanResult.jsx";
import ScanDetail from "./pages/History/scanDetail.jsx";
import ProfileEditScreen from "./pages/profil.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="scan" element={<MulaiScan />} /> {/* <-- Gunakan komponen baru */}
          <Route path="results" element={<ScanResults />} />
          <Route path="history" element={<History />} />
          <Route path="history/:scanId" element={<ScanDetail />} />
          <Route path="/profil" element={<ProfileEditScreen />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;