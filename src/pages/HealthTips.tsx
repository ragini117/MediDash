import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Search, Filter, Heart, Zap, Moon, Apple, Leaf, Smile } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { pageVariants, staggerContainer, staggerItem } from "@/lib/motion"

const allHealthTips = [
  // Wellness Tips
  {
    title: "Stay Hydrated",
    description: "Drink at least 8 glasses of water daily for optimal health. Proper hydration supports brain function, physical performance, and energy levels.",
    category: "Wellness",
    icon: "💧",
    tips: ["Start your day with a glass of water", "Drink water before meals", "Keep a water bottle with you"]
  },
  {
    title: "Manage Stress",
    description: "Practice meditation, deep breathing, or yoga to reduce stress. Chronic stress can weaken your immune system.",
    category: "Wellness",
    icon: "🧘",
    tips: ["Try 10 minutes of meditation daily", "Practice deep breathing exercises", "Take breaks during work"]
  },
  {
    title: "Get Sunlight",
    description: "Spend 15-20 minutes in natural sunlight daily for vitamin D production and improved mood.",
    category: "Wellness",
    icon: "☀️",
    tips: ["Take a morning walk", "Eat lunch outdoors when possible", "Keep your workspace well-lit"]
  },
  
  // Fitness Tips
  {
    title: "Regular Exercise",
    description: "30 minutes of moderate activity can improve cardiovascular health, strengthen bones, and boost mood.",
    category: "Fitness",
    icon: "🏃",
    tips: ["Start with 10-minute walks", "Use stairs instead of elevators", "Do light stretching daily"]
  },
  {
    title: "Build Muscle Strength",
    description: "Resistance training 2-3 times per week helps maintain muscle mass and bone density.",
    category: "Fitness",
    icon: "💪",
    tips: ["Try bodyweight exercises", "Use resistance bands", "Do squats and push-ups"]
  },
  {
    title: "Improve Flexibility",
    description: "Stretching and yoga enhance flexibility, reduce injury risk, and improve mobility.",
    category: "Fitness",
    icon: "🤸",
    tips: ["Stretch for 5 minutes after exercise", "Try yoga 2-3 times weekly", "Warm up before exercising"]
  },
  
  // Sleep Tips
  {
    title: "Quality Sleep",
    description: "7-9 hours of sleep helps your body recover, repair, and maintain immune function.",
    category: "Sleep",
    icon: "😴",
    tips: ["Keep consistent sleep schedule", "Avoid screens 1 hour before bed", "Keep bedroom cool and dark"]
  },
  {
    title: "Sleep Hygiene",
    description: "Establish a bedtime routine to improve sleep quality and duration.",
    category: "Sleep",
    icon: "🛏️",
    tips: ["Use blackout curtains", "Keep temperature at 65-68°F", "Avoid caffeine after 3 PM"]
  },
  {
    title: "Combat Sleep Issues",
    description: "If you have insomnia, try these evidence-based techniques.",
    category: "Sleep",
    icon: "⏰",
    tips: ["Try the 4-7-8 breathing technique", "Get morning sunlight", "Limit naps to 20 minutes"]
  },
  
  // Nutrition Tips
  {
    title: "Balanced Diet",
    description: "Include fruits, vegetables, lean proteins, and whole grains in your meals for complete nutrition.",
    category: "Nutrition",
    icon: "🥗",
    tips: ["Fill half your plate with vegetables", "Choose whole grains", "Include protein at every meal"]
  },
  {
    title: "Reduce Sugar Intake",
    description: "Limit added sugars to less than 25g daily for women and 36g for men.",
    category: "Nutrition",
    icon: "🍬",
    tips: ["Read nutrition labels", "Choose water over sugary drinks", "Eat whole fruits instead of juice"]
  },
  {
    title: "Eat More Fiber",
    description: "Aim for 25-30g of fiber daily to improve digestion and heart health.",
    category: "Nutrition",
    icon: "🌾",
    tips: ["Include beans and legumes", "Eat fruits with skin", "Choose whole grain bread"]
  },
  {
    title: "Healthy Snacking",
    description: "Choose nutritious snacks to maintain energy levels and prevent overeating.",
    category: "Nutrition",
    icon: "🥜",
    tips: ["Have nuts and seeds ready", "Snack on fresh fruit", "Pair protein with carbs"]
  },
  
  // Heart Health
  {
    title: "Lower Blood Pressure",
    description: "Reduce sodium intake, exercise regularly, and maintain a healthy weight.",
    category: "Heart Health",
    icon: "❤️",
    tips: ["Limit salt to 1 teaspoon daily", "Exercise 30 minutes daily", "Reduce stress"]
  },
  {
    title: "Improve Cholesterol",
    description: "Eat more soluble fiber, lean proteins, and healthy fats.",
    category: "Heart Health",
    icon: "💓",
    tips: ["Eat oats and beans", "Use olive oil", "Choose fatty fish like salmon"]
  },
  
  // Mental Health
  {
    title: "Improve Mood",
    description: "Exercise, social connection, and sunlight are natural mood boosters.",
    category: "Mental Health",
    icon: "😊",
    tips: ["Connect with friends", "Practice gratitude", "Engage in hobbies"]
  },
  {
    title: "Boost Confidence",
    description: "Practice positive self-talk and celebrate small wins.",
    category: "Mental Health",
    icon: "🌟",
    tips: ["Set achievable goals", "Practice self-compassion", "Keep a success journal"]
  },
  
  // Immunity
  {
    title: "Boost Immunity",
    description: "Sleep well, exercise, eat healthy, and manage stress to strengthen your immune system.",
    category: "Immunity",
    icon: "🛡️",
    tips: ["Eat citrus fruits", "Get vitamin D", "Stay active"]
  },
  {
    title: "Vitamin C Sources",
    description: "Include vitamin C-rich foods to support immune function.",
    category: "Immunity",
    icon: "🍊",
    tips: ["Eat oranges and berries", "Include bell peppers", "Try kiwi and mango"]
  },
]

