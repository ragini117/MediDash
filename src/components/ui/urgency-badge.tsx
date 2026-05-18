import { Badge } from "@/components/ui/badge"
import { AlertTriangle, AlertCircle, Info, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

type UrgencyLevel = "emergency" | "high" | "medium" | "low"

interface UrgencyBadgeProps {
  level: UrgencyLevel
  className?: string
}

const urgencyConfig = {
  emergency: {
    label: "Emergency",
    icon: AlertTriangle,
    className: "bg-danger text-danger-foreground border-danger/50"
  },
  high: {
    label: "High Priority", 
    icon: AlertCircle,
    className: "bg-warning text-warning-foreground border-warning/50"
  },
  medium: {
    label: "Medium Priority",
    icon: Info, 
    className: "bg-primary text-primary-foreground border-primary/50"
  },
  low: {
    label: "Low Priority",
    icon: CheckCircle,
    className: "bg-success text-success-foreground border-success/50"
  }
}

export function UrgencyBadge({ level, className }: UrgencyBadgeProps) {
  const config = urgencyConfig[level]
  const Icon = config.icon

  return (
    <Badge 
      variant="outline" 
      className={cn(
        "flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium border",
        config.className,
        className
      )}
    >
      <Icon className="h-3 w-3" />
      {config.label}
    </Badge>
  )
}