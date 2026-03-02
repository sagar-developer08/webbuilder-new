const ALLOWED_CHILDREN = [
    "Section", "Heading1", "Heading2", "Heading3", "Heading4", "Heading5", "Heading6",
    "Paragraph", "Span", "Button", "Image", "Video", "Audio", "Marquee",
    "Icon", "Embed", "Link", "Form", "Input", "Textarea", "Select",
    "Checkbox", "Radio", "SubmitButton", "OrderedList", "UnorderedList",
    "ListItem", "Blockquote", "Code", "Divider", "Badge", "Spacer",
    "Table", "Accordion", "Tabs", "Card", "Container",
];

/**
 * Layout 6: 4 equal columns
 */
export const Layout6Block = {
    fields: {
        gap: { type: "text" },
        padding: { type: "text" },
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
        col4: {
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
        const { editMode: isEdit, gap, padding, col1: Col1, col2: Col2, col3: Col3, col4: Col4 } = props;

        return (
            <div
                style={{
                    width: props.width !== "auto" ? props.width : undefined,
                    height: props.height !== "auto" ? props.height : undefined,
                    display: "flex",
                    flexWrap: "wrap",
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
                        Layout 6
                    </span>
                )}

                <div style={{ flex: "1 1 150px", minWidth: 0, minHeight: isEdit ? "60px" : undefined }}>
                    <Col1 />
                    </div>
                <div style={{ flex: "1 1 150px", minWidth: 0, minHeight: isEdit ? "60px" : undefined }}>
                    <Col2 />
                    </div>
                <div style={{ flex: "1 1 150px", minWidth: 0, minHeight: isEdit ? "60px" : undefined }}>
                    <Col3 />
                    </div>
                <div style={{ flex: "1 1 150px", minWidth: 0, minHeight: isEdit ? "60px" : undefined }}>
                    <Col4 />
                    </div>
                    </div>
                    );
    },
};
