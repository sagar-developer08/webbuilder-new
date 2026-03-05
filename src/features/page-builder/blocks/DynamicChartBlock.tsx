import { useState, useEffect } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Filler,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import savedApiService from "../../../shared/services/savedApi.service";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Filler,
    Title,
    Tooltip,
    Legend
);

export const DynamicChartBlock = {
    fields: {
        savedApiId: { type: "text", label: "Saved API ID (GET)" },
        chartType: {
            type: "select",
            options: [
                { label: "Area Chart", value: "area" },
                { label: "Bar Chart", value: "bar" },
                { label: "Doughnut Chart", value: "doughnut" },
            ],
        },
        labelField: { type: "text", label: "Label Field (X-axis)" },
        valueField: { type: "text", label: "Value Field (Y-axis)" },
        chartTitle: { type: "text" },
        chartColor: { type: "text" },
        height: { type: "text" },
        padding: { type: "text" },
    },

    defaultProps: {
        savedApiId: "",
        chartType: "area",
        labelField: "",
        valueField: "",
        chartTitle: "Dynamic Chart",
        chartColor: "#3b82f6",
        height: "300px",
        padding: "20px",
    },

    render: (props: any) => {
        const [data, setData] = useState<any[]>([]);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState<string | null>(null);

        useEffect(() => {
            if (!props.savedApiId) return;

            const fetchData = async () => {
                setLoading(true);
                setError(null);
                try {
                    const result = await savedApiService.execute(props.savedApiId, {
                        limit: 100,
                    });
                    if (result.success && Array.isArray(result.data)) {
                        setData(result.data);
                    } else {
                        setError(result.msg || "Failed to fetch data");
                    }
                } catch (e: any) {
                    setError(e.message || "Request failed");
                } finally {
                    setLoading(false);
                }
            };

            fetchData();
        }, [props.savedApiId]);

        if (!props.savedApiId) {
            return (
                <div
                    style={{
                        padding: props.padding,
                        background: "#f8fafc",
                        borderRadius: "12px",
                        border: "2px dashed #cbd5e1",
                        textAlign: "center",
                        color: "#94a3b8",
                        fontSize: "14px",
                        height: props.height,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    📈 Dynamic Chart — Set a Saved API ID and field mappings in settings
                </div>
            );
        }

        if (loading) {
            return (
                <div
                    style={{
                        padding: props.padding,
                        height: props.height,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#64748b",
                    }}
                >
                    Loading chart data...
                </div>
            );
        }

        if (error) {
            return (
                <div style={{ padding: props.padding, color: "#ef4444", fontSize: "14px" }}>
                    Error: {error}
                </div>
            );
        }

        // Build chart data from fetched rows
        const labelField = props.labelField || (data.length > 0 ? Object.keys(data[0]).find((k) => k !== "_id" && k !== "__v") : "label");
        const valueField = props.valueField || (data.length > 0 ? Object.keys(data[0]).find((k) => k !== "_id" && k !== "__v" && k !== labelField) : "value");

        const labels = data.map((row) => String(row[labelField!] ?? ""));
        const values = data.map((row) => parseFloat(row[valueField!]) || 0);
        const color = props.chartColor || "#3b82f6";

        const chartData = {
            labels,
            datasets: [
                {
                    label: props.chartTitle || valueField,
                    data: values,
                    borderColor: color,
                    backgroundColor:
                        props.chartType === "doughnut"
                            ? labels.map(
                                (_, i) =>
                                    `hsl(${(i * 360) / labels.length}, 70%, 60%)`
                            )
                            : color + "40",
                    fill: props.chartType === "area",
                    tension: 0.4,
                    borderWidth: 2,
                    pointRadius: props.chartType === "area" ? 0 : 3,
                },
            ],
        };

        const options: any = {
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
                    font: { size: 16, weight: 600 },
                    color: "#1e293b",
                    padding: { bottom: 16 },
                },
            },
            scales:
                props.chartType !== "doughnut"
                    ? {
                        x: { grid: { display: false } },
                        y: { grid: { color: "#f1f5f9" }, beginAtZero: true },
                    }
                    : undefined,
        };

        const ChartComponent =
            props.chartType === "bar"
                ? Bar
                : props.chartType === "doughnut"
                    ? Doughnut
                    : Line;

        return (
            <div
                style={{
                    background: "#fff",
                    borderRadius: "12px",
                    padding: props.padding,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                    height: props.height,
                }}
            >
                <ChartComponent data={chartData} options={options} />
            </div>
        );
    },
};
