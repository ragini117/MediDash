import { motion } from "framer-motion"
import { Heart, Phone, MapPin, Clock, AlertTriangle, CheckCircle, Info, User } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { UrgencyBadge } from "@/components/ui/urgency-badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { pageVariants, staggerContainer, staggerItem } from "@/lib/motion"

const guidanceByUrgency = {
  emergency: {
    title: "Emergency Situations",
    description: "Immediate medical attention required",
    tips: [
      "Call 911 immediately",
      "Stay calm and provide clear location",
      "Follow dispatcher instructions",
      "Do not hang up until told to do so"
    ],
    scenarios: [
      "Chest pain or heart attack symptoms",
      "Severe difficulty breathing",
      "Major trauma or accidents",
      "Uncontrolled bleeding",
      "Loss of consciousness"
    ]
  },
  high: {
    title: "High Priority Care",
    description: "Seek medical care within hours",
    tips: [
      "Contact your doctor or urgent care",
      "Monitor symptoms closely",
      "Prepare medical history and medications list",
      "Consider emergency room if symptoms worsen"
    ],
    scenarios: [
      "High fever (>103°F)",
      "Severe abdominal pain",
      "Persistent vomiting",
      "Signs of dehydration",
      "Sudden severe headache"
    ]
  },
  medium: {
    title: "Moderate Priority",
    description: "Schedule appointment within days",
    tips: [
      "Contact healthcare provider for appointment",
      "Document symptoms and triggers",
      "Continue monitoring condition",
      "Take prescribed medications as directed"
    ],
    scenarios: [
      "Persistent cough or cold",
      "Minor injuries or sprains",
      "Skin rashes or irritation",
      "Digestive issues",
      "Sleep disturbances"
    ]
  },
  low: {
    title: "Self-Care & Prevention",
    description: "Monitor and manage at home",
    tips: [
      "Practice good hygiene",
      "Maintain healthy diet and exercise",
      "Get adequate sleep",
      "Schedule regular check-ups"
    ],
    scenarios: [
      "Minor aches and pains",
      "Seasonal allergies",
      "Mild fatigue",
      "Stress management",
      "Preventive care"
    ]
  }
}

const nearbyProviders = [
  {
    name: "Apollo Hospital, Delhi",
    type: "Emergency Room",
    distance: "1.2 km",
    phone: "+91 8625880349",
    address: "Sarita Vihar, New Delhi, Delhi 110076",
    rating: 4.5,
    waitTime: "30 min"
  },
  {
    name: "Fortis Healthcare, Bangalore",
    type: "Urgent Care",
    distance: "2.5 km",
    phone: "+91 80 4199 1000",
    address: "Bannerghatta Road, Bangalore, Karnataka 560076",
    rating: 4.4,
    waitTime: "25 min"
  },
  {
    name: "Max Super Specialty Hospital, Mumbai",
    type: "Primary Care",
    distance: "3 km",
    phone: "+91 22 2652 3000",
    address: "Andheri East, Mumbai, Maharashtra 400059",
    rating: 4.6,
    waitTime: "Next day"
  },
  {
    name: "Mind & Soul Counseling, Pune",
    type: "Mental Health",
    distance: "1.8 km",
    phone: "+91 8446516992",
    address: "Koregaon Park, Pune, Maharashtra 411001",
    rating: 4.7,
    waitTime: "3-5 days"
  }
];

const emergencyContacts = [
  { name: "Emergency Services", number: "112", description: "Police, Fire, Ambulance (Universal Helpline)" },
  { name: "Police", number: "100", description: "Direct Police Helpline" },
  { name: "Fire", number: "101", description: "Fire Emergency Helpline" },
  { name: "Ambulance", number: "102 / 108", description: "Medical Emergency Services" },
  { name: "Women Helpline", number: "181 / 1091", description: "Women in distress / Domestic Violence" },
  { name: "Child Helpline", number: "1098", description: "Emergency support for children" },
  { name: "Disaster Management", number: "1078", description: "Natural Disaster / Relief Helpline" },
  { name: "Mental Health", number: "14416", description: "Tele-MANAS – Govt. Mental Health Support (24x7)" }
]

export default function Guidance() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-background"
    >
      <div className="container py-8 space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Health Guidance System</h1>
          <p className="text-xl text-muted-foreground">
            Get personalized health recommendations and emergency protocols based on urgency levels
          </p>
        </div>

        {/* Emergency Contacts Card */}
        <Card className="border-danger/20 bg-danger/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-danger">
              <Phone className="h-5 w-5" />
              Emergency Contacts
            </CardTitle>
            <CardDescription>
              Important numbers for immediate assistance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {emergencyContacts.map(contact => (
                <div key={contact.number} className="flex items-center justify-between p-3 bg-background rounded-lg border">
                  <div>
                    <div className="font-semibold">{contact.name}</div>
                    <div className="text-sm text-muted-foreground">{contact.description}</div>
                  </div>
                  <Button variant="outline" size="sm" className="font-mono">
                    {contact.number}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Guidance by Urgency */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Health Guidance by Priority</h2>
          <Accordion type="single" collapsible defaultValue="emergency" className="space-y-4">
            {Object.entries(guidanceByUrgency).map(([level, guidance]) => (
              <AccordionItem
                key={level}
                value={level}
                className="border border-border rounded-lg overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center gap-3">
                    <UrgencyBadge level={level as any} />
                    <div className="text-left">
                      <div className="font-semibold">{guidance.title}</div>
                      <div className="text-sm text-muted-foreground">{guidance.description}</div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold">What to do:</h4>
                      <ul className="space-y-2">
                        {guidance.tips.map((tip, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-semibold">Common scenarios:</h4>
                      <ul className="space-y-2">
                        {guidance.scenarios.map((scenario, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <Info className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <span>{scenario}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Nearby Healthcare Providers */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Nearby Healthcare Providers</h2>
            <Button variant="outline" size="sm">
              <MapPin className="mr-2 h-4 w-4" />
              Update Location
            </Button>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {nearbyProviders.map((provider, index) => (
              <motion.div key={provider.name} variants={staggerItem}>
                <Card className="hover-lift shadow-soft">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <CardTitle className="text-lg">{provider.name}</CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{provider.type}</Badge>
                          <div className="flex items-center gap-1 text-sm">
                            <MapPin className="h-3 w-3" />
                            <span>{provider.distance}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right text-sm">
                        <div className="font-semibold">★ {provider.rating}</div>
                        <div className="text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {provider.waitTime}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-sm text-muted-foreground">
                      {provider.address}
                    </div>
                    <div className="flex gap-2">
                      <a href={`tel:${provider.phone}`} className="flex-1">
                        <Button size="sm" className="w-full">
                          <Phone className="mr-2 h-4 w-4" />
                          Call
                        </Button>
                      </a>
                      <Button variant="outline" size="sm" className="flex-1">
                        <MapPin className="mr-2 h-4 w-4" />
                        Directions
                      </Button>
                    </div>

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
