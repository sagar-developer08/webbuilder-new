export const BlockquoteBlock = {
    fields: {
        text: { type: "textarea" },
        borderColor: { type: "text" },
        color: { type: "text" },
        fontSize: { type: "text" },
        padding: { type: "text" },
        margin: { type: "text" },
        borderRadius: { type: "text" },
        backgroundColor: { type: "text" },
        width: { type: "text" },
        height: { type: "text" },
    },

    defaultProps: {
        text: "This is a blockquote. Use it for quotes or highlighted content.",
        borderColor: "#2563eb",
        color: "#4b5563",
        fontSize: "18px",
        padding: "12px 20px",
        margin: "0px",
        borderRadius: "0 8px 8px 0",
        backgroundColor: "#f8fafc",
        width: "auto",
        height: "auto",
    },

    render: (props: any) => {
        return (
            <blockquote
                style={{
                    width: props.width !== "auto" ? props.width : undefined,
                    height: props.height !== "auto" ? props.height : undefined,
                    borderLeft: `4px solid ${props.borderColor}`,
                    padding: props.padding,
                    margin: props.margin ?? "0px",
                    color: props.color,
                    fontSize: props.fontSize,
                    fontStyle: "italic",
                    backgroundColor: props.backgroundColor ?? "#f8fafc",
                    borderRadius: props.borderRadius ?? "0 8px 8px 0",
                    lineHeight: "1.6",
                }}
            >
                {props.text}
            </blockquote>
        );
    },
};
