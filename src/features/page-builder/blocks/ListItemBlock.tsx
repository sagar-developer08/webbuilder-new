export const ListItemBlock = {
    fields: {
        text: { type: "text" },
        fontSize: { type: "text" },
        color: { type: "text" },
    },

    defaultProps: {
        text: "List item",
        fontSize: "16px",
        color: "#374151",
    },

    render: (props: any) => {
        return (
            <li
                style={{
                    fontSize: props.fontSize,
                    color: props.color,
                    lineHeight: "1.8",
                }}
            >
                {props.text}
            </li>
        );
    },
};
