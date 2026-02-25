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
    },

    defaultProps: {
        label: "Submit",
        backgroundColor: "#2563eb",
        color: "#ffffff",
        padding: "12px 24px",
        fullWidth: "false",
    },

    render: (props: any) => {
        return (
            <button
                type="submit"
                style={{
                    backgroundColor: props.backgroundColor,
                    color: props.color,
                    padding: props.padding,
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "14px",
                    fontWeight: 600,
                    cursor: "pointer",
                    width: props.fullWidth === "true" ? "100%" : "auto",
                }}
            >
                {props.label}
            </button>
        );
    },
};
