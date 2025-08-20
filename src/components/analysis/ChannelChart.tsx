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

export const description = "A histogram chart";

// Sample histogram data - bins with their frequencies
const chartData = [
  { bin: "1", count: 420 },
  { bin: "3", count: 380 },
  { bin: "5", count: 450 },
  { bin: "7", count: 350 },
  { bin: "9", count: 1050 },
  { bin: "11", count: 320 },
  { bin: "13", count: 1450 },
  { bin: "15", count: 890 },
  { bin: "17", count: 1520 },
  { bin: "19", count: 1120 },
  { bin: "21", count: 380 },
  { bin: "23", count: 280 },
  { bin: "25", count: 180 },
  { bin: "27", count: 350 },
  { bin: "29", count: 250 },
  { bin: "31", count: 180 },
  { bin: "48", count: 450 },
  { bin: "50", count: 320 },
  { bin: "52", count: 280 },
  { bin: "54", count: 350 },
  { bin: "56", count: 180 },
  { bin: "58", count: 250 },
  { bin: "60", count: 150 },
  { bin: "62", count: 120 },
  { bin: "64", count: 80 },
  { bin: "66", count: 180 },
  { bin: "68", count: 150 },
  { bin: "70", count: 120 },
  { bin: "72", count: 100 },
  { bin: "74", count: 80 },
  { bin: "76", count: 60 },
  { bin: "78", count: 40 },
  { bin: "80", count: 30 },
  { bin: "116", count: 25 },
  { bin: "118", count: 20 },
  { bin: "120", count: 15 },
  { bin: "122", count: 10 },
  { bin: "140", count: 950 },
  { bin: "142", count: 180 },
  { bin: "144", count: 250 },
  { bin: "146", count: 150 },
  { bin: "165", count: 320 },
];

const chartConfig = {
  count: {
    label: "Count",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function ChannelChart() {
  return (
    <Card className="py-0">
      <CardHeader className="flex flex-col items-stretch border-b px-6 py-4">
        <div className="flex flex-1 flex-col justify-center gap-1">
          <CardTitle>Channel</CardTitle>
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
                  className="w-[120px]"
                  labelFormatter={(value) => `Bin: ${value}`}
                  formatter={(value, name) => [value, "Count"]}
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