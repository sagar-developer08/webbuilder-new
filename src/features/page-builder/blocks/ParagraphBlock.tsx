export const ParagraphBlock = {
    fields: {
        text: { type: "textarea" },
        fontSize: { type: "text" },
        color: { type: "text" },
        padding: { type: "text" },
        margin: { type: "text" },
    },

    defaultProps: {
        text: "Your paragraph text...",
        fontSize: "18px",
        color: "#333333",
        padding: "0px",
        margin: "0px",
    },

    render: (props: any) => {
        return (
            <p
                style={{
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