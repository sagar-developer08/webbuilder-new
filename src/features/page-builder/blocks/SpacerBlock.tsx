export const SpacerBlock = {
    fields: {
        height: { type: "text" },
        padding: { type: "text" },
    },

    defaultProps: {
        height: "40px",
        padding: "0px",
    },

    render: (props: any) => {
        return (
            <div
                style={{
                    height: props.height,
                    padding: props.padding,
                    width: "100%",
                }}
            />
        );
    },
};
