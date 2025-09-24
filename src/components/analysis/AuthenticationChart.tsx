"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

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

export const description = "Authentication methods distribution";

// Authentication methods data from wardriving - raw data
const rawChartData = [
  { method: "Open", count: 89 },
  { method: "WPA", count: 45 },
  { method: "WPA2", count: 365 },
  { method: "WPA3", count: 67 },
  { method: "WEP", count: 12 },
];

const chartConfig = {
  count: {
    label: "Count",
  },
  Open: {
    label: "Open",
    color: "var(--chart-1)",
  },
  WPA: {
    label: "WPA",
    color: "var(--chart-2)",
  },
  WPA2: {
    label: "WPA2",
    color: "var(--chart-3)",
  },
  WPA3: {
    label: "WPA3",
    color: "var(--chart-4)",
  },
  WEP: {
    label: "WEP",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

export function AuthenticationMethodsChart() {
  // Automatically sort and assign colors whenever data changes
  const chartData = React.useMemo(() => {
    const sortedData = rawChartData.sort((a, b) => b.count - a.count); // Sort by count in descending order
    return sortedData.map((item, index) => ({
      ...item,
      fill: `var(--chart-${sortedData.length - index})`, // Reverse color assignment: highest count gets --chart-5, lowest gets --chart-1
    }));
  }, []);

  const totalCount = chartData.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <Card className="py-0">
      <CardHeader className="flex flex-col items-stretch border-b px-6 py-4">
        <div className="flex flex-1 flex-col justify-center gap-1">
          <CardTitle>Authentication Methods</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-2">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[400px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 20,
            }}
          >
            <CartesianGrid strokeDasharray="2 2" stroke="#e0e0e0" />
            <XAxis
              dataKey="method"
              tickLine={false}
              axisLine={true}
              tickMargin={8}
              stroke="#666"
              fontSize={12}
              textAnchor="end"
              height={80}
            />
            <YAxis
              tickLine={false}
              axisLine={true}
              tickMargin={8}
              stroke="#666"
              fontSize={12}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  labelFormatter={(value) => `${value}`}
                  formatter={(value, name) => [value, "Networks"]}
                />
              }
            />
            <Bar
              dataKey="count"
              fill="var(--color-count)"
              stroke="var(--color-count)"
              strokeWidth={1}
              radius={0}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm mb-4">
        <div className="grid grid-cols-3 gap-4 w-full leading-none font-medium">
          {chartData.map((item, index) => {
            const percent = ((item.count / totalCount) * 100).toFixed(1);
            const colorIndex = chartData.length - index; // Reverse color index to match the chart
            return (
              <div key={item.method} className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full bg-chart-${colorIndex}`}
                ></div>
                {item.method}: {percent}%
              </div>
            );
          })}
        </div>
      </CardFooter>
    </Card>
  );
}
