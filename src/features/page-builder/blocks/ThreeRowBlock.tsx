const ALLOWED_CHILDREN = [
    "Section", "Heading1", "Heading2", "Heading3", "Heading4", "Heading5", "Heading6",
    "Paragraph", "Span", "Button", "Image", "Video", "Audio", "Marquee",
    "Icon", "Embed", "Link", "Form", "Input", "Textarea", "Select",
    "Checkbox", "Radio", "SubmitButton", "OrderedList", "UnorderedList",
    "ListItem", "Blockquote", "Code", "Divider", "Badge", "Spacer",
    "Table", "Accordion", "Tabs", "Card", "Container",
];

export const ThreeRowBlock = {
    fields: {
        gap: { type: "text" },
        top: {
            type: "slot",
            allow: ALLOWED_CHILDREN,
        },
        middle: {
            type: "slot",
            allow: ALLOWED_CHILDREN,
        },
        bottom: {
            type: "slot",
            allow: ALLOWED_CHILDREN,
        },
    },

    defaultProps: {
        gap: "20px",
    },

    render: (props: any) => {
        const { editMode: isEdit, gap, top: Top, middle: Middle, bottom: Bottom } = props;

        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap,
                    border: isEdit ? "2px dashed #14b8a6" : "none",
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
                            background: "#14b8a6",
                            color: "#fff",
                            padding: "2px 8px",
                            fontSize: "12px",
                            borderRadius: "4px",
                        }}
                    >
                        Three Row
                    </span>
                )}

                <div style={{ minHeight: isEdit ? "60px" : undefined }}>
                    <Top />
                </div>
                <div style={{ minHeight: isEdit ? "60px" : undefined }}>
                    <Middle />
                </div>
                <div style={{ minHeight: isEdit ? "60px" : undefined }}>
                    <Bottom />
                </div>
            </div>
        );
    },
};
