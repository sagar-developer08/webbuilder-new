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
        padding: { type: "text" },
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
        margin: { type: "text" },
        borderRadius: { type: "text" },
        background: { type: "text" },
    },

    defaultProps: {
        gap: "20px",
        padding: "0px",
        margin: "0px",
        borderRadius: "4px",
        background: "#ec4899",
    },

    render: (props: any) => {
        const { editMode: isEdit, gap, padding, header: Header, left: Left, right: Right } = props;

        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap,
                    border: isEdit ? "2px dashed #ec4899" : "none",
                    padding: padding || (isEdit ? "20px" : undefined),
                    margin: props.margin ?? "0px",
                    position: "relative",
                }}
            >
                {isEdit && (
                    <span
                        style={{
                            position: "absolute",
                            top: "-10px",
                            left: "10px",
                            background: props.background ?? "#ec4899",
                            color: "#fff",
                            padding: "2px 8px",
                            fontSize: "12px",
                            borderRadius: props.borderRadius ?? "4px",
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
