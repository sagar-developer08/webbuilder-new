export const HeadingBlock = {
    fields: {
        text: { type: "text" },
        fontSize: { type: "text" },
        color: { type: "text" },
        fontWeight: {
            type: "select",
            options: [
                { label: "Normal", value: "400" },
                { label: "Bold", value: "700" },
            ],
        },
    },

    defaultProps: {
        text: "Your Heading",
        fontSize: "40px",
        color: "#000000",
        fontWeight: "700",
    },

    render: (props: any) => {
        return (
            <h1
                style={{
                    fontSize: props.fontSize,
                    color: props.color,
                    fontWeight: props.fontWeight,
                }}
            >
                {props.text}
            </h1>
        );
    },
};