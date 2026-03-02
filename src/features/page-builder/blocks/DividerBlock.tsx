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
        padding: { type: "text" },
        width: { type: "text" },
        height: { type: "text" },
    },

    defaultProps: {
        color: "#e2e8f0",
        thickness: "1px",
        style: "solid",
        margin: "0px",
        padding: "0px",
        width: "auto",
        height: "auto",
    },

    render: (props: any) => {
        return (
            <hr
                style={{
                    width: props.width !== "auto" ? props.width : undefined,
                    height: props.height !== "auto" ? props.height : undefined,
                    border: "none",
                    borderTop: `${props.thickness} ${props.style} ${props.color}`,
                    margin: props.margin ?? "0px",
                    padding: props.padding,
                }}
            />
        );
    },
};