export default function HealthTips() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = ["All", ...new Set(allHealthTips.map(tip => tip.category))]

  const filteredTips = useMemo(() => {
    return allHealthTips.filter(tip => {
      const matchesSearch = tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tip.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = !selectedCategory || selectedCategory === "All" || tip.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

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
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-500/20 via-blue-500/20 to-purple-500/20 p-8 md:p-12 border border-green-500/20"
        >
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="h-8 w-8 text-green-600" />
              <h1 className="text-4xl md:text-5xl font-bold">Health Tips & Wellness Guide</h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Discover science-backed health tips to improve your wellbeing. Learn practical strategies for better nutrition, fitness, sleep, and mental health.
            </p>
          </div>
        </motion.div>

        {/* Search and Filter Section */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search health tips..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Results Counter */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium">{filteredTips.length} tips</span>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category || (selectedCategory === null && category === "All") ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category === "All" ? null : category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Tips Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredTips.length > 0 ? (
            filteredTips.map((tip, index) => (
              <motion.div key={`${tip.title}-${index}`} variants={staggerItem}>
                <Card className="hover-lift h-full shadow-soft hover:shadow-lg transition-all duration-300 overflow-hidden">
                  {/* Category Badge */}
                  <div className="h-1 bg-gradient-to-r from-green-500 to-blue-500" />
                  
                  <CardHeader className="space-y-3">
                    <div className="flex items-start justify-between">
                      <span className="text-4xl">{tip.icon}</span>
                      <Badge variant="outline" className="text-xs">
                        {tip.category}
                      </Badge>
                    </div>
                    <div>
                      <CardTitle className="text-xl">{tip.title}</CardTitle>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <CardDescription className="text-base">{tip.description}</CardDescription>
                    
                    {/* Quick Tips */}
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-foreground">Quick Tips:</p>
                      <ul className="space-y-2">
                        {tip.tips.map((quickTip, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-green-600 font-bold mt-0.5">✓</span>
                            <span>{quickTip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <Zap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg text-muted-foreground">No tips found matching your search.</p>
              <p className="text-sm text-muted-foreground mt-2">Try different keywords or categories.</p>
            </div>
          )}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-green-600">{allHealthTips.length}+</CardTitle>
              <CardDescription>Health Tips</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-blue-600">{new Set(allHealthTips.map(t => t.category)).size}</CardTitle>
              <CardDescription>Categories</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-purple-600">100%</CardTitle>
              <CardDescription>Science-Backed</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-orange-600">Daily</CardTitle>
              <CardDescription>New Insights</CardDescription>
            </CardHeader>
          </Card>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="rounded-2xl bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 p-8 md:p-12 text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Health?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Start implementing these tips today and see the difference in your energy, mood, and overall wellbeing.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
            <Heart className="mr-2 h-5 w-5" />
            Get Personalized Guidance
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}
