"use client";

import { Suspense } from "react";
import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
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
import useSWR from "swr";
import Axios from "axios";

const chartConfig = {
  accuracy: {
    label: "Accuracy",
    color: "hsl(var(--chart-1))",
  },
  val_accuracy: {
    label: "Validation Accuracy",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const fetcher = async (url: string) => {
  const res = await Axios.get(url, { timeout: 5000 });

  return Object.keys(res.data.accuracy).map((key) => ({
    epoch: key,
    accuracy: res.data.accuracy[key],
    val_accuracy: res.data.val_accuracy[key],
  }));
};

function AccuracyChartContent() {
  const { data: chartData, error } = useSWR(
    process.env.NEXT_PUBLIC_BACKEND_URL + "/statistics/accuracy",
    fetcher,
    {
      refreshInterval: 1000
    }
  );

  if (error) {
    return (
      <div className="flex items-center justify-center h-44 text-red-500 text-lg font-semibold">
        Error loading data
      </div>
    );
  }

  if (!chartData) {
    return (
      <div className="flex items-center justify-center align-center h-44 bg-primary text-gray-600 text-lg font-semibold rounded-lg shadow-md animate-pulse">
        Loading data...
      </div>
    );
  }

  return (
    <ChartContainer className="chart-height" config={chartConfig}>
      <LineChart data={chartData} margin={{ left: 12, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="epoch" tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis domain={[0.77, 0.78]} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Line
          dataKey="accuracy"
          type="natural"
          stroke="var(--color-accuracy)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          dataKey="val_accuracy"
          type="linear"
          stroke="var(--color-val_accuracy)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
}

export function AccuracyChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-center">Model Accuracy Over Epochs</CardTitle>
        <CardDescription className="flex justify-center">Tracking accuracy and validation accuracy per epoch</CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense
          fallback={
            <div className="flex items-center justify-center bg-gray-100 text-gray-600 text-lg font-semibold rounded-lg shadow-md animate-pulse">
              Loading data...
            </div>
          }
        >
          <AccuracyChartContent />
        </Suspense>
      </CardContent>
      <CardFooter className="chart-footer">
        <div className="footer-title flex items-center">
          <TrendingUp className="h-4 w-4" /> Accuracy went up then levelled out
        </div>
      </CardFooter>
    </Card>
  );
}

export default AccuracyChart;
