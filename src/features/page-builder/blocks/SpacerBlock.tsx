export const SpacerBlock = {
    fields: {
        height: { type: "text" },
    },

    defaultProps: {
        height: "40px",
    },

    render: (props: any) => {
        return (
            <div
                style={{
                    height: props.height,
                    width: "100%",
                }}
            />
        );
    },
};
