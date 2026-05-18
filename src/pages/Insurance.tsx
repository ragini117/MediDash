import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Heart, Brain, Stethoscope, BriefcaseMedical } from "lucide-react"

// Hospital interface
export interface Hospital {
  hospital_id: number
  name: string
  address: string
  city: string
  state: string
  pincode: string
  specialties: string
  insurances: string
  features: string
  appointment_url?: string
}

// Map features to icons
const getFeatureIcon = (feature: string) => {
  switch (feature.trim()) {
    case "Heart": return <Heart className="w-5 h-5 text-red-500" />
    case "Brain": return <Brain className="w-5 h-5 text-blue-500" />
    case "Cancer": return <Stethoscope className="w-5 h-5 text-purple-500" />
    case "24/7 ER": return <BriefcaseMedical className="w-5 h-5 text-green-500" />
    default: return <Stethoscope className="w-5 h-5 text-gray-500" />
  }
}

// Sample data for demonstration
const SAMPLE_HOSPITALS: Hospital[] = [
  {
    hospital_id: 1,
    name: "Apollo Hospitals Delhi",
    address: "Sector 25, Noida",
    city: "Noida",
    state: "Uttar Pradesh",
    pincode: "201301",
    specialties: "Heart, Brain, Cancer",
    insurances: "BUPA, Aetna, Apollo Munich",
    features: "Heart,24/7 ER",
    appointment_url: "https://www.apollohospitals.com"
  },
  {
    hospital_id: 2,
    name: "Fortis Healthcare Mumbai",
    address: "Fort Area, South Mumbai",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400023",
    specialties: "Brain, Cancer, Cardiology",
    insurances: "HDFC ERGO, Star Health, Care",
    features: "Brain,24/7 ER",
    appointment_url: "https://www.fortishealth.com"
  },
  {
    hospital_id: 3,
    name: "Max Healthcare Bangalore",
    address: "Whitefield, Bangalore",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560066",
    specialties: "Heart, Cardiology, Oncology",
    insurances: "Cigna, Reliance, United",
    features: "Heart,Brain",
    appointment_url: "https://www.maxhealthcare.in"
  },
  {
    hospital_id: 4,
    name: "Medanta Medicity Gurgaon",
    address: "Golf Course Road, Gurgaon",
    city: "Gurgaon",
    state: "Haryana",
    pincode: "122001",
    specialties: "All Specialties, Heart, Cancer",
    insurances: "ICICI Lombard, Bajaj, HDFC",
    features: "Heart,Brain,Cancer,24/7 ER",
    appointment_url: "https://www.medanta.org"
  },
  {
    hospital_id: 5,
    name: "Narayana Health Bengaluru",
    address: "Hsr Layout, Bengaluru",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560102",
    specialties: "Heart, Brain, General Surgery",
    insurances: "SBI General, Acko, PharmEasy",
    features: "Heart,Brain",
    appointment_url: "https://www.narayanahealth.org"
  },
  {
    hospital_id: 6,
    name: "Manipal Hospitals Pune",
    address: "Vijay Nagar, Pune",
    city: "Pune",
    state: "Maharashtra",
    pincode: "411014",
    specialties: "Cancer, Oncology, Surgery",
    insurances: "Royal Sundaram, Iffco Tokio",
    features: "Cancer,24/7 ER",
    appointment_url: "https://www.manipalhospitals.com"
  }
]

const SAMPLE_INSURANCES = [
  "BUPA",
  "Aetna",
  "Apollo Munich",
  "HDFC ERGO",
  "Star Health",
  "Care",
  "Cigna",
  "Reliance",
  "United",
  "ICICI Lombard",
  "Bajaj",
  "SBI General",
  "Acko",
  "PharmEasy"
]

