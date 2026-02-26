export const TableBlock = {
    fields: {
        tableHeaders: { type: "text" },
        tableRows: { type: "textarea" },
    },

    defaultProps: {
        tableHeaders: "Name, Age, City",
        tableRows: "Alice, 30, New York\nBob, 25, Los Angeles\nCharlie, 35, Chicago",
    },

    render: (props: any) => {
        const headers = (props.tableHeaders || "")
            .split(",")
            .map((h: string) => h.trim())
            .filter((h: string) => h.length > 0);

        const rows = (props.tableRows || "")
            .split("\n")
            .map((row: string) =>
                row
                    .split(",")
                    .map((cell: string) => cell.trim())
            )
            .filter((row: string[]) => row.some((cell) => cell.length > 0));

        return (
            <div style={{ overflowX: "auto", margin: "16px 0" }}>
                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        fontSize: "14px",
                    }}
                >
                    {headers.length > 0 && (
                        <thead>
                            <tr>
                                {headers.map((header: string, i: number) => (
                                    <th
                                        key={i}
                                        style={{
                                            padding: "12px 16px",
                                            textAlign: "left",
                                            backgroundColor: "#f1f5f9",
                                            borderBottom: "2px solid #e2e8f0",
                                            fontWeight: 600,
                                            color: "#374151",
                                        }}
                                    >
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                    )}
                    <tbody>
                        {rows.map((row: string[], rowIndex: number) => (
                            <tr key={rowIndex}>
                                {row.map((cell: string, cellIndex: number) => (
                                    <td
                                        key={cellIndex}
                                        style={{
                                            padding: "10px 16px",
                                            borderBottom: "1px solid #e2e8f0",
                                            color: "#4b5563",
                                        }}
                                    >
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    },
};
