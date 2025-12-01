"use client";

import { useState } from "react";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export function ROICalculator() {
  const [devRate, setDevRate] = useState([100]);
  const [devTime, setDevTime] = useState([500]);
  const [hostingCost, setHostingCost] = useState([200]);

  const monthlyCost = 30;
  const calculations = {
    totalDevCost: devRate[0] * devTime[0],
    opportunityCost: (devRate[0] * devTime[0] * 0.3), // Assuming 30% opportunity cost
    totalSavings: (devRate[0] * devTime[0]) + (devRate[0] * devTime[0] * 0.3) - monthlyCost,
    timeSaved: Math.max(0, devTime[0] / 160 - 0.5), // Assuming 160 hours/month, 2 weeks = 0.5 months
  };

  return (
    <section className="bg-transparent py-24">
      <MaxWidthWrapper>
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Calculate Your ROI
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            See exactly how much time and money you&apos;ll save with Get Cracked
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          {/* Calculator Inputs */}
          <Card>
            <CardHeader>
              <CardTitle>Your Development Costs</CardTitle>
              <CardDescription>
                Adjust the sliders to match your project requirements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="dev-rate">Developer Hourly Rate</Label>
                  <span className="text-sm font-medium">${devRate[0]}/hr</span>
                </div>
                <Slider
                  id="dev-rate"
                  min={50}
                  max={300}
                  step={10}
                  value={devRate}
                  onValueChange={setDevRate}
                  className="w-full"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="dev-time">Development Time</Label>
                  <span className="text-sm font-medium">{devTime[0]} hours</span>
                </div>
                <Slider
                  id="dev-time"
                  min={200}
                  max={2000}
                  step={50}
                  value={devTime}
                  onValueChange={setDevTime}
                  className="w-full"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="hosting">Monthly Hosting & Tools</Label>
                  <span className="text-sm font-medium">${hostingCost[0]}/month</span>
                </div>
                <Slider
                  id="hosting"
                  min={50}
                  max={1000}
                  step={25}
                  value={hostingCost}
                  onValueChange={setHostingCost}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Building from Scratch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between border-b py-2">
                  <span className="text-muted-foreground">Development Cost</span>
                  <span className="font-semibold">${calculations.totalDevCost.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between border-b py-2">
                  <span className="text-muted-foreground">Opportunity Cost (30%)</span>
                  <span className="font-semibold">${calculations.opportunityCost.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between border-b py-2">
                  <span className="text-muted-foreground">Hosting & Tools (6 months)</span>
                  <span className="font-semibold">${(hostingCost[0] * 6).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between border-t py-2 text-lg font-bold">
                  <span>Total Cost</span>
                  <span className="text-red-600">
                    ${(calculations.totalDevCost + calculations.opportunityCost + (hostingCost[0] * 6)).toLocaleString()}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Using Get Cracked</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between border-b py-2">
                  <span className="text-muted-foreground">Get Cracked (6 months)</span>
                  <span className="font-semibold">${(monthlyCost * 6).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between border-t py-2 text-lg font-bold">
                  <span>Total Cost</span>
                  <span className="text-green-600">${(monthlyCost * 6).toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-gradient-to-r from-green-50 to-blue-50 dark:border-green-800 dark:from-green-950/20 dark:to-blue-950/20">
              <CardHeader>
                <CardTitle className="text-center text-green-700 dark:text-green-300">
                  Your Savings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-center">
                <div className="text-4xl font-bold text-green-600">
                  ${calculations.totalSavings.toLocaleString()}
                </div>
                <div className="text-lg text-muted-foreground">
                  {calculations.timeSaved.toFixed(1)} months faster to market
                </div>
                <Button className="w-full" size="lg">
                  Start Saving Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