const Insurance: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([])
  const [filteredHospitals, setFilteredHospitals] = useState<Hospital[]>([])
  const [insurances, setInsurances] = useState<string[]>([])
  const [specialties, setSpecialties] = useState<string[]>([])
  const [selectedInsurance, setSelectedInsurance] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("")
  const [loading, setLoading] = useState(true)

  // Fetch hospitals + insurances
  useEffect(() => {
    const fetchData = async () => {
      try {
        const hospitalApiUrl = import.meta.env.VITE_HOSPITAL_API || "http://localhost:5005/api/hospitals"
        const insuranceApiUrl = import.meta.env.VITE_INSURANCE_API || "http://localhost:5005/api/insurances"
        
        const hospitalRes = await fetch(hospitalApiUrl)
        const hospitalData: Hospital[] = await hospitalRes.json()
        setHospitals(hospitalData)
        setFilteredHospitals(hospitalData)

        // Extract unique specialties from hospitals
        const specialtySet = new Set<string>()
        hospitalData.forEach(h => h.specialties.split(",").forEach(s => specialtySet.add(s.trim())))
        setSpecialties(Array.from(specialtySet))

        const insuranceRes = await fetch(insuranceApiUrl)
        const insuranceData: string[] = await insuranceRes.json()
        setInsurances(insuranceData)
      } catch (err) {
        console.error("Backend not available, using sample data:", err)
        // Use sample data if backend is not available
        setHospitals(SAMPLE_HOSPITALS)
        setFilteredHospitals(SAMPLE_HOSPITALS)
        setInsurances(SAMPLE_INSURANCES)
        
        const specialtySet = new Set<string>()
        SAMPLE_HOSPITALS.forEach(h => h.specialties.split(",").forEach(s => specialtySet.add(s.trim())))
        setSpecialties(Array.from(specialtySet))
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const applyFilter = () => {
    let filtered = hospitals
    if (selectedInsurance) {
      filtered = filtered.filter(h => h.insurances?.includes(selectedInsurance))
    }
    if (selectedSpecialty) {
      filtered = filtered.filter(h => h.specialties?.includes(selectedSpecialty))
    }
    setFilteredHospitals(filtered)
  }

  const clearFilter = () => {
    setSelectedInsurance("")
    setSelectedSpecialty("")
    setFilteredHospitals(hospitals)
  }

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p>Loading hospitals and insurance information...</p>
      </div>
    </div>
  )
  
  if (!hospitals.length) return (
    <div className="text-center py-12">
      <p className="text-muted-foreground">No hospitals found. Please try again later.</p>
    </div>
  )

  // Hospital Card
  const HospitalCard: React.FC<{ hospital: Hospital }> = ({ hospital }) => {
    const featureList = hospital.features?.split(",") || []
    const specialtyList = hospital.specialties?.split(",") || []
    const insuranceList = hospital.insurances?.split(",") || []

    return (
      <motion.div className="h-full">
        <Card className="p-4 hover:shadow-xl transition-all duration-300 h-full rounded-lg">
          <CardContent className="space-y-2">
            <h3 className="text-base font-semibold">{hospital.name}</h3>
            <p className="text-sm text-muted-foreground">
              {hospital.address}, {hospital.city}, {hospital.state}, {hospital.pincode}
            </p>

            <div className="flex flex-wrap gap-2 mt-1">
              {featureList.map((feature, i) => (
                <div key={i} className="p-1 border rounded-full">{getFeatureIcon(feature)}</div>
              ))}
            </div>

            <div className="text-sm mt-1">
              <strong>Specialties:</strong> {specialtyList.join(", ")}
            </div>
            <div className="text-sm">
              <strong>Insurances:</strong> {insuranceList.join(", ")}
            </div>

            <div className="flex gap-2 mt-3">
              <Button variant="outline" size="sm" className="flex-1">View</Button>
              <Button
                size="sm"
                className="flex-1"
                onClick={() =>
                  hospital.appointment_url
                    ? window.open(hospital.appointment_url, "_blank")
                    : alert(`No appointment URL found for ${hospital.name}`)
                }
              >
                Book
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <div className="space-y-6 px-6 py-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Insurance & Hospital Finder</h1>
        <p className="text-muted-foreground">Find hospitals and compare insurance coverage in your area</p>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-900 dark:text-blue-100">
          💡 <strong>Tip:</strong> Filter by insurance provider or medical specialty to find hospitals that match your needs.
        </p>
      </div>

      {/* Filter section */}
      <div className="flex flex-wrap justify-center gap-4 mb-4">
        <Select onValueChange={setSelectedInsurance} value={selectedInsurance}>
          <SelectTrigger className="w-60">
            <SelectValue placeholder="Select Insurance" />
          </SelectTrigger>
          <SelectContent>
            {insurances.map((insurance, idx) => (
              <SelectItem key={idx} value={insurance}>{insurance}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={setSelectedSpecialty} value={selectedSpecialty}>
          <SelectTrigger className="w-60">
            <SelectValue placeholder="Select Specialty" />
          </SelectTrigger>
          <SelectContent>
            {specialties.map((specialty, idx) => (
              <SelectItem key={idx} value={specialty}>{specialty}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button onClick={applyFilter} variant="default">Apply Filter</Button>
        <Button onClick={clearFilter} variant="outline">Clear</Button>
      </div>

      {/* Hospital cards */}
      {filteredHospitals.length ? (
        <div>
          <p className="text-sm text-muted-foreground mb-4">
            Found <strong>{filteredHospitals.length}</strong> hospital(s) matching your criteria
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHospitals.map(h => <HospitalCard key={h.hospital_id} hospital={h} />)}
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-muted/50 rounded-lg">
          <p className="text-muted-foreground mb-4">No hospitals match your filter criteria.</p>
          <Button onClick={clearFilter} variant="outline">Clear Filters</Button>
        </div>
      )}
    </div>
  )
}

export default Insurance
