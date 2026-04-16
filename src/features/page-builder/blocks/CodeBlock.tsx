export const CodeBlock = {
    fields: {
        code: { type: "textarea" },
        language: { type: "text" },
        fontSize: { type: "text" },
        padding: { type: "text" },
        margin: { type: "text" },
        borderRadius: { type: "text" },
        backgroundColor: { type: "text" },
        width: { type: "text" },
        height: { type: "text" },
    },

    defaultProps: {
        code: 'console.log("Hello, World!");',
        language: "javascript",
        fontSize: "14px",
        padding: "16px 20px",
        margin: "0px",
        borderRadius: "8px",
        backgroundColor: "#1e293b",
        width: "auto",
        height: "auto",
    },

    render: (props: any) => {
        return (
            <pre
                style={{
                    width: props.width !== "auto" ? props.width : undefined,
                    height: props.height !== "auto" ? props.height : undefined,
                    backgroundColor: props.backgroundColor ?? "#1e293b",
                    color: "#e2e8f0",
                    padding: props.padding,
                    margin: props.margin ?? "0px",
                    borderRadius: props.borderRadius ?? "8px",
                    overflow: "auto",
                    fontSize: props.fontSize,
                    fontFamily: "'Fira Code', 'Cascadia Code', 'Consolas', monospace",
                    lineHeight: "1.6",
                }}
            >
                {props.language && (
                    <span
                        style={{
                            display: "block",
                            fontSize: "11px",
                            color: "#94a3b8",
                            marginBottom: "8px",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                        }}
                    >
                        {props.language}
                    </span>
                )}
                <code>{props.code}</code>
            </pre>
        );
    },
};
