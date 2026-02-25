export const Heading1Block = {
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
        text: "Heading 1",
        color: "#000000",
        textAlign: "left",
    },

    render: (props: any) => {
        return (
            <h1
                style={{
                    fontSize: "2.5rem",
                    fontWeight: 700,
                    color: props.color,
                    textAlign: props.textAlign,
                    margin: "0.5em 0",
                }}
            >
                {props.text}
            </h1>
        );
    },
};
