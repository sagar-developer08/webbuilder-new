export const BlockquoteBlock = {
    fields: {
        text: { type: "textarea" },
        borderColor: { type: "text" },
        color: { type: "text" },
        fontSize: { type: "text" },
    },

    defaultProps: {
        text: "This is a blockquote. Use it for quotes or highlighted content.",
        borderColor: "#2563eb",
        color: "#4b5563",
        fontSize: "18px",
    },

    render: (props: any) => {
        return (
            <blockquote
                style={{
                    borderLeft: `4px solid ${props.borderColor}`,
                    padding: "12px 20px",
                    margin: "16px 0",
                    color: props.color,
                    fontSize: props.fontSize,
                    fontStyle: "italic",
                    backgroundColor: "#f8fafc",
                    borderRadius: "0 8px 8px 0",
                    lineHeight: "1.6",
                }}
            >
                {props.text}
            </blockquote>
        );
    },
};
