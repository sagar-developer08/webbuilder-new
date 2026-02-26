export const ListItemBlock = {
    fields: {
        text: { type: "text" },
        fontSize: { type: "text" },
        color: { type: "text" },
        padding: { type: "text" },
        margin: { type: "text" },
    },

    defaultProps: {
        text: "List item",
        fontSize: "16px",
        color: "#374151",
        padding: "0px",
        margin: "0px",
    },

    render: (props: any) => {
        return (
            <li
                style={{
                    fontSize: props.fontSize,
                    color: props.color,
                    padding: props.padding,
                    margin: props.margin ?? "0px",
                    lineHeight: "1.8",
                }}
            >
                {props.text}
            </li>
        );
    },
};
