"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A signal strength distribution histogram";

// Signal strength histogram data - bins with their frequencies
const chartData = [
  { bin: "20-25", count: 12 },
  { bin: "25-30", count: 28 },
  { bin: "30-35", count: 45 },
  { bin: "35-40", count: 67 },
  { bin: "40-45", count: 89 },
  { bin: "45-50", count: 156 },
  { bin: "50-55", count: 203 },
  { bin: "55-60", count: 187 },
  { bin: "60-65", count: 134 },
  { bin: "65-70", count: 98 },
  { bin: "70-75", count: 76 },
  { bin: "75-80", count: 54 },
  { bin: "80-85", count: 32 },
  { bin: "85-90", count: 18 },
  { bin: "90-95", count: 8 },
];

const chartConfig = {
  count: {
    label: "Count",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function SignalStrengthChart() {
  return (
    <Card className="py-0">
      <CardHeader className="flex flex-col items-stretch border-b px-6 py-4">
        <div className="flex flex-1 flex-col justify-center gap-1">
          <CardTitle>Signal Strength Distribution</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
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
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="2 2" stroke="#e0e0e0" />
            <XAxis
              dataKey="bin"
              tickLine={false}
              axisLine={true}
              tickMargin={8}
              stroke="#666"
              fontSize={12}
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
                  labelFormatter={(value) => `Signal: ${value} dBm`}
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
    </Card>
  );
}