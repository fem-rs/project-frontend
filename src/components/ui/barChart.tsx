"use client";

import { Info } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Suspense } from "react";
import Axios from "axios";

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

export function BarOfCharts() {
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
    const response = await Axios.get(url, { timeout: 5000 });
    const rawData = response.data;

    if (!rawData) {
      throw new Error("Invalid data format");
    }

    return Object.keys(rawData).map((key) => ({
      category: key,
      value: rawData[key],
    }));
  };

  function AccuracyChartContent() {
    const { data: chartData, error } = useSWR(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/statistics/count",
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
        <BarChart width={500} height={300} data={chartData}>
          <CartesianGrid vertical={false} />  
          <XAxis dataKey="category" tickLine={false} tickMargin={10} />
          <YAxis />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent />}
          />
          <Bar dataKey="value" fill="hsl(var(--chart-1))" radius={8} />
        </BarChart>
      </ChartContainer>
    );
  }


  return (
    <Card>
      <CardHeader>
        <CardTitle>Dementia classification</CardTitle>
        <CardDescription>Displays dementia cases based on their classification</CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense
          fallback={
            <div className="flex items-center justify-center  bg-gray-100 text-gray-600 text-lg font-semibold rounded-lg shadow-md animate-pulse">
              Loading data...
            </div>
          }
        >
          <AccuracyChartContent />
        </Suspense>
      </CardContent>
      <CardFooter className="chart-footer">
        <div className="footer-title flex items-center gap-2">
          <Info className="h-4 w-4" /> Data from recent analysis
        </div>
        <div className="footer-desc">Classification of dementia cases</div>
      </CardFooter>
    </Card>
  );
}

export default BarOfCharts;
