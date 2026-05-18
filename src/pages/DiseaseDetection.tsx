import { useState, useRef } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Upload, FileText } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

export default function DiseaseDetection() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Disease Detection</h1>
          <p className="text-xl text-muted-foreground">
            Upload medical images for AI disease detection
          </p>
        </div>

        <Tabs defaultValue={location.state?.selectedDisease || "brain"} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="brain">🧠 Brain Tumor</TabsTrigger>
            <TabsTrigger value="lung">🫁 Lung Disease</TabsTrigger>
          </TabsList>

          <TabsContent value="brain">
            <UploadReport
              predictionUrl={import.meta.env.VITE_BRAIN_DETECTION_API || "http://localhost:5001/predict/brain"}
              routePath="/brain"
              title="Upload MRI Image"
              emptyMessage="Please select an MRI image"
            />
          </TabsContent>

          <TabsContent value="lung">
            <UploadReport
              predictionUrl={import.meta.env.VITE_LUNG_DETECTION_API || "http://localhost:5005/predict/lung"}
              routePath="/lung"
              title="Upload Lung X-ray Image"
              emptyMessage="Please select a lung image"
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

interface UploadReportProps {
  predictionUrl: string
  routePath: string
  title: string
  emptyMessage: string
}

function UploadReport({
  predictionUrl,
  routePath,
  title,
  emptyMessage,
}: UploadReportProps) {
  const [file, setFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleUpload = () => {
    if (!file) {
      alert(emptyMessage)
      return
    }

    navigate(routePath, {
      state: {
        file,
        predictionUrl,
      },
    })
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          Supports JPG and PNG files up to 10MB
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div
          className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
          onClick={handleButtonClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />

          <p className="text-lg font-medium mb-2">
            Drop file here or click to browse
          </p>

          <Button
            type="button"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation()
              handleButtonClick()
            }}
          >
            <FileText className="mr-2 h-4 w-4" />
            Choose File
          </Button>

          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {file && (
          <div className="mt-4 text-left">
            <h4 className="font-medium">Selected File:</h4>
            <p>{file.name}</p>
          </div>
        )}

        {file && (
          <Button className="w-full mt-4" onClick={handleUpload}>
            Upload & Predict
          </Button>
        )}
      </CardContent>
    </Card>
  )
}