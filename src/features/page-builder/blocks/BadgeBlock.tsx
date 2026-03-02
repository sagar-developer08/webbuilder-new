export const BadgeBlock = {
    fields: {
        text: { type: "text" },
        backgroundColor: { type: "text" },
        color: { type: "text" },
        fontSize: { type: "text" },
        padding: { type: "text" },
        borderRadius: { type: "text" },
        margin: { type: "text" },
        width: { type: "text" },
        height: { type: "text" },
    },

    defaultProps: {
        text: "New",
        backgroundColor: "#2563eb",
        color: "#ffffff",
        fontSize: "12px",
        padding: "4px 12px",
        borderRadius: "999px",
        margin: "0px",
        width: "auto",
        height: "auto",
    },

    render: (props: any) => {
        return (
            <span
                style={{
                    width: props.width !== "auto" ? props.width : undefined,
                    height: props.height !== "auto" ? props.height : undefined,
                    display: "inline-block",
                    backgroundColor: props.backgroundColor,
                    color: props.color,
                    fontSize: props.fontSize,
                    fontWeight: 600,
                    padding: props.padding,
                    margin: props.margin ?? "0px",
                    borderRadius: props.borderRadius,
                    letterSpacing: "0.025em",
                    textTransform: "uppercase",
                }}
            >
                {props.text}
            </span>
        );
    },
};
