import type { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";

export interface BarChartProps {
  series: {
    name: string;
    data: number[];
  }[];
  categories?: (string | number)[];
  options?: ApexOptions;
  height?: number;
  width?: number | string;
  className?: string;
}

export default function BarChart({
  series,
  categories,
  options,
  height = 300,
  width = "100%",
  className,
}: BarChartProps) {
  const defaultOptions: ApexOptions = {
    chart: {
      type: "bar",
      height,
      toolbar: { show: true },
      zoom: { enabled: true },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories,
    },
    grid: {
      strokeDashArray: 4,
    },
  };

  return (
    <div className={className} style={{ width, height }}>
      <Chart
        type="bar"
        series={series}
        options={{ ...defaultOptions, ...options }}
        height={height}
        width={width}
      />
    </div>
  );
}
