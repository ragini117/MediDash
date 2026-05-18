import { motion } from "framer-motion"
import { Heart, Stethoscope, Newspaper, Shield } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { FeatureCard } from "@/components/ui/feature-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { pageVariants, staggerContainer, staggerItem } from "@/lib/motion"
import Chatbot from "./Chatbot";


const healthTips = [
  {
    title: "Stay Hydrated",
    description: "Drink at least 8 glasses of water daily for optimal health.",
    category: "Wellness"
  },
  {
    title: "Regular Exercise",
    description: "30 minutes of moderate activity can improve cardiovascular health.",
    category: "Fitness"
  },
  {
    title: "Quality Sleep",
    description: "7-9 hours of sleep helps your body recover and repair.",
    category: "Sleep"
  },
  {
    title: "Balanced Diet",
    description: "Include fruits, vegetables, and lean proteins in your meals.",
    category: "Nutrition"
  }
]


export default function Dashboard() {
  const navigate = useNavigate()
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-background"
    >
      <div className="container py-8 space-y-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-hero p-8 md:p-12 text-white"
        >
          <div className="relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Your Health,
              <br />
              <span className="text-blue-100">Our Priority</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl">
              Advanced medical insights, disease detection, and personalized health guidance at your fingertips.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="secondary" 
                size="lg" 
                className="text-primary"
                onClick={() => navigate('/detect')}
              >
                <Stethoscope className="mr-2 h-5 w-5" />
                Start Health Check
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate('/learn')}
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Background decoration */}
          <div className="absolute top-0 right-0 opacity-10">
            <Heart className="h-64 w-64" />
          </div>
        </motion.div>

        {/* Feature Cards */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Quick Access</h2>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <motion.div variants={staggerItem}>
              <FeatureCard
                title="Disease Detection"
                description="Upload reports or describe symptoms for AI-powered analysis"
                icon={Stethoscope}
                href="/detect"
                buttonText="Analyze Now"
                variant="default"
              />
            </motion.div>
            <motion.div variants={staggerItem}>
              <FeatureCard
                title="Health News"
                description="Stay updated with latest medical breakthroughs and health tips"
                icon={Newspaper}
                href="/news"
                buttonText="Read News"
                variant="success"
              />
            </motion.div>
            <motion.div variants={staggerItem}>
              <FeatureCard
                title="Insurance Check"
                description="Compare health insurance plans and find the best coverage"
                icon={Shield}
                href="/insurance"
                buttonText="Compare Plans"
                variant="warning"
              />
            </motion.div>
            <motion.div variants={staggerItem}>
              <FeatureCard
                title="Health Guidance"
                description="Get personalized health recommendations and emergency protocols"
                icon={Heart}
                href="/guidance"
                buttonText="Get Guidance"
                variant="danger"
              />
            </motion.div>
          </motion.div>
        </div>
       

        {/* Health Tips Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">Daily Health Tips</h2>
            
           <Button variant="outline" onClick={() => navigate('/tips')}>View All Tips</Button>

          </div>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {healthTips.map((tip) => (
              <motion.div key={tip.title} variants={staggerItem}>
                <Card className="hover-lift h-full shadow-soft">
                  <CardHeader className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {tip.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{tip.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{tip.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
