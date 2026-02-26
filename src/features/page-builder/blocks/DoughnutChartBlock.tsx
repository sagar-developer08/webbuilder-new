import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const DoughnutChartBlock = {
    fields: {
        chartTitle: { type: "text" },
        labels: { type: "textarea" },
        data: { type: "textarea" },
        colors: { type: "textarea" },
        centerText: { type: "text" },
        height: { type: "text" },
        padding: { type: "text" },
        margin: { type: "text" },
        borderRadius: { type: "text" },
        boxShadow: { type: "text" },
        background: { type: "text" },
    },

    defaultProps: {
        chartTitle: "",
        labels: "Completed,Remaining",
        data: "45,55",
        colors: "#f59e0b,#e2e8f0",
        centerText: "45%",
        height: "300px",
        padding: "20px",
        margin: "0px",
        borderRadius: "12px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
        background: "#fff",
    },

    render: (props: any) => {
        const labels = (props.labels || "").split(",").map((s: string) => s.trim());
        const dataValues = (props.data || "").split(",").map((s: string) => parseFloat(s.trim()) || 0);
        const bgColors = (props.colors || "").split(",").map((s: string) => s.trim());

        const chartData = {
            labels,
            datasets: [
                {
                    data: dataValues,
                    backgroundColor: bgColors,
                    borderWidth: 0,
                    cutout: "70%",
                },
            ],
        };

        const options = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "bottom" as const,
                    labels: { font: { size: 12 }, padding: 16 },
                },
                title: {
                    display: !!props.chartTitle,
                    text: props.chartTitle,
                    font: { size: 16, weight: 600 as const },
                    color: "#1e293b",
                },
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
                    position: "relative",
                }}
            >
                <Doughnut data={chartData} options={options} />
                {props.centerText && (
                    <div
                        style={{
                            position: "absolute",
                            top: "45%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            fontSize: "28px",
                            fontWeight: 700,
                            color: "#1e293b",
                            pointerEvents: "none",
                        }}
                    >
                        {props.centerText}
                    </div>
                )}
            </div>
        );
    },
};
