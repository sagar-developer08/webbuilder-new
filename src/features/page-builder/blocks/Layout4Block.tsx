const ALLOWED_CHILDREN = [
    "Section", "Heading1", "Heading2", "Heading3", "Heading4", "Heading5", "Heading6",
    "Paragraph", "Span", "Button", "Image", "Video", "Audio", "Marquee",
    "Icon", "Embed", "Link", "Form", "Input", "Textarea", "Select",
    "Checkbox", "Radio", "SubmitButton", "OrderedList", "UnorderedList",
    "ListItem", "Blockquote", "Code", "Divider", "Badge", "Spacer",
    "Table", "Accordion", "Tabs", "Card", "Container",
];

/**
 * Layout 4: Full-width top + 2 columns mid + full-width bottom
 */
export const Layout4Block = {
    fields: {
        gap: { type: "text" },
        padding: { type: "text" },
        top: {
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
        bottom: {
            type: "slot",
            allow: ALLOWED_CHILDREN,
        },
        margin: { type: "text" },
        borderRadius: { type: "text" },
        background: { type: "text" },
        width: { type: "text" },
        height: { type: "text" },
    },

    defaultProps: {
        gap: "20px",
        padding: "0px",
        margin: "0px",
        borderRadius: "4px",
        background: "#6366f1",
        width: "auto",
        height: "auto",
    },

    render: (props: any) => {
        const { editMode: isEdit, gap, padding, top: Top, left: Left, right: Right, bottom: Bottom } = props;

        return (
            <div
                style={{
                    width: props.width !== "auto" ? props.width : undefined,
                    height: props.height !== "auto" ? props.height : undefined,
                    display: "flex",
                    flexDirection: "column",
                    gap,
                    border: isEdit ? "2px dashed #6366f1" : "none",
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
                            background: props.background ?? "#6366f1",
                            color: "#fff",
                            padding: "2px 8px",
                            fontSize: "12px",
                            borderRadius: props.borderRadius ?? "4px",
                        }}
                    >
                        Layout 4
                    </span>
                )}

                {/* Full-width top */}
                <div style={{ minHeight: isEdit ? "60px" : undefined }}>
                    <Top />
                    </div>

                    {/* 2 columns middle */}
                <div style={{ display: "flex", flexWrap: "wrap", gap }}>
                    <div style={{ flex: "1 1 300px", minWidth: 0, minHeight: isEdit ? "60px" : undefined }}>
                        <Left />
                        </div>
                    <div style={{ flex: "1 1 300px", minWidth: 0, minHeight: isEdit ? "60px" : undefined }}>
                        <Right />
                        </div>
                        </div>

                        {/* Full-width bottom */}
                <div style={{ minHeight: isEdit ? "60px" : undefined }}>
                    <Bottom />
                    </div>
                    </div>
                    );
    },
};
