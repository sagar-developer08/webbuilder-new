export const Heading1Block = {
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
        width: { type: "text" },
        height: { type: "text" },
    },

    defaultProps: {
        text: "Heading 1",
        color: "#000000",
        padding: "0px",
        textAlign: "left",
        margin: "0px",
        width: "auto",
        height: "auto",
    },

    render: (props: any) => {
        return (
            <h1
                style={{
                    width: props.width !== "auto" ? props.width : undefined,
                    height: props.height !== "auto" ? props.height : undefined,
                    fontSize: "2.5rem",
                    fontWeight: 700,
                    color: props.color,
                    padding: props.padding,
                    margin: props.margin ?? "0px",
                    textAlign: props.textAlign,
                }}
            >
                {props.text}
            </h1>
        );
    },
};
