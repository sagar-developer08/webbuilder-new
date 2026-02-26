export const Heading3Block = {
    fields: {
        text: { type: "text" },
        color: { type: "text" },
        textAlign: {
            type: "select",
            options: [
                { label: "Left", value: "left" },
                { label: "Center", value: "center" },
                { label: "Right", value: "right" },
            ],
        },
    },

    defaultProps: {
        text: "Heading 3",
        color: "#000000",
        textAlign: "left",
    },

    render: (props: any) => {
        return (
            <h3
                style={{
                    fontSize: "1.75rem",
                    fontWeight: 600,
                    color: props.color,
                    textAlign: props.textAlign,
                    margin: "0.5em 0",
                }}
            >
                {props.text}
            </h3>
        );
    },
};
