import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";


export default function TrafficChart() {
    const series = [23, 67, 10];

    const options: ApexOptions = {
        chart: {
        type: "radialBar",
        height: 180
        },
        plotOptions: {
        radialBar: {
            startAngle: -120,
            endAngle: 120,
            hollow: {
                size: "45%"
            },
            track: {
                background: "#f1f3f5"
            },
            dataLabels: {
                show: false
            }
        }
        },
        colors: ["#1260f0", "#ff0707", "#000000"],
        labels: ["Free Plan", "Pro", "Company"]
    };

    return (
        <Chart
        options={options}
        series={series}
        type="radialBar"
        height={180}
        />
    );
};

