export const CodeBlock = {
    fields: {
        code: { type: "textarea" },
        language: { type: "text" },
        fontSize: { type: "text" },
    },

    defaultProps: {
        code: 'console.log("Hello, World!");',
        language: "javascript",
        fontSize: "14px",
    },

    render: (props: any) => {
        return (
            <pre
                style={{
                    backgroundColor: "#1e293b",
                    color: "#e2e8f0",
                    padding: "16px 20px",
                    borderRadius: "8px",
                    overflow: "auto",
                    fontSize: props.fontSize,
                    fontFamily: "'Fira Code', 'Cascadia Code', 'Consolas', monospace",
                    lineHeight: "1.6",
                    margin: "16px 0",
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
