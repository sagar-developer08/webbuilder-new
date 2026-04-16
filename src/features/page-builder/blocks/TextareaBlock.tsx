export const TextareaBlock = {
    fields: {
        placeholder: { type: "text" },
        label: { type: "text" },
        padding: { type: "text" },
        rows: {
            type: "number",
            min: 2,
            max: 20,
        },
        margin: { type: "text" },
        borderRadius: { type: "text" },
        width: { type: "text" },
        height: { type: "text" },
    },

    defaultProps: {
        placeholder: "Enter your message...",
        label: "",
        padding: "0px",
        rows: 4,
        margin: "0px",
        borderRadius: "6px",
        width: "auto",
        height: "auto",
    },

    render: (props: any) => {
        return (
            <div style={{ width: props.width !== "auto" ? props.width : undefined,
                height: props.height !== "auto" ? props.height : undefined,
                marginBottom: "16px", padding: props.padding }}>
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
                <textarea
                    placeholder={props.placeholder}
                    rows={props.rows}
                    style={{
                        width: "100%",
                        padding: "10px 12px",
                        margin: props.margin,
                        fontSize: "14px",
                        border: "1px solid #d1d5db",
                        borderRadius: props.borderRadius ?? "6px",
                        outline: "none",
                        resize: "vertical",
                        boxSizing: "border-box",
                        fontFamily: "inherit",
                    }}
                />
            </div>
        );
    },
};
