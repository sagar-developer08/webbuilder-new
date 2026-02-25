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
            allow: [
                "Heading1", "Heading2", "Heading3", "Heading4", "Heading5", "Heading6",
                "Paragraph", "Span", "Button", "Image", "Video", "Audio", "Marquee",
                "Icon", "Embed", "Link", "Form", "Input", "Textarea", "Select",
                "Checkbox", "Radio", "SubmitButton", "OrderedList", "UnorderedList",
                "ListItem", "Blockquote", "Code", "Divider", "Badge", "Spacer",
                "Table", "Accordion", "Tabs", "Card", "Container", "TwoColumn",
                "ThreeColumn", "TwoRow", "ThreeRow", "Header2Col", "TwoColFooter",
                "Sidebar2Row", "Grid2x2", "Layout1", "Layout2", "Layout3",
                "Layout4", "Layout5", "Layout6", "Layout7", "Layout8",
            ],
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