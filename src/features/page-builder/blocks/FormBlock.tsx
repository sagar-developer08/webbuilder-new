export const FormBlock = {
    fields: {
        backgroundColor: { type: "text" },
        padding: { type: "text" },
        children: {
            type: "slot",
            allow: ["Input", "Textarea", "Select", "Checkbox", "Radio", "SubmitButton", "Heading1", "Heading2", "Heading3", "Heading4", "Heading5", "Heading6", "Paragraph", "Span", "Spacer", "Divider"],
        },
    },

    defaultProps: {
        backgroundColor: "#ffffff",
        padding: "24px",
    },

    render: (props: any) => {
        const { backgroundColor, padding, children: Children } = props;

        return (
            <form
                onSubmit={(e) => e.preventDefault()}
                style={{
                    backgroundColor,
                    padding,
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                }}
            >
                <Children />
            </form>
        );
    },
};
