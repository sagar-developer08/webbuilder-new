export const SpanBlock = {
    fields: {
        text: { type: "text" },
        fontSize: { type: "text" },
        color: { type: "text" },
        fontWeight: {
            type: "select",
            options: [
                { label: "Normal", value: "400" },
                { label: "Medium", value: "500" },
                { label: "Bold", value: "700" },
            ],
        },
        backgroundColor: { type: "text" },
    },

    defaultProps: {
        text: "Span text",
        fontSize: "16px",
        color: "#000000",
        fontWeight: "400",
        backgroundColor: "transparent",
    },

    render: (props: any) => {
        return (
            <span
                style={{
                    fontSize: props.fontSize,
                    color: props.color,
                    fontWeight: props.fontWeight,
                    backgroundColor: props.backgroundColor,
                    padding: props.backgroundColor !== "transparent" ? "2px 6px" : undefined,
                    borderRadius: props.backgroundColor !== "transparent" ? "4px" : undefined,
                }}
            >
                {props.text}
            </span>
        );
    },
};
