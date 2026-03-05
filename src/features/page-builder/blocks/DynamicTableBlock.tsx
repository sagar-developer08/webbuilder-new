import { useState, useEffect } from "react";
import savedApiService from "../../../shared/services/savedApi.service";

export const DynamicTableBlock = {
    fields: {
        savedApiId: { type: "text", label: "Saved API ID (GET)" },
        pageSize: { type: "text", label: "Rows per page" },
        height: { type: "text" },
        padding: { type: "text" },
    },

    defaultProps: {
        savedApiId: "",
        pageSize: "20",
        height: "auto",
        padding: "16px",
    },

    render: (props: any) => {
        const [data, setData] = useState<any[]>([]);
        const [columns, setColumns] = useState<string[]>([]);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState<string | null>(null);

        useEffect(() => {
            if (!props.savedApiId) return;

            const fetchData = async () => {
                setLoading(true);
                setError(null);
                try {
                    const result = await savedApiService.execute(props.savedApiId, {
                        limit: parseInt(props.pageSize) || 20,
                    });
                    if (result.success && Array.isArray(result.data)) {
                        setData(result.data);
                        // Auto-detect columns from first row
                        if (result.data.length > 0) {
                            const cols = Object.keys(result.data[0]).filter(
                                (k) => k !== "_id" && k !== "__v"
                            );
                            setColumns(cols);
                        }
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
        }, [props.savedApiId, props.pageSize]);

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
                    }}
                >
                    📊 Dynamic Table — Set a Saved API ID in settings
                </div>
            );
        }

        if (loading) {
            return (
                <div style={{ padding: props.padding, textAlign: "center", color: "#64748b" }}>
                    Loading data...
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

        return (
            <div
                style={{
                    padding: props.padding,
                    height: props.height !== "auto" ? props.height : undefined,
                    overflow: "auto",
                }}
            >
                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        fontSize: "14px",
                    }}
                >
                    <thead>
                        <tr>
                            {columns.map((col) => (
                                <th
                                    key={col}
                                    style={{
                                        padding: "10px 12px",
                                        textAlign: "left",
                                        background: "#f1f5f9",
                                        borderBottom: "2px solid #e2e8f0",
                                        fontWeight: 600,
                                        color: "#334155",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, i) => (
                            <tr
                                key={i}
                                style={{
                                    background: i % 2 === 0 ? "#fff" : "#f8fafc",
                                }}
                            >
                                {columns.map((col) => (
                                    <td
                                        key={col}
                                        style={{
                                            padding: "8px 12px",
                                            borderBottom: "1px solid #e2e8f0",
                                            color: "#475569",
                                        }}
                                    >
                                        {typeof row[col] === "object"
                                            ? JSON.stringify(row[col])
                                            : String(row[col] ?? "")}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        {data.length === 0 && (
                            <tr>
                                <td
                                    colSpan={columns.length || 1}
                                    style={{
                                        padding: "20px",
                                        textAlign: "center",
                                        color: "#94a3b8",
                                    }}
                                >
                                    No data found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    },
};
