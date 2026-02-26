const ALLOWED_CHILDREN = [
    "Section", "Heading1", "Heading2", "Heading3", "Heading4", "Heading5", "Heading6",
    "Paragraph", "Span", "Button", "Image", "Video", "Audio", "Marquee",
    "Icon", "Embed", "Link", "Form", "Input", "Textarea", "Select",
    "Checkbox", "Radio", "SubmitButton", "OrderedList", "UnorderedList",
    "ListItem", "Blockquote", "Code", "Divider", "Badge", "Spacer",
    "Table", "Accordion", "Tabs", "Card", "Container",
];

export const Header2ColBlock = {
    fields: {
        gap: { type: "text" },
        header: {
            type: "slot",
            allow: ALLOWED_CHILDREN,
        },
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
        gap: "20px",
    },

    render: (props: any) => {
        const { editMode: isEdit, gap, header: Header, left: Left, right: Right } = props;

        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap,
                    border: isEdit ? "2px dashed #ec4899" : "none",
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
                            background: "#ec4899",
                            color: "#fff",
                            padding: "2px 8px",
                            fontSize: "12px",
                            borderRadius: "4px",
                        }}
                    >
                        Header + 2 Col
                    </span>
                )}

                {/* Full-width header row */}
                <div style={{ minHeight: isEdit ? "60px" : undefined }}>
                    <Header />
                </div>

                {/* Two columns below */}
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap,
                    }}
                >
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
            </div>
        );
    },
};
