export const SelectBlock = {
    fields: {
        options: { type: "textarea" },
        placeholder: { type: "text" },
        label: { type: "text" },
        padding: { type: "text" },
        margin: { type: "text" },
        borderRadius: { type: "text" },
        backgroundColor: { type: "text" },
    },

    defaultProps: {
        options: "Option 1\nOption 2\nOption 3",
        placeholder: "Select...",
        label: "",
        padding: "0px",
        margin: "0px",
        borderRadius: "6px",
        backgroundColor: "#ffffff",
    },

    render: (props: any) => {
        const optionsList = (props.options || "")
            .split("\n")
            .map((o: string) => o.trim())
            .filter((o: string) => o.length > 0);

        return (
            <div style={{ marginBottom: "16px", padding: props.padding }}>
                {props.label && (
                    <label
                        style={{
                            display: "block",
                            marginBottom: "6px",
                            fontSize: "14px",
                            fontWeight: 500,
                            color: "#374151",
                        }}
                    >
                        {props.label}
                    </label>
                )}
                <select
                    aria-label={props.label || props.placeholder || "Select"}
                    style={{
                        width: "100%",
                        padding: "10px 12px",
                        margin: props.margin,
                        fontSize: "14px",
                        border: "1px solid #d1d5db",
                        borderRadius: props.borderRadius ?? "6px",
                        outline: "none",
                        backgroundColor: props.backgroundColor ?? "#ffffff",
                        boxSizing: "border-box",
                    }}
                    defaultValue=""
                >
                    <option value="" disabled>
                        {props.placeholder}
                    </option>
                    {optionsList.map((opt: string, i: number) => (
                        <option key={i} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>
            </div>
        );
    },
};
