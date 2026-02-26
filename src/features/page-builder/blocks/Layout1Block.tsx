const ALLOWED_CHILDREN = [
    "Section", "Heading1", "Heading2", "Heading3", "Heading4", "Heading5", "Heading6",
    "Paragraph", "Span", "Button", "Image", "Video", "Audio", "Marquee",
    "Icon", "Embed", "Link", "Form", "Input", "Textarea", "Select",
    "Checkbox", "Radio", "SubmitButton", "OrderedList", "UnorderedList",
    "ListItem", "Blockquote", "Code", "Divider", "Badge", "Spacer",
    "Table", "Accordion", "Tabs", "Card", "Container",
];

/**
 * Layout 1: Full-width hero + 3 columns below
 */
export const Layout1Block = {
    fields: {
        gap: { type: "text" },
        hero: {
            type: "slot",
            allow: ALLOWED_CHILDREN,
        },
        col1: {
            type: "slot",
            allow: ALLOWED_CHILDREN,
        },
        col2: {
            type: "slot",
            allow: ALLOWED_CHILDREN,
        },
        col3: {
            type: "slot",
            allow: ALLOWED_CHILDREN,
        },
    },

    defaultProps: {
        gap: "20px",
    },

    render: (props: any) => {
        const { editMode: isEdit, gap, hero: Hero, col1: Col1, col2: Col2, col3: Col3 } = props;

        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap,
                    border: isEdit ? "2px dashed #6366f1" : "none",
                    padding: isEdit ? "20px" : undefined,
                    position: "relative",
                }}
            >
                {isEdit && (
                    <span
                        style={{
                            position: "absolute",
                            top: "-10px",
                            left: "10px",
                            background: "#6366f1",
                            color: "#fff",
                            padding: "2px 8px",
                            fontSize: "12px",
                            borderRadius: "4px",
                        }}
                    >
                        Layout 1
                    </span>
                )}

                {/* Full-width hero */}
                <div style={{ minHeight: isEdit ? "80px" : undefined }}>
                    <Hero />
                </div>

                {/* 3 columns below */}
                <div style={{ display: "flex", flexWrap: "wrap", gap }}>
                    <div style={{ flex: "1 1 200px", minWidth: 0, minHeight: isEdit ? "60px" : undefined }}>
                        <Col1 />
                    </div>
                    <div style={{ flex: "1 1 200px", minWidth: 0, minHeight: isEdit ? "60px" : undefined }}>
                        <Col2 />
                    </div>
                    <div style={{ flex: "1 1 200px", minWidth: 0, minHeight: isEdit ? "60px" : undefined }}>
                        <Col3 />
                    </div>
                </div>
            </div>
        );
    },
};
