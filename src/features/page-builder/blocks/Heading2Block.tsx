export const Heading2Block = {
    fields: {
        text: { type: "text" },
        color: { type: "text" },
        padding: { type: "text" },
        textAlign: {
            type: "select",
            options: [
                { label: "Left", value: "left" },
                { label: "Center", value: "center" },
                { label: "Right", value: "right" },
            ],
        },
        margin: { type: "text" },
    },

    defaultProps: {
        text: "Heading 2",
        color: "#000000",
        padding: "0px",
        textAlign: "left",
        margin: "0px",
    },

    render: (props: any) => {
        return (
            <h2
                style={{
                    fontSize: "2rem",
                    fontWeight: 700,
                    color: props.color,
                    padding: props.padding,
                    margin: props.margin ?? "0px",
                    textAlign: props.textAlign,
                }}
            >
                {props.text}
            </h2>
        );
    },
};
