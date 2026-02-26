import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Title, Tooltip, Legend);

export const AreaChartBlock = {
    fields: {
        chartTitle: { type: "text" },
        labels: { type: "textarea" },
        dataset1Label: { type: "text" },
        dataset1Data: { type: "textarea" },
        dataset1Color: { type: "text" },
        dataset2Label: { type: "text" },
        dataset2Data: { type: "textarea" },
        dataset2Color: { type: "text" },
        height: { type: "text" },
        padding: { type: "text" },
        margin: { type: "text" },
        borderRadius: { type: "text" },
        boxShadow: { type: "text" },
        background: { type: "text" },
    },

    defaultProps: {
        chartTitle: "Trends",
        labels: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec",
        dataset1Label: "Lorem Ipsum",
        dataset1Data: "30,45,35,50,40,60,55,70,65,75,68,80",
        dataset1Color: "#1e293b",
        dataset2Label: "Dolor Amet",
        dataset2Data: "20,30,25,35,30,40,38,50,45,55,50,60",
        dataset2Color: "#f59e0b",
        height: "300px",
        padding: "20px",
        margin: "0px",
        borderRadius: "12px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
        background: "#fff",
    },

    render: (props: any) => {
        const labels = (props.labels || "").split(",").map((s: string) => s.trim());
        const data1 = (props.dataset1Data || "").split(",").map((s: string) => parseFloat(s.trim()) || 0);
        const data2 = (props.dataset2Data || "").split(",").map((s: string) => parseFloat(s.trim()) || 0);

        // Create gradient-like colors using rgba
        const color1 = props.dataset1Color || "#1e293b";
        const color2 = props.dataset2Color || "#f59e0b";

        const chartData = {
            labels,
            datasets: [
                {
                    label: props.dataset1Label,
                    data: data1,
                    borderColor: color1,
                    backgroundColor: color1 + "30",
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 5,
                    borderWidth: 2,
                },
                {
                    label: props.dataset2Label,
                    data: data2,
                    borderColor: color2,
                    backgroundColor: color2 + "30",
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 5,
                    borderWidth: 2,
                },
            ],
        };

        const options = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "top" as const,
                    labels: { font: { size: 12 }, usePointStyle: true },
                },
                title: {
                    display: !!props.chartTitle,
                    text: props.chartTitle,
                    font: { size: 16, weight: 600 as const },
                    color: "#1e293b",
                    padding: { bottom: 16 },
                },
            },
            scales: {
                x: { grid: { display: false } },
                y: { grid: { color: "#f1f5f9" }, beginAtZero: true },
            },
        };

        return (
            <div
                className="pb-chart"
                style={{
                    background: props.background ?? "#fff",
                    borderRadius: props.borderRadius ?? "12px",
                    padding: props.padding,
                    margin: props.margin ?? "0px",
                    boxShadow: props.boxShadow ?? "0 1px 3px rgba(0,0,0,0.08)",
                    height: props.height,
                }}
            >
                <Line data={chartData} options={options} />
            </div>
        );
    },
};
