export const SubmitButtonBlock = {
    fields: {
        label: { type: "text" },
        backgroundColor: { type: "text" },
        color: { type: "text" },
        padding: { type: "text" },
        fullWidth: {
            type: "select",
            options: [
                { label: "Yes", value: "true" },
                { label: "No", value: "false" },
            ],
        },
        margin: { type: "text" },
        borderRadius: { type: "text" },
        width: { type: "text" },
        height: { type: "text" },
    },

    defaultProps: {
        label: "Submit",
        backgroundColor: "#2563eb",
        color: "#ffffff",
        padding: "12px 24px",
        fullWidth: "false",
        margin: "0px",
        borderRadius: "6px",
        width: "auto",
        height: "auto",
    },

    render: (props: any) => {
        return (
            <button
                type="submit"
                style={{
                    width: props.fullWidth === "true" ? "100%" : (props.width !== "auto" ? props.width : undefined),
                    height: props.height !== "auto" ? props.height : undefined,
                    backgroundColor: props.backgroundColor,
                    color: props.color,
                    padding: props.padding,
                    margin: props.margin ?? "0px",
                    border: "none",
                    borderRadius: props.borderRadius ?? "6px",
                    fontSize: "14px",
                    fontWeight: 600,
                    cursor: "pointer",
                }}
            >
                {props.label}
            </button>
        );
    },
};
