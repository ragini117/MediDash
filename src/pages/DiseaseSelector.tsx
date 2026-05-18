import { useState } from "react";
import { useNavigate } from "react-router-dom";


const DiseaseSelector = () => {
  const [selectedDisease, setSelectedDisease] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (selectedDisease === "brain") {
      navigate("/brain");
    } else if (selectedDisease === "heart") {
      navigate("/heart");
    } else if (selectedDisease === "lung") {
      navigate("/lung");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Choose Disease Detection</h1>
      
      <select
        value={selectedDisease}
        onChange={(e) => setSelectedDisease(e.target.value)}
        className="p-2 border rounded-md"
      >
        <option value="">-- Select --</option>
        <option value="brain">🧠 Brain Tumor Detection</option>
        <option value="heart">❤️ Heart Disease Prediction</option>
        <option value="lung">🫁 Lung Disease Detection</option>
      </select>

      <button
        onClick={handleSubmit}
        disabled={!selectedDisease}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-400"
      >
        Continue
      </button>
    </div>
  );
};

export default DiseaseSelector;
