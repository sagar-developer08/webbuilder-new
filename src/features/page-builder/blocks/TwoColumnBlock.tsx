const ALLOWED_CHILDREN = [
    "Section", "Heading1", "Heading2", "Heading3", "Heading4", "Heading5", "Heading6",
    "Paragraph", "Span", "Button", "Image", "Video", "Audio", "Marquee",
    "Icon", "Embed", "Link", "Form", "Input", "Textarea", "Select",
    "Checkbox", "Radio", "SubmitButton", "OrderedList", "UnorderedList",
    "ListItem", "Blockquote", "Code", "Divider", "Badge", "Spacer",
    "Table", "Accordion", "Tabs", "Card", "Container",
];

export const TwoColumnBlock = {
    fields: {
        gap: { type: "text" },
        // Slot fields for left and right columns
        left: {
            type: "slot",
            allow: ALLOWED_CHILDREN,
        },
        right: {
            type: "slot",
            allow: ALLOWED_CHILDREN,
        },
    },

    defaultProps: {
        gap: "40px",
    },

    render: (props: any) => {
        const { editMode: isEdit, gap, left: Left, right: Right } = props;

        return (
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap,
                    border: isEdit ? "2px dashed #f59e0b" : "none",
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
                            background: "#f59e0b",
                            color: "#fff",
                            padding: "2px 8px",
                            fontSize: "12px",
                            borderRadius: "4px",
                        }}
                    >
                        Two Column
                    </span>
                )}

                <div
                    style={{
                        flex: "1 1 300px",
                        minWidth: 0,
                        minHeight: isEdit ? "60px" : undefined,
                    }}
                >
                    <Left />
                </div>
                <div
                    style={{
                        flex: "1 1 300px",
                        minWidth: 0,
                        minHeight: isEdit ? "60px" : undefined,
                    }}
                >
                    <Right />
                </div>
            </div>
        );
    },
};