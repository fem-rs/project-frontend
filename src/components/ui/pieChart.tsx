"use client";

import { Info } from "lucide-react";
import { Pie, PieChart } from "recharts";

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
const chartData = [
  { dataSplit: "test", dataCount: 20, fill: "hsl(var(--chart-2))" },
  { dataSplit: "train", dataCount: 80, fill: "hsl(var(--chart-3))" },
];

const chartConfig = {
  train: {
    label: "Train data",
    color: "hsl(var(--chart-1))",
  },
  test: {
    label: "Test data",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function PiChart() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart</CardTitle>
        <CardDescription>Train/test split</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto max-h-[250px]">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent nameKey="dataCount" />} />
            <Pie
              data={chartData}
              dataKey="dataCount"
              labelLine={false}
              label={({ payload, ...props }) => {
                return (
                  <text
                    cx={props.cx}
                    cy={props.cy}
                    x={props.x}
                    y={props.y}
                    textAnchor={props.textAnchor}
                    dominantBaseline={props.dominantBaseline}
                    fill="#fff"
                  >
                    {payload.dataCount}%
                  </text>
                );
              }}
              nameKey="dataSplit"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="chart-footer">
        <p className="footer-title">
          <Info className="h-4 w-4" /> Info
        </p>
        <p className="footer-desc text-center">
          This Pie-chart shows the percentage of data used for training and testing
        </p>
      </CardFooter>
    </Card>
  );
}

export default PiChart;
