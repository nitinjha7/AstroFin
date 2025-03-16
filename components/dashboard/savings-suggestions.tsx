"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Coffee, CreditCard, ShoppingBag, Utensils } from "lucide-react"

export function SavingsSuggestions() {
  const suggestions = [
    {
      id: 1,
      title: "Reduce dining out expenses",
      description:
        "You spent ₹4,500 on restaurants last month, which is 30% higher than your average. Consider cooking at home more often.",
      icon: Utensils,
      potentialSavings: 1500,
    },
    {
      id: 2,
      title: "Coffee shop spending",
      description:
        "Daily coffee purchases add up to ₹2,400 per month. Making coffee at home could save you significantly.",
      icon: Coffee,
      potentialSavings: 1800,
    },
    {
      id: 3,
      title: "Subscription audit",
      description:
        "You have 5 active subscriptions totaling ₹1,200/month. Consider which ones you actually use regularly.",
      icon: CreditCard,
      potentialSavings: 800,
    },
    {
      id: 4,
      title: "Shopping optimization",
      description:
        "Your discretionary shopping expenses increased by 25% this month. Try implementing a 24-hour rule before making non-essential purchases.",
      icon: ShoppingBag,
      potentialSavings: 2000,
    },
  ]

  return (
    <div className="space-y-4">
      {suggestions.map((suggestion) => (
        <Card key={suggestion.id}>
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-primary/10 p-2">
                <suggestion.icon className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium">{suggestion.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{suggestion.description}</p>
                <div className="mt-2 flex items-center text-sm">
                  <span className="font-medium text-green-600">
                    Potential savings: ₹{suggestion.potentialSavings.toLocaleString()}/month
                  </span>
                  <ArrowRight className="ml-1 h-4 w-4 text-green-600" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

