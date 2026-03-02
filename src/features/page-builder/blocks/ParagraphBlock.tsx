export const ParagraphBlock = {
    fields: {
        text: { type: "textarea" },
        fontSize: { type: "text" },
        color: { type: "text" },
        padding: { type: "text" },
        margin: { type: "text" },
        width: { type: "text" },
        height: { type: "text" },
    },

    defaultProps: {
        text: "Your paragraph text...",
        fontSize: "18px",
        color: "#333333",
        padding: "0px",
        margin: "0px",
        width: "auto",
        height: "auto",
    },

    render: (props: any) => {
        return (
            <p
                style={{
                    width: props.width !== "auto" ? props.width : undefined,
                    height: props.height !== "auto" ? props.height : undefined,
                    fontSize: props.fontSize,
                    color: props.color,
                    padding: props.padding,
                    margin: props.margin ?? "0px",
                    lineHeight: "1.6",
                }}
            >
                {props.text}
            </p>
        );
    },
};