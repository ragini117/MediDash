import { Heart, Shield, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-lg">MediDash</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              Your trusted healthcare companion providing intelligent medical insights, 
              disease detection, and personalized health guidance.
            </p>
            <div className="mt-4 flex items-center space-x-2 text-sm text-warning">
              <Shield className="h-4 w-4" />
              <span className="font-medium">Medical Disclaimer:</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              This platform provides educational information only. Always consult healthcare professionals for medical advice.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/detect" className="text-muted-foreground hover:text-foreground transition-colors">Disease Detection</a></li>
              <li><a href="/news" className="text-muted-foreground hover:text-foreground transition-colors">Health News</a></li>
              <li><a href="/insurance" className="text-muted-foreground hover:text-foreground transition-colors">Insurance</a></li>
              <li><a href="/guidance" className="text-muted-foreground hover:text-foreground transition-colors">Health Guidance</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Emergency</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2 text-danger">
                <Phone className="h-4 w-4" />
                <span className="font-medium">Emergency: 104</span>
              </div>
              <p className="text-muted-foreground">AMBULANCE  102</p>
              <p className="text-muted-foreground">NATIONAL EMERGENCY NUMBER  112</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2025 MediDash. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  )
}