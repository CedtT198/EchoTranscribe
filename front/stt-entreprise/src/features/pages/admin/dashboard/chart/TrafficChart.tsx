import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

export interface TrafficChartProps {
  series: number[];
  labels: string[];
  options?: ApexOptions;
  height?: number;
}

export default function TrafficChart({
  series,
  labels,
  options,
  height = 180,
}: TrafficChartProps) {

  const defaultOptions: ApexOptions = {
    chart: {
      type: "radialBar",
      height,
    },
    plotOptions: {
      radialBar: {
        startAngle: -120,
        endAngle: 120,
        hollow: { size: "45%" },
        track: { background: "#f1f3f5" },
        dataLabels: { show: false },
      },
    },
    labels,
    colors: ["#1260f0", "#ff0707", "#000000"],
  };

  return (
    <Chart
      type="radialBar"
      series={series}
      options={{ ...defaultOptions, ...options }}
      height={height}
    />
  );
}
