const ALLOWED_CHILDREN = [
    "Section", "Heading1", "Heading2", "Heading3", "Heading4", "Heading5", "Heading6",
    "Paragraph", "Span", "Button", "Image", "Video", "Audio", "Marquee",
    "Icon", "Embed", "Link", "Form", "Input", "Textarea", "Select",
    "Checkbox", "Radio", "SubmitButton", "OrderedList", "UnorderedList",
    "ListItem", "Blockquote", "Code", "Divider", "Badge", "Spacer",
    "Table", "Accordion", "Tabs", "Card", "Container",
];

export const TwoRowBlock = {
    fields: {
        gap: { type: "text" },
        padding: { type: "text" },
        top: {
            type: "slot",
            allow: ALLOWED_CHILDREN,
        },
        bottom: {
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
        background: "#06b6d4",
    },

    render: (props: any) => {
        const { editMode: isEdit, gap, padding, top: Top, bottom: Bottom } = props;

        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap,
                    border: isEdit ? "2px dashed #06b6d4" : "none",
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
                            background: props.background ?? "#06b6d4",
                            color: "#fff",
                            padding: "2px 8px",
                            fontSize: "12px",
                            borderRadius: props.borderRadius ?? "4px",
                        }}
                    >
                        Two Row
                    </span>
                )}

                <div style={{ minHeight: isEdit ? "60px" : undefined }}>
                    <Top />
                </div>
                <div style={{ minHeight: isEdit ? "60px" : undefined }}>
                    <Bottom />
                </div>
            </div>
        );
    },
};
