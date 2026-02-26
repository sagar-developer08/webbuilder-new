export const DividerBlock = {
    fields: {
        color: { type: "text" },
        thickness: { type: "text" },
        style: {
            type: "select",
            options: [
                { label: "Solid", value: "solid" },
                { label: "Dashed", value: "dashed" },
                { label: "Dotted", value: "dotted" },
            ],
        },
        margin: { type: "text" },
    },

    defaultProps: {
        color: "#e2e8f0",
        thickness: "1px",
        style: "solid",
        margin: "24px 0",
    },

    render: (props: any) => {
        return (
            <hr
                style={{
                    border: "none",
                    borderTop: `${props.thickness} ${props.style} ${props.color}`,
                    margin: props.margin,
                }}
            />
        );
    },
};
