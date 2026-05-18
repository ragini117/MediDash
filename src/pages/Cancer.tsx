import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useMemo, useState } from "react"

export default function Lung() {
  const location = useLocation()
  const navigate = useNavigate()
  const file: File | null = location.state?.file || null

  const [result, setResult] = useState("")
  const [confidence, setConfidence] = useState<number | null>(null)
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(true)

  const imageUrl = useMemo(() => {
    return file ? URL.createObjectURL(file) : ""
  }, [file])

  useEffect(() => {
    if (!file) {
      setLoading(false)
      return
    }

    const uploadFile = async () => {
      const formData = new FormData()
      formData.append("image", file)

      try {
        const apiUrl = import.meta.env.VITE_LUNG_DETECTION_API || "http://localhost:5005/predict/lung"
        const res = await fetch(apiUrl, {
          method: "POST",
          body: formData,
        })

        const data = await res.json()

        if (!res.ok) {
          console.error("Server error:", data)
          setResult(data.error || "Error while predicting")
          setLoading(false)
          return
        }

        setResult(data.prediction)
        setDescription(data.description || "")
        setConfidence(Number(data.confidence))
      } catch (error) {
        console.error(error)
        setResult("Error while predicting")
      } finally {
        setLoading(false)
      }
    }

    uploadFile()

    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl)
    }
  }, [file, imageUrl])

  if (!file) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <p className="text-lg md:text-xl">No file uploaded!</p>
      </div>
    )
  }

  const getConfidenceColor = (value: number) => {
    if (value >= 80) return "#22c55e"
    if (value >= 50) return "#eab308"
    return "#ef4444"
  }

  const handleReset = () => {
    navigate(-1)
  }

  return (
    <div className="relative flex flex-col items-center justify-start min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4 pt-10">
      <button
        onClick={handleReset}
        className="absolute top-5 right-5 z-50 w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110 animate-bounce-slow"
        title="Upload another image"
      >
        <span className="text-2xl font-bold">&times;</span>
      </button>

      <h1 className="text-4xl md:text-5xl font-bold mb-8">🫁 Lung Disease Detection</h1>

      <div className="mb-8">
        <img
          src={imageUrl}
          alt="Uploaded"
          className="w-64 md:w-80 h-64 md:h-80 object-cover rounded-xl shadow-lg border"
        />
      </div>

      <p className="mb-6 text-lg md:text-xl">Uploaded File: {file.name}</p>

      {loading && <p className="text-lg md:text-xl">Predicting...</p>}

      {!loading && result && (
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl mb-6 overflow-hidden transform transition-all duration-300">
          <div className="flex justify-center items-center bg-gray-100 dark:bg-gray-700 px-4 py-3 border-b">
            <h2 className="text-lg md:text-xl font-bold">Prediction Result</h2>
          </div>

          <div className="p-6">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-center">
              {result}
            </h3>

            {description && (
              <p className="text-center text-sm md:text-base mb-4 text-gray-600 dark:text-gray-300">
                {description}
              </p>
            )}

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