export const ParagraphBlock = {
    fields: {
        text: { type: "textarea" },
        fontSize: { type: "text" },
        color: { type: "text" },
    },

    defaultProps: {
        text: "Your paragraph text...",
        fontSize: "18px",
        color: "#333333",
    },

    render: (props: any) => {
        return (
            <p
                style={{
                    fontSize: props.fontSize,
                    color: props.color,
                    lineHeight: "1.6",
                }}
            >
                {props.text}
            </p>
        );
    },
};