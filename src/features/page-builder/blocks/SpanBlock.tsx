export const SpanBlock = {
    fields: {
        text: { type: "text" },
        fontSize: { type: "text" },
        color: { type: "text" },
        padding: { type: "text" },
        fontWeight: {
            type: "select",
            options: [
                { label: "Normal", value: "400" },
                { label: "Medium", value: "500" },
                { label: "Bold", value: "700" },
            ],
        },
        backgroundColor: { type: "text" },
        margin: { type: "text" },
        borderRadius: { type: "text" },
    },

    defaultProps: {
        text: "Span text",
        fontSize: "16px",
        color: "#000000",
        padding: "0px",
        fontWeight: "400",
        backgroundColor: "transparent",
        margin: "0px",
        borderRadius: undefined,
    },

    render: (props: any) => {
        return (
            <span
                style={{
                    fontSize: props.fontSize,
                    color: props.color,
                    fontWeight: props.fontWeight,
                    backgroundColor: props.backgroundColor,
                    padding: props.padding || (props.backgroundColor !== "transparent" ? "2px 6px" : undefined),
                    margin: props.margin ?? "0px",
                    borderRadius: props.borderRadius ?? (props.backgroundColor !== "transparent" ? "4px" : undefined),
                }}
            >
                {props.text}
            </span>
        );
    },
};
