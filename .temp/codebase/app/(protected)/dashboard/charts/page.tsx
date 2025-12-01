import { constructMetadata } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { AreaChartStacked } from "@/components/charts/area-chart-stacked";
import { BarChartMixed } from "@/components/charts/bar-chart-mixed";
import { InteractiveBarChart } from "@/components/charts/interactive-bar-chart";
import { LineChartMultiple } from "@/components/charts/line-chart-multiple";
import { RadarChartSimple } from "@/components/charts/radar-chart-simple";
import { RadialChartGrid } from "@/components/charts/radial-chart-grid";
import { RadialShapeChart } from "@/components/charts/radial-shape-chart";
import { RadialStackedChart } from "@/components/charts/radial-stacked-chart";
import { RadialTextChart } from "@/components/charts/radial-text-chart";
import { DashboardHeader } from "@/components/dashboard/header";

const areaChartData = [
  { month: 'Jan', users: 1200, revenue: 4000 },
  { month: 'Feb', users: 1800, revenue: 4800 },
  { month: 'Mar', users: 2100, revenue: 5200 },
  { month: 'Apr', users: 2500, revenue: 5800 },
  { month: 'May', users: 3000, revenue: 6500 },
  { month: 'Jun', users: 3200, revenue: 7200 },
  { month: 'Jul', users: 3500, revenue: 7800 },
  { month: 'Aug', users: 4000, revenue: 8500 },
  { month: 'Sep', users: 4200, revenue: 9000 },
  { month: 'Oct', users: 4500, revenue: 9500 },
  { month: 'Nov', users: 4800, revenue: 10000 },
  { month: 'Dec', users: 5000, revenue: 11000 },
];

const barChartData = [
  { plan: 'Free', count: 2500, revenue: 0 },
  { plan: 'Pro', count: 1200, revenue: 4800 },
  { plan: 'Business', count: 800, revenue: 24000 },
  { plan: 'Enterprise', count: 50, revenue: 25000 },
];

export const metadata = constructMetadata({
  title: "Charts – SaaS Starter",
  description: "List of charts by shadcn-ui",
});

export default function ChartsPage() {
  return (
    <>
      <DashboardHeader heading="Charts" text="List of charts by shadcn-ui." />
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
          <RadialTextChart />
          <BarChartMixed data={barChartData} />
          <RadarChartSimple />
        </div>

        <InteractiveBarChart />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
          <RadialChartGrid />
          <RadialShapeChart />
          <LineChartMultiple  />
          <RadialStackedChart />
        </div>
      </div>
    </>
  );
}
