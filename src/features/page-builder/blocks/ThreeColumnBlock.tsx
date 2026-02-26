const ALLOWED_CHILDREN = [
    "Section", "Heading1", "Heading2", "Heading3", "Heading4", "Heading5", "Heading6",
    "Paragraph", "Span", "Button", "Image", "Video", "Audio", "Marquee",
    "Icon", "Embed", "Link", "Form", "Input", "Textarea", "Select",
    "Checkbox", "Radio", "SubmitButton", "OrderedList", "UnorderedList",
    "ListItem", "Blockquote", "Code", "Divider", "Badge", "Spacer",
    "Table", "Accordion", "Tabs", "Card", "Container",
];

export const ThreeColumnBlock = {
    fields: {
        gap: { type: "text" },
        padding: { type: "text" },
        left: {
            type: "slot",
            allow: ALLOWED_CHILDREN,
        },
        center: {
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
        gap: "40px",
        padding: "0px",
        margin: "0px",
        borderRadius: "4px",
        background: "#8b5cf6",
    },

    render: (props: any) => {
        const { editMode: isEdit, gap, padding, left: Left, center: Center, right: Right } = props;

        return (
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap,
                    border: isEdit ? "2px dashed #8b5cf6" : "none",
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
                            background: props.background ?? "#8b5cf6",
                            color: "#fff",
                            padding: "2px 8px",
                            fontSize: "12px",
                            borderRadius: props.borderRadius ?? "4px",
                        }}
                    >
                        Three Column
                    </span>
                )}

                <div
                    style={{
                        flex: "1 1 200px",
                        minWidth: 0,
                        minHeight: isEdit ? "60px" : undefined,
                    }}
                >
                    <Left />
                </div>
                <div
                    style={{
                        flex: "1 1 200px",
                        minWidth: 0,
                        minHeight: isEdit ? "60px" : undefined,
                    }}
                >
                    <Center />
                </div>
                <div
                    style={{
                        flex: "1 1 200px",
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
