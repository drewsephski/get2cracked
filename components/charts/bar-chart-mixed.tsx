"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface BarChartMixedProps {
  data: Array<{
    plan: string;
    count: number;
    revenue: number;
  }>;
  title?: string;
  description?: string;
}

export function BarChartMixed({
  data,
  title = "Revenue by Plan",
  description = "Subscription distribution and revenue breakdown"
}: BarChartMixedProps) {
  const chartConfig = {
    count: {
      label: "User Count",
    },
    revenue: {
      label: "Revenue",
    },
    Starter: {
      label: "Starter",
      color: "hsl(var(--chart-1))",
    },
    Pro: {
      label: "Pro",
      color: "hsl(var(--chart-2))",
    },
    Business: {
      label: "Business",
      color: "hsl(var(--chart-3))",
    },
    Enterprise: {
      label: "Enterprise",
      color: "hsl(var(--chart-4))",
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={data}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="plan"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="revenue" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="revenue" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-pretty text-center text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="size-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Revenue breakdown by subscription plan
        </div>
      </CardFooter>
    </Card>
  );
}
