import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FeatureCardProps {
  title: string
  description: string
  icon: LucideIcon
  href: string
  buttonText?: string
  variant?: "default" | "success" | "warning" | "danger"
  className?: string
}

export function FeatureCard({
  title,
  description,
  icon: Icon,
  href,
  buttonText = "Get Started",
  variant = "default",
  className
}: FeatureCardProps) {
  const variants = {
    default: "hover:bg-primary/5 border-primary/20",
    success: "hover:bg-success/5 border-success/20",
    warning: "hover:bg-warning/5 border-warning/20", 
    danger: "hover:bg-danger/5 border-danger/20"
  }

  const iconColors = {
    default: "text-primary",
    success: "text-success",
    warning: "text-warning",
    danger: "text-danger"
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
      className={cn("group", className)}
    >
      <Card className={cn(
        "h-full border-2 transition-all duration-300 hover-lift shadow-soft",
        variants[variant]
      )}>
        <CardHeader className="space-y-4">
          <div className={cn(
            "flex h-12 w-12 items-center justify-center rounded-lg transition-transform group-hover:scale-110",
            variant === "default" && "bg-primary/10",
            variant === "success" && "bg-success/10", 
            variant === "warning" && "bg-warning/10",
            variant === "danger" && "bg-danger/10"
          )}>
            <Icon className={cn("h-6 w-6", iconColors[variant])} />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription className="text-muted-foreground">
              {description}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <Button asChild className="w-full hover-glow">
            <Link to={href}>{buttonText}</Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}