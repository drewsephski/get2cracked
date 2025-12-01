import { Users } from "lucide-react"
import { cn } from "@/lib/utils"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface InfoCardProps {
  title: string
  value: string
  change: string
  changeType: "increase" | "decrease" | "neutral"
}

export default function InfoCard({ title, value, change, changeType }: InfoCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Users className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className={cn(
            "text-xs",
            changeType === "increase" 
              ? "text-green-600" 
              : changeType === "decrease" 
                ? "text-red-600" 
                : "text-muted-foreground"
          )}>
            {change} from last month
          </p>
        )}
      </CardContent>
    </Card>
  )
}
