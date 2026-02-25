const ALLOWED_CHILDREN = [
    "Section", "Heading1", "Heading2", "Heading3", "Heading4", "Heading5", "Heading6",
    "Paragraph", "Span", "Button", "Image", "Video", "Audio", "Marquee",
    "Icon", "Embed", "Link", "Form", "Input", "Textarea", "Select",
    "Checkbox", "Radio", "SubmitButton", "OrderedList", "UnorderedList",
    "ListItem", "Blockquote", "Code", "Divider", "Badge", "Spacer",
    "Table", "Accordion", "Tabs", "Card", "Container",
];

/**
 * Layout 7: Asymmetric — 1/3 left + 2/3 right
 */
export const Layout7Block = {
    fields: {
        gap: { type: "text" },
        narrow: {
            type: "slot",
            allow: ALLOWED_CHILDREN,
        },
        wide: {
            type: "slot",
            allow: ALLOWED_CHILDREN,
        },
    },

    defaultProps: {
        gap: "20px",
    },

    render: (props: any) => {
        const { editMode: isEdit, gap, narrow: Narrow, wide: Wide } = props;

        return (
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
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
                        Layout 7
                    </span>
                )}

                {/* Narrow 1/3 column */}
                <div
                    style={{
                        flex: "1 1 200px",
                        maxWidth: "33.333%",
                        minWidth: 0,
                        minHeight: isEdit ? "80px" : undefined,
                    }}
                >
                    <Narrow />
                </div>

                {/* Wide 2/3 column */}
                <div
                    style={{
                        flex: "2 1 400px",
                        minWidth: 0,
                        minHeight: isEdit ? "80px" : undefined,
                    }}
                >
                    <Wide />
                </div>
            </div>
        );
    },
};
