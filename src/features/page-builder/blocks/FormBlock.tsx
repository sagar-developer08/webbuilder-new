export const FormBlock = {
    fields: {
        backgroundColor: { type: "text" },
        padding: { type: "text" },
        children: {
            type: "slot",
            allow: ["Input", "Textarea", "Select", "Checkbox", "Radio", "SubmitButton", "Heading1", "Heading2", "Heading3", "Heading4", "Heading5", "Heading6", "Paragraph", "Span", "Spacer", "Divider"],
        },
        margin: { type: "text" },
        borderRadius: { type: "text" },
        width: { type: "text" },
        height: { type: "text" },
    },

    defaultProps: {
        backgroundColor: "#ffffff",
        padding: "24px",
        margin: "0px",
        borderRadius: "8px",
        width: "auto",
        height: "auto",
    },

    render: (props: any) => {
        const { backgroundColor, padding, children: Children } = props;

        return (
            <form
                onSubmit={(e) => e.preventDefault()}
                style={{
                    width: props.width !== "auto" ? props.width : undefined,
                    height: props.height !== "auto" ? props.height : undefined,
                    backgroundColor,
                    padding,
                    borderRadius: props.borderRadius ?? "8px",
                    border: "1px solid #e2e8f0",
                    margin: props.margin ?? "0px",
                }}
            >
                <Children />
            </form>
        );
    },
};
