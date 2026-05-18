import { motion } from "framer-motion"
import { BookOpen, Award, Users, Zap, Shield, TrendingUp, CheckCircle, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { pageVariants, staggerContainer, staggerItem } from "@/lib/motion"
import { Link } from "react-router-dom"

export default function LearnMore() {
  const features = [
    {
      icon: Zap,
      title: "AI-Powered Detection",
      description: "Advanced machine learning models analyze medical images and symptoms with high accuracy"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your health data is encrypted and protected with enterprise-grade security"
    },
    {
      icon: Users,
      title: "Expert Guidance",
      description: "Access to medical insights and personalized health recommendations"
    },
    {
      icon: TrendingUp,
      title: "Health Tracking",
      description: "Monitor your health metrics and get actionable insights over time"
    }
  ]

  const howItWorks = [
    {
      step: "1",
      title: "Upload or Describe",
      description: "Upload medical images or describe your symptoms in detail"
    },
    {
      step: "2",
      title: "AI Analysis",
      description: "Our AI models analyze your data against millions of health records"
    },
    {
      step: "3",
      title: "Get Results",
      description: "Receive detailed analysis with confidence scores and insights"
    },
    {
      step: "4",
      title: "Take Action",
      description: "Get personalized recommendations and consult with healthcare providers"
    }
  ]

  const modules = [
    {
      title: "Disease Detection",
      description: "Detect brain tumors, lung diseases from medical imaging",
      icon: "🧠",
      stats: "2 ML Models"
    },
    {
      title: "Symptom Analysis",
      description: "Describe your symptoms and get AI-powered preliminary assessments",
      icon: "🩺",
      stats: "1000+ Symptoms"
    },
    {
      title: "Health Guidance",
      description: "Receive personalized health recommendations based on your profile",
      icon: "💡",
      stats: "24/7 Available"
    },
    {
      title: "Medical News",
      description: "Stay updated with latest medical breakthroughs and health trends",
      icon: "📰",
      stats: "Real-time Updates"
    },
    {
      title: "Health Tips",
      description: "Learn science-backed wellness tips for nutrition, fitness, and mental health",
      icon: "💪",
      stats: "20+ Categories"
    },
    {
      title: "Insurance Help",
      description: "Compare plans and find the best health insurance coverage for you",
      icon: "💼",
      stats: "Top Plans"
    }
  ]

  const benefits = [
    "Early disease detection saves lives",
    "Personalized health recommendations",
    "24/7 access to health resources",
    "AI-powered analysis in seconds",
    "Privacy-first approach",
    "Evidence-based guidance"
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
            <BookOpen className="h-10 w-10 text-blue-600" />
            <h1 className="text-5xl font-bold">Learn More About MediDash</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your comprehensive AI-powered health platform for disease detection, wellness guidance, and informed healthcare decisions.
          </p>
        </motion.div>

        {/* What We Do */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-6"
        >
          <div>
            <h2 className="text-3xl font-bold mb-2">What We Do</h2>
            <p className="text-muted-foreground">
              MediDash combines cutting-edge artificial intelligence with medical expertise to provide accessible, accurate health insights. We empower individuals to take control of their health through technology.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div key={index} variants={staggerItem}>
                <Card className="h-full hover-lift">
                  <CardHeader className="space-y-3">
                    <feature.icon className="h-10 w-10 text-blue-600" />
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          <div>
            <h2 className="text-3xl font-bold">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((item, index) => (
              <motion.div key={index} variants={staggerItem} className="relative">
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white font-bold text-lg">
                        {item.step}
                      </div>
                      {index < 3 && (
                        <ArrowRight className="h-5 w-5 text-blue-600 hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2" />
                      )}
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{item.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Our Modules */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-6"
        >
          <div>
            <h2 className="text-3xl font-bold mb-2">Our Features & Modules</h2>
            <p className="text-muted-foreground">
              Explore the complete suite of healthcare tools and services available in MultiDisease Tracker.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, index) => (
              <motion.div key={index} variants={staggerItem}>
                <Card className="h-full hover-lift hover:shadow-lg transition-all">
                  <CardHeader className="space-y-3">
                    <div className="flex items-start justify-between">
                      <span className="text-4xl">{module.icon}</span>
                      <Badge variant="outline">{module.stats}</Badge>
                    </div>
                    <CardTitle className="text-lg">{module.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{module.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why Choose Us */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-6"
        >
          <div>
            <h2 className="text-3xl font-bold mb-2">Why Choose MultiDisease Tracker?</h2>
            <p className="text-muted-foreground mb-6">
              Here's what makes our platform the best choice for your health needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                className="flex items-start gap-3 p-4 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
              >
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="font-medium">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technology Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="space-y-6 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 p-8"
        >
          <div>
            <h2 className="text-3xl font-bold mb-2">Powered By Advanced Technology</h2>
            <p className="text-muted-foreground">
              We use the latest AI/ML technologies and best practices in healthcare.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                <Award className="h-5 w-5 text-blue-600" />
                Machine Learning
              </h3>
              <p className="text-sm text-muted-foreground">
                TensorFlow, Keras, and advanced neural networks for accurate predictions
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                <Award className="h-5 w-5 text-blue-600" />
                NLP & LLMs
              </h3>
              <p className="text-sm text-muted-foreground">
                LangChain integration with OpenAI for intelligent conversational AI
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                <Award className="h-5 w-5 text-blue-600" />
                Modern Stack
              </h3>
              <p className="text-sm text-muted-foreground">
                React 18, TypeScript, and cloud-ready architecture
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                <Award className="h-5 w-5 text-blue-600" />
                Security
              </h3>
              <p className="text-sm text-muted-foreground">
                Enterprise-grade encryption and HIPAA compliance
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                <Award className="h-5 w-5 text-blue-600" />
                Scalability
              </h3>
              <p className="text-sm text-muted-foreground">
                Microservices architecture for millions of users
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                <Award className="h-5 w-5 text-blue-600" />
                Real-time Data
              </h3>
              <p className="text-sm text-muted-foreground">
                Vector databases for instant medical knowledge retrieval
              </p>
            </div>
          </div>
        </motion.div>

        {/* Healthcare Standards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold">Healthcare Standards & Safety</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  Data Privacy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">
                  We follow strict data protection regulations including GDPR and HIPAA compliance. Your health information is never shared with third parties.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Medical Accuracy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">
                  All our AI models are trained on verified medical datasets and regularly validated by healthcare professionals.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-purple-600" />
                  Continuous Improvement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">
                  We constantly update our models and knowledge base to stay current with latest medical research and best practices.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  Professional Review
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">
                  All features are reviewed by medical professionals to ensure accuracy and safety for users.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Is this a replacement for doctors?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  No. MultiDisease Tracker is a supplementary tool to help you understand your health better. Always consult healthcare professionals for diagnosis and treatment.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How accurate are the AI models?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Our models achieve 95%+ accuracy on validated datasets. Results include confidence scores to help you understand reliability.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Is my data safe?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Yes. We use enterprise-grade encryption, HIPAA compliance, and never share your data with third parties.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How much does it cost?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  MultiDisease Tracker is designed to be accessible. Check our pricing page for current plans and options.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="space-y-6 text-center rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-12 text-white"
        >
          <h2 className="text-3xl font-bold">Ready to Take Control of Your Health?</h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Join thousands of users who are already using MultiDisease Tracker to make informed healthcare decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/detect">
              <Button size="lg" variant="secondary" className="text-blue-600">
                <Zap className="mr-2 h-5 w-5" />
                Start Health Check
              </Button>
            </Link>
            <Link to="/tips">
              <Button size="lg" variant="secondary">
                <BookOpen className="mr-2 h-5 w-5" />
                Browse Health Tips
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="space-y-4 text-center"
        >
          <h3 className="text-2xl font-bold">Have Questions?</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our support team is here to help. Contact us anytime at support@multidisease-tracker.com or use our live chat.
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}
