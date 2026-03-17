import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

export interface PieChartProps {
  series: number[];
  labels: string[];
  options?: ApexOptions;
  height?: number;
  width?: number | string;
  className?: string;
}


export default function PieChart({
  series,
  labels,
  options,
  height = 300,
  width = "100%",
  className,
}: PieChartProps) {
  const defaultOptions: ApexOptions = {
    chart: {
      type: "pie",
    },
    labels,
    legend: {
      position: "bottom",
    },
    dataLabels: {
      enabled: true,
      formatter: (value) => `${Number(value).toFixed(1)}%`,
    },
    stroke: {
      show: true,
      width: 1,
    },
  };

  const mergedOptions: ApexOptions = {
    ...defaultOptions,
    ...options,
    chart: {
      ...defaultOptions.chart,
      ...options?.chart,
    },
    legend: {
      ...defaultOptions.legend,
      ...options?.legend,
    },
    dataLabels: {
      ...defaultOptions.dataLabels,
      ...options?.dataLabels,
    },
  };

  return (
    <div className={className} style={{ width, height }}>
      <Chart
        type="pie"
        series={series}
        options={mergedOptions}
        height={height}
        width={width}
      />
    </div>
  );
}
