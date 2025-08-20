"use client";

import { TrendingUp } from "lucide-react";
import { LabelList, Pie, PieChart } from "recharts";

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

export const description = "A pie chart with a label list";

const chartData = [
  { browser: "router", visitors: 435, fill: "var(--color-router)" },
  { browser: "mobile", visitors: 290, fill: "var(--color-mobile)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  router: {
    label: "Router",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function DeviceTypeChart() {
  const totalVisitors = chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  const routerPercent = (
    ((chartData.find((d) => d.browser === "router")?.visitors || 0) /
      totalVisitors) *
    100
  ).toFixed(1);
  const mobilePercent = (
    ((chartData.find((d) => d.browser === "mobile")?.visitors || 0) /
      totalVisitors) *
    100
  ).toFixed(1);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0 border-b">
        <CardTitle>Device Type Distribution</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="visitors" hideLabel />}
            />
            <Pie data={chartData} dataKey="visitors">
              <LabelList
                dataKey="browser"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center justify-center gap-6 leading-none font-medium">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-chart-1"></div>
            Router: {routerPercent}%
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-chart-2"></div>
            Mobile: {mobilePercent}%
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
