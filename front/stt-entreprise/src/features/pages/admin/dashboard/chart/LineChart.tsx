import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import type { ChartData, ChartOptions } from "chart.js";

export interface LineChartProps {
    data: ChartData<"line">;
    options?: ChartOptions<"line">;
    height?: number | string;
    width?: number | string;
    className?: string;
}

export default function LineChart({data, options, height = 300, width = "100%", className}: LineChartProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const chartRef = useRef<Chart | null>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        chartRef.current = new Chart(canvasRef.current, {
            type: "line",
            data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                ...options,
            },
        });

        return () => {
            chartRef.current?.destroy();
            chartRef.current = null;
        };
    }, [data, options]);

    return (
        <div className={className} style={{ width, height, position: "relative", overflowX: "auto",}}>
            <canvas ref={canvasRef} />
        </div>
    );
}
