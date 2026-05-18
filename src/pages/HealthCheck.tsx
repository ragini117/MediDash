import { useState } from "react"
import { motion } from "framer-motion"
import { Heart, Brain, Waves, Activity, Pill, AlertCircle, ArrowRight, Check } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { pageVariants, staggerContainer, staggerItem } from "@/lib/motion"
import { Link } from "react-router-dom"

export default function HealthCheck() {
  const [selectedCheck, setSelectedCheck] = useState<string | null>(null)

  const healthChecks = [
    {
      id: "brain",
      title: "Brain Health Check",
      description: "Analyze medical images for brain-related conditions",
      icon: Brain,
      color: "from-purple-500 to-pink-500",
      details: [
        "Upload MRI or CT scan images",
        "AI analyzes for tumors and abnormalities",
        "Get detailed analysis report",
        "Compare with medical standards"
      ],
      link: "/brain"
    },
    {
      id: "lungs",
      title: "Lung Health Check",
      description: "Detect respiratory and lung diseases from X-rays",
      icon: Waves,
      color: "from-blue-500 to-cyan-500",
      details: [
        "Upload chest X-ray images",
        "Screen for pneumonia and TB",
        "Analyze lung capacity indicators",
        "Get personalized recommendations"
      ],
      link: "/lung"
    },
    {
      id: "general",
      title: "General Disease Detection",
      description: "Analyze symptoms and medical images for various diseases",
      icon: Activity,
      color: "from-green-500 to-emerald-500",
      details: [
        "Describe your symptoms",
        "Upload relevant medical images",
        "Get AI-powered preliminary assessment",
        "Receive expert guidance"
      ],
      link: "/detect"
    },
    {
      id: "symptoms",
      title: "Symptom Checker",
      description: "Get insights based on your reported symptoms",
      icon: Pill,
      color: "from-orange-500 to-red-500",
      details: [
        "Answer health questions",
        "Describe your symptoms",
        "Get possible conditions list",
        "Know when to see a doctor"
      ],
      link: "/SymptomResult"
    }
  ]

  const features = [
    {
      icon: AlertCircle,
      title: "Early Detection",
      description: "Catch health issues early for better outcomes"
    },
    {
      icon: Heart,
      title: "Personalized Results",
      description: "Get insights tailored to your health profile"
    },
    {
      icon: Activity,
      title: "Actionable Guidance",
      description: "Clear recommendations for next steps"
    }
  ]

  const steps = [
    {
      number: "1",
      title: "Choose Your Check",
      description: "Select the health check that matches your needs"
    },
    {
      number: "2",
      title: "Provide Information",
      description: "Upload images or describe your symptoms"
    },
    {
      number: "3",
      title: "AI Analysis",
      description: "Our models analyze your data instantly"
    },
    {
      number: "4",
      title: "Get Results",
      description: "Review detailed analysis and recommendations"
    }
  ]

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-background"
    >
      <div className="container py-8 space-y-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 text-center py-8"
        >
          <div className="flex items-center justify-center gap-3">
            <Heart className="h-10 w-10 text-red-600" />
            <h1 className="text-5xl font-bold">Complete Health Check</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get a comprehensive health assessment using AI-powered analysis. Choose from multiple health check options tailored to your needs.
          </p>
          <Badge variant="outline" className="mx-auto">
            <Activity className="mr-2 h-4 w-4" />
            Fast, Accurate, and Secure
          </Badge>
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold text-center">How Health Check Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <motion.div key={index} variants={staggerItem}>
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white font-bold">
                        {step.number}
                      </div>
                    </div>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{step.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main Health Checks Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold">Select Your Health Check</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {healthChecks.map((check, index) => {
              const Icon = check.icon
              const isSelected = selectedCheck === check.id

              return (
                <motion.div key={check.id} variants={staggerItem}>
                  <Card
                    className={`h-full cursor-pointer transition-all hover-lift ${
                      isSelected ? "ring-2 ring-blue-600" : ""
                    }`}
                    onClick={() => setSelectedCheck(isSelected ? null : check.id)}
                  >
                    <CardHeader>
                      <div className="space-y-4">
                        <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${check.color} text-white w-fit`}>
                          <Icon className="h-8 w-8" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl">{check.title}</CardTitle>
                          <CardDescription className="text-base mt-2">
                            {check.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>

                    {isSelected && (
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <p className="font-semibold text-sm">What's Included:</p>
                          <ul className="space-y-2">
                            {check.details.map((detail, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm">
                                <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <Link to={check.link}>
                          <Button className="w-full" size="lg">
                            Start {check.title}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </CardContent>
                    )}
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold text-center">Why Choose Our Health Check?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const FeatureIcon = feature.icon
              return (
                <motion.div key={index} variants={staggerItem}>
                  <Card className="h-full hover-lift">
                    <CardHeader className="text-center">
                      <div className="flex justify-center mb-4">
                        <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                          <FeatureIcon className="h-8 w-8" />
                        </div>
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <CardDescription>{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Quick Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-6 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 p-8"
        >
          <h2 className="text-3xl font-bold">Tips for Best Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <p className="font-semibold flex items-center gap-2">
                <span className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-600 text-white text-xs font-bold">1</span>
                Provide Clear Images
              </p>
              <p className="text-sm text-muted-foreground">
                Upload high-quality medical images in proper lighting for accurate analysis.
              </p>
            </div>
            <div className="space-y-2">
              <p className="font-semibold flex items-center gap-2">
                <span className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-600 text-white text-xs font-bold">2</span>
                Be Accurate with Symptoms
              </p>
              <p className="text-sm text-muted-foreground">
                Describe your symptoms in detail for better AI analysis and recommendations.
              </p>
            </div>
            <div className="space-y-2">
              <p className="font-semibold flex items-center gap-2">
                <span className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-600 text-white text-xs font-bold">3</span>
                Consult Professionals
              </p>
              <p className="text-sm text-muted-foreground">
                Always verify results with healthcare professionals for final diagnosis.
              </p>
            </div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How long does a health check take?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Most health checks are completed in 2-5 minutes. You'll get instant results and analysis.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Are my results confidential?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Yes. All data is encrypted and never shared with third parties. HIPAA compliant.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What image formats are supported?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We support JPEG, PNG, and DICOM formats. Maximum file size is 50MB per image.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I download my results?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Yes. All results can be downloaded as PDF reports for your records and doctor's review.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="space-y-6 text-center rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-12 text-white"
        >
          <h2 className="text-3xl font-bold">Ready to Take Control of Your Health?</h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Choose a health check above to get started. Results are available instantly.
          </p>
          <Button size="lg" variant="secondary" className="text-blue-600">
            <Heart className="mr-2 h-5 w-5" />
            Explore Health Checks
          </Button>
        </motion.div>

        {/* Safety Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="space-y-4 rounded-lg bg-amber-50 border border-amber-200 p-6"
        >
          <div className="flex items-start gap-4">
            <AlertCircle className="h-6 w-6 text-amber-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-amber-900 mb-2">Important Notice</h3>
              <p className="text-sm text-amber-800">
                This health check is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare professionals for any health concerns. In case of emergency, please call your local emergency services or visit the nearest hospital.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
