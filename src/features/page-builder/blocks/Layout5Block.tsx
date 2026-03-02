const ALLOWED_CHILDREN = [
    "Section", "Heading1", "Heading2", "Heading3", "Heading4", "Heading5", "Heading6",
    "Paragraph", "Span", "Button", "Image", "Video", "Audio", "Marquee",
    "Icon", "Embed", "Link", "Form", "Input", "Textarea", "Select",
    "Checkbox", "Radio", "SubmitButton", "OrderedList", "UnorderedList",
    "ListItem", "Blockquote", "Code", "Divider", "Badge", "Spacer",
    "Table", "Accordion", "Tabs", "Card", "Container",
];

/**
 * Layout 5: 3 rows — hero + 2-column mid + footer
 */
export const Layout5Block = {
    fields: {
        gap: { type: "text" },
        padding: { type: "text" },
        hero: {
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
        footer: {
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
        const { editMode: isEdit, gap, padding, hero: Hero, left: Left, right: Right, footer: Footer } = props;

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
                        Layout 5
                    </span>
                )}

                {/* Hero row */}
                <div style={{ minHeight: isEdit ? "80px" : undefined }}>
                    <Hero />
                    </div>

                    {/* 2-column middle */}
                <div style={{ display: "flex", flexWrap: "wrap", gap }}>
                    <div style={{ flex: "1 1 300px", minWidth: 0, minHeight: isEdit ? "60px" : undefined }}>
                        <Left />
                        </div>
                    <div style={{ flex: "1 1 300px", minWidth: 0, minHeight: isEdit ? "60px" : undefined }}>
                        <Right />
                        </div>
                        </div>

                        {/* Footer row */}
                <div style={{ minHeight: isEdit ? "60px" : undefined }}>
                    <Footer />
                    </div>
                    </div>
                    );
    },
};
