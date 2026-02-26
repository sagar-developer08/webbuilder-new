export const Heading2Block = {
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
        text: "Heading 2",
        color: "#000000",
        textAlign: "left",
    },

    render: (props: any) => {
        return (
            <h2
                style={{
                    fontSize: "2rem",
                    fontWeight: 700,
                    color: props.color,
                    textAlign: props.textAlign,
                    margin: "0.5em 0",
                }}
            >
                {props.text}
            </h2>
        );
    },
};
