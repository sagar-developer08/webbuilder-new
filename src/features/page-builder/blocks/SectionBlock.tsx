export const SectionBlock = {
    fields: {
        backgroundColor: {
            type: "text",
        },
        padding: {
            type: "text",
        },
        height: {
            type: "text",
        },
        width: {
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
        margin: { type: "text" },
        borderRadius: { type: "text" },
        background: { type: "text" },
    },

    defaultProps: {
        backgroundColor: "#ffffff",
        padding: "60px",
        height: "auto",
        width: "auto",
        margin: "0px",
        borderRadius: "4px",
        background: "#3b82f6",
    },

    render: (props: any) => {
        const { backgroundColor, padding, height, width, editMode, children: Children } = props;

        return (
            <section
                style={{
                    backgroundColor,
                    padding,
                    height,
                    width,
                    border: editMode ? "2px dashed #3b82f6" : "none",
                    minHeight: editMode ? "120px" : undefined,
                    position: "relative",
                    margin: props.margin ?? "0px",
                }}
            >
                {editMode && (
                    <span
                        style={{
                            position: "absolute",
                            top: "-10px",
                            left: "10px",
                            background: props.background ?? "#3b82f6",
                            color: "#fff",
                            padding: "2px 8px",
                            fontSize: "12px",
                            borderRadius: props.borderRadius ?? "4px",
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