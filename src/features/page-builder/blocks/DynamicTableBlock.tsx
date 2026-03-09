import { useState, useEffect } from "react";
import savedApiService from "../../../shared/services/savedApi.service";

export const DynamicTableBlock = {
    fields: {
        savedApiId: { type: "text", label: "Saved API ID (GET or PUT)" },
        isEditable: {
            type: "radio",
            label: "Enable Inline Editing (Requires PUT API)",
            options: [
                { label: "Yes", value: "true" },
                { label: "No", value: "false" }
            ]
        },
        pageSize: { type: "text", label: "Rows per page" },
        height: { type: "text" },
        padding: { type: "text" },
    },

    defaultProps: {
        savedApiId: "",
        isEditable: "false",
        pageSize: "20",
        height: "auto",
        padding: "16px",
    },

    render: (props: any) => {
        const [data, setData] = useState<any[]>([]);
        const [editedData, setEditedData] = useState<Record<number, any>>({});
        const [columns, setColumns] = useState<string[]>([]);
        const [loading, setLoading] = useState(false);
        const [saving, setSaving] = useState(false);
        const [error, setError] = useState<string | null>(null);
        const [successMsg, setSuccessMsg] = useState<string | null>(null);

        useEffect(() => {
            if (!props.savedApiId) return;

            const fetchData = async () => {
                setLoading(true);
                setError(null);
                try {
                    const result = await savedApiService.execute(props.savedApiId, {
                        limit: parseInt(props.pageSize) || 20,
                        action: "fetch" // Tell PUT APIs to act like GET initially
                    });
                    if (result.success && Array.isArray(result.data)) {
                        setData(result.data);
                        setEditedData({});
                        // Auto-detect columns from first row
                        if (result.data.length > 0) {
                            const cols = Object.keys(result.data[0]).filter(
                                (k) => k !== "_id" && k !== "__v" && k !== "id" && k !== "createdAt" && k !== "updatedAt"
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

        const handleSave = async () => {
            if (Object.keys(editedData).length === 0) return;
            setSaving(true);
            setError(null);
            setSuccessMsg(null);

            try {
                // Collect only the modified rows with their _id
                const payloadArray = Object.keys(editedData).map(index => {
                    const rowIndex = parseInt(index);
                    const originalRow = data[rowIndex];
                    return {
                        _id: originalRow._id || originalRow.id,
                        ...originalRow,
                        ...editedData[rowIndex]
                    };
                });

                const result = await savedApiService.execute(props.savedApiId, payloadArray);

                if (result.success) {
                    if (result.method === "GET") {
                        setError("To save changes, you must use a PUT API in this block's settings.");
                        return;
                    }
                    setSuccessMsg("Updated successfully!");
                    // Merge edits back into main data
                    const newData = [...data];
                    Object.keys(editedData).forEach(index => {
                        const i = parseInt(index);
                        newData[i] = { ...newData[i], ...editedData[i] };
                    });
                    setData(newData);
                    setEditedData({});

                    setTimeout(() => setSuccessMsg(null), 3000);
                } else {
                    setError(result.msg || "Failed to update");
                }
            } catch (e: any) {
                setError(e.message || "Update request failed");
            } finally {
                setSaving(false);
            }
        };

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
                {props.isEditable === "true" && Object.keys(editedData).length > 0 && (
                    <div style={{ marginBottom: "12px", display: "flex", gap: "10px", alignItems: "center" }}>
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            style={{
                                padding: "6px 16px",
                                background: "#3b82f6",
                                color: "white",
                                border: "none",
                                borderRadius: "6px",
                                cursor: saving ? "default" : "pointer",
                                opacity: saving ? 0.7 : 1,
                                fontSize: "14px",
                            }}
                        >
                            {saving ? "Saving..." : "Submit Changes"}
                        </button>
                        {successMsg && <span style={{ color: "#10b981", fontSize: "14px" }}>{successMsg}</span>}
                    </div>
                )}
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
                        {data.map((row, i) => {
                            const isRowEdited = editedData.hasOwnProperty(i);
                            const rowData = isRowEdited ? { ...row, ...editedData[i] } : row;

                            return (
                                <tr
                                    key={i}
                                    style={{
                                        background: isRowEdited ? "#fffbeb" : (i % 2 === 0 ? "#fff" : "#f8fafc"),
                                    }}
                                >
                                    {columns.map((col) => {
                                        const cellValue = rowData[col];
                                        return (
                                            <td
                                                key={col}
                                                style={{
                                                    padding: "8px 12px",
                                                    borderBottom: "1px solid #e2e8f0",
                                                    color: "#475569",
                                                }}
                                            >
                                                {props.isEditable === "true" ? (
                                                    <input
                                                        type="text"
                                                        value={typeof cellValue === "object" ? JSON.stringify(cellValue) : String(cellValue ?? "")}
                                                        onChange={(e) => {
                                                            setEditedData(prev => ({
                                                                ...prev,
                                                                [i]: {
                                                                    ...(prev[i] || {}),
                                                                    [col]: e.target.value
                                                                }
                                                            }));
                                                        }}
                                                        style={{
                                                            width: "100%",
                                                            padding: "4px 8px",
                                                            border: "1px solid #cbd5e1",
                                                            borderRadius: "4px",
                                                            outline: "none",
                                                            fontSize: "13px"
                                                        }}
                                                    />
                                                ) : (
                                                    typeof cellValue === "object"
                                                        ? JSON.stringify(cellValue)
                                                        : String(cellValue ?? "")
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
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
