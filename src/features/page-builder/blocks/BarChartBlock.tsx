import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const BarChartBlock = {
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
    },

    defaultProps: {
        chartTitle: "Result",
        labels: "JAN,FEB,MAR,APR,MAY,JUN,JUL,AUG,SEP,OCT",
        dataset1Label: "Revenue",
        dataset1Data: "45,62,38,70,55,80,48,65,72,58",
        dataset1Color: "#1e293b",
        dataset2Label: "Target",
        dataset2Data: "50,55,42,60,48,75,52,58,68,62",
        dataset2Color: "#f59e0b",
        height: "300px",
        padding: "20px",
    },

    render: (props: any) => {
        const labels = (props.labels || "").split(",").map((s: string) => s.trim());
        const data1 = (props.dataset1Data || "").split(",").map((s: string) => parseFloat(s.trim()) || 0);
        const data2 = (props.dataset2Data || "").split(",").map((s: string) => parseFloat(s.trim()) || 0);

        const chartData = {
            labels,
            datasets: [
                {
                    label: props.dataset1Label,
                    data: data1,
                    backgroundColor: props.dataset1Color,
                    borderRadius: 4,
                    barPercentage: 0.6,
                },
                {
                    label: props.dataset2Label,
                    data: data2,
                    backgroundColor: props.dataset2Color,
                    borderRadius: 4,
                    barPercentage: 0.6,
                },
            ],
        };

        const options = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: "top" as const, labels: { font: { size: 12 } } },
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
                    background: "#fff",
                    borderRadius: "12px",
                    padding: props.padding,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                    height: props.height,
                }}
            >
                <Bar data={chartData} options={options} />
            </div>
        );
    },
};
