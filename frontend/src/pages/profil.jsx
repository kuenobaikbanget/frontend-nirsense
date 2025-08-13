import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import defaultProfileImage from "../assets/no-profile.png";

const ProfileEditScreen = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "John Doe",
    age: 28,
    skinTone: "Kuning Langsat",
    goals: 450,
    
    profileImage: defaultProfileImage,
  });

  const skinTones = [
    "Sangat Cerah",
    "Cerah",
    "Kuning Langsat",
    "Sawo Matang",
    "Gelap",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfile((prevProfile) => ({
          ...prevProfile,
          profileImage: event.target.result,
        }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSave = () => {
    console.log("Profile saved:", profile);
    alert("Perubahan berhasil disimpan!");
    navigate(-1);
  };

  return (
    <div className="animate-fade-in min-h-screen p-6 text-white">
      <div className="max-w-xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Edit Profil</h1>
        <p className="text-slate-300 text-lg mb-8">
          Perbarui informasi Anda untuk hasil yang lebih akurat
        </p>

        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 space-y-6">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <img
                src={profile.profileImage}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-cyan-400"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = defaultProfileImage;
                }}
              />
              <label
                htmlFor="profileImageUpload"
                className="absolute bottom-0 right-0 bg-slate-600/80 text-white p-2 rounded-full cursor-pointer hover:bg-cyan-500 transition-colors"
              >
                <FontAwesomeIcon icon={faCamera} />
                <input
                  type="file"
                  id="profileImageUpload"
                  name="profileImage"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div>
            <label className="block text-slate-400 mb-2" htmlFor="name">
              Nama
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={profile.name}
              onChange={handleInputChange}
              className="w-full p-3 rounded-lg bg-slate-600/40 border border-slate-600 text-white focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>

          {/* Usia */}
          <div>
            <label className="block text-slate-400 mb-2" htmlFor="age">
              Usia
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={profile.age}
              onChange={handleInputChange}
              className="w-full p-3 rounded-lg bg-slate-600/40 border border-slate-600 text-white focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>

          {/* Warna Kulit */}
          <div>
            <label className="block text-slate-400 mb-2" htmlFor="skinTone">
              Warna Kulit
            </label>
            <select
              id="skinTone"
              name="skinTone"
              value={profile.skinTone}
              onChange={handleInputChange}
              className="w-full p-3 rounded-lg bg-slate-600/40 border border-slate-600 text-white focus:outline-none focus:border-cyan-400 transition-colors"
            >
              {skinTones.map((tone, index) => (
                <option key={index} value={tone}>
                  {tone}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-400 mb-2" htmlFor="goals">
              Target Capaian
            </label>

            <input
              type="number"
              id="goals"
              name="goals"
              value={profile.goals}
              onChange={handleInputChange}
              className="w-full p-3 rounded-lg bg-slate-600/40 border border-slate-600 text-white focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>

          <button
            onClick={handleSave}
            className="w-full bg-cyan-500 hover:bg-cyan-600 transition-colors text-black font-medium py-3 rounded-lg">
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditScreen;