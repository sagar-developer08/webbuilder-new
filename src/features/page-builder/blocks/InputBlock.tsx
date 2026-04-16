export const InputBlock = {
    fields: {
        inputType: {
            type: "select",
            options: [
                { label: "Text", value: "text" },
                { label: "Email", value: "email" },
                { label: "Password", value: "password" },
                { label: "Number", value: "number" },
                { label: "Tel", value: "tel" },
                { label: "URL", value: "url" },
                { label: "Date", value: "date" },
            ],
        },
        placeholder: { type: "text" },
        name: { type: "text", label: "Field Name (API key)" },
        label: { type: "text" },
        padding: { type: "text" },
        margin: { type: "text" },
        borderRadius: { type: "text" },
        width: { type: "text" },
        height: { type: "text" },
    },

    defaultProps: {
        inputType: "text",
        placeholder: "Enter text...",
        name: "",
        label: "",
        padding: "0px",
        margin: "0px",
        borderRadius: "6px",
        width: "auto",
        height: "auto",
    },

    render: (props: any) => {
        return (
            <div style={{
                width: props.width !== "auto" ? props.width : undefined,
                height: props.height !== "auto" ? props.height : undefined,
                marginBottom: "16px", padding: props.padding
            }}>
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
                <input
                    type={props.inputType}
                    name={props.name || undefined}
                    placeholder={props.placeholder}
                    style={{
                        width: "100%",
                        padding: "10px 12px",
                        margin: props.margin,
                        fontSize: "14px",
                        border: "1px solid #d1d5db",
                        borderRadius: props.borderRadius ?? "6px",
                        outline: "none",
                        boxSizing: "border-box",
                    }}
                />
            </div>
        );
    },
};
