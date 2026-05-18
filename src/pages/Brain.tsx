import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

export default function Brain() {
  const location = useLocation()
  const navigate = useNavigate()
  const file: File | null = location.state?.file || null
  const [result, setResult] = useState("")
  const [confidence, setConfidence] = useState<number | null>(null)
  const [showCard, setShowCard] = useState(true)
  const [animateCard, setAnimateCard] = useState(true)

  useEffect(() => {
    if (!file) return

    const uploadFile = async () => {
      const formData = new FormData()
      formData.append("image", file)

      try {
        const apiUrl = import.meta.env.VITE_BRAIN_DETECTION_API || "http://localhost:5001/predict/brain"
        const res = await fetch(apiUrl, {
          method: "POST",
          body: formData,
        })

        if (!res.ok) {
          const text = await res.text()
          console.error("Server response:", text)
          setResult("Error while predicting")
          return
        }

        const data = await res.json()
        setResult(data.prediction)

        // ✅ use model's raw confidence value
        if (typeof data.confidence === "string") {
          // if backend returns "92%" as string
          setConfidence(parseFloat(data.confidence.replace("%", "")))
        } else {
          // if backend returns number directly
          setConfidence(Number(data.confidence))
        }
      } catch (error) {
        console.error(error)
        setResult("Error while predicting")
      }
    }

    uploadFile()
  }, [file])

  if (!file)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <p className="text-lg md:text-xl">No file uploaded!</p>
      </div>
    )

  const getConfidenceColor = (value: number) => {
    if (value >= 80) return "#22c55e" // green
    if (value >= 50) return "#eab308" // yellow
    return "#ef4444" // red
  }

  const handleReset = () => {
    navigate(-1)
  }

  return (
    <div className="relative flex flex-col items-center justify-start min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4 pt-10">
      
      {/* Full-page cross button */}
      <button
        onClick={handleReset}
        className="absolute top-5 right-5 z-50 w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110 animate-bounce-slow"
        title="Upload another image"
      >
        <span className="text-2xl font-bold">&times;</span>
      </button>

      <h1 className="text-4xl md:text-5xl font-bold mb-8">🧠 Brain Tumor Detection</h1>

      {/* Uploaded Image */}
      <div className="mb-8">
        <img
          src={URL.createObjectURL(file)}
          alt="Uploaded"
          className="w-64 md:w-80 h-64 md:h-80 object-cover rounded-xl shadow-lg dark:shadow-gray-700 border border-gray-300 dark:border-gray-600"
        />
      </div>

      {/* File Name */}
      <p className="mb-6 text-lg md:text-xl text-gray-700 dark:text-gray-300">
        Uploaded File: {file.name}
      </p>

      {/* Prediction Card */}
      {result && showCard && (
        <div
          className={`w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl mb-6 overflow-hidden transform transition-all duration-300 ${
            animateCard ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
          }`}
        >
          {/* Top Bar */}
          <div className="flex justify-center items-center bg-gray-100 dark:bg-gray-700 px-4 py-3 border-b border-gray-300 dark:border-gray-600">
            <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100">
              Prediction Result
            </h2>
          </div>

          {/* Card Content */}
          <div className="p-6">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100">
              {result}
            </h3>

            {/* Confidence Progress Bar */}
            {confidence !== null && (
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-8 overflow-hidden">
                <div
                  className="h-8 flex items-center justify-center text-white font-semibold transition-all duration-500"
                  style={{
                    width: `${confidence}%`,
                    backgroundColor: getConfidenceColor(confidence),
                  }}
                >
                  {confidence.toFixed(2)}% Confidence
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {!result && <p className="text-lg md:text-xl">Predicting...</p>}

      <style>
        {`
          @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
          }
          .animate-bounce-slow {
            animation: bounce-slow 2s infinite;
          }
        `}
      </style>
    </div>
  )
}
