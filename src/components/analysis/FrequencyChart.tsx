"use client"

import { TrendingUp } from "lucide-react"
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A radial chart with stacked sections"

const chartData = [{ month: "january", "2.4GHz": 860, "5.0GHz": 970 }]

const chartConfig = {
  "2.4GHz": {
    label: "2.4GHz",
    color: "var(--chart-1)",
  },
  "5.0GHz": {
    label: "5.0GHz",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function FrequencyChart() {
  const totalVisitors = chartData[0]["2.4GHz"] + chartData[0]["5.0GHz"]
  const freq24Percent = ((chartData[0]["2.4GHz"] / totalVisitors) * 100).toFixed(1);
  const freq50Percent = ((chartData[0]["5.0GHz"] / totalVisitors) * 100).toFixed(1);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center  pb-0 border-b">
        <CardTitle>Frequency Type</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          All
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="2.4GHz"
              stackId="a"
              cornerRadius={5}
              fill="var(--chart-1)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="5.0GHz"
              fill="var(--chart-2)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center justify-center gap-6 leading-none font-medium">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-chart-1"></div>
            2.4GHz: {freq24Percent}%
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-chart-2"></div>
            5.0GHz: {freq50Percent}%
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}