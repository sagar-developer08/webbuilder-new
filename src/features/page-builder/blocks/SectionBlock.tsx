export const SectionBlock = {
    fields: {
        backgroundColor: {
            type: "text",
        },
        padding: {
            type: "text",
        },
        // Slot field for nested content
        children: {
            type: "slot",
            allow: ["Heading", "Paragraph", "Button", "Image", "Container", "TwoColumn"],
        },
    },

    defaultProps: {
        backgroundColor: "#ffffff",
        padding: "60px",
    },

    render: (props: any) => {
        const { backgroundColor, padding, editMode, children: Children } = props;

        return (
            <section
                style={{
                    backgroundColor,
                    padding,
                    border: editMode ? "2px dashed #3b82f6" : "none",
                    minHeight: editMode ? "120px" : undefined,
                    position: "relative",
                }}
            >
                {editMode && (
                    <span
                        style={{
                            position: "absolute",
                            top: "-10px",
                            left: "10px",
                            background: "#3b82f6",
                            color: "#fff",
                            padding: "2px 8px",
                            fontSize: "12px",
                            borderRadius: "4px",
                        }}
                    >
                        Section
                    </span>
                )}
                {/* Render nested content via slot */}
                <Children />
            </section>
        );
    },
};