import "./blocks-responsive.css";

const ALLOWED_CHILDREN = [
    "Section", "Heading1", "Heading2", "Heading3", "Heading4", "Heading5", "Heading6",
    "Paragraph", "Span", "Button", "Image", "Video", "Audio", "Marquee",
    "Icon", "Embed", "Link", "Form", "Input", "Textarea", "Select",
    "Checkbox", "Radio", "SubmitButton", "OrderedList", "UnorderedList",
    "ListItem", "Blockquote", "Code", "Divider", "Badge", "Spacer",
    "Table", "Accordion", "Tabs", "Card", "Container",
];

export const Grid2x2Block = {
    fields: {
        gap: { type: "text" },
        topLeft: {
            type: "slot",
            allow: ALLOWED_CHILDREN,
        },
        topRight: {
            type: "slot",
            allow: ALLOWED_CHILDREN,
        },
        bottomLeft: {
            type: "slot",
            allow: ALLOWED_CHILDREN,
        },
        bottomRight: {
            type: "slot",
            allow: ALLOWED_CHILDREN,
        },
    },

    defaultProps: {
        gap: "20px",
    },

    render: (props: any) => {
        const {
            editMode: isEdit,
            gap,
            topLeft: TopLeft,
            topRight: TopRight,
            bottomLeft: BottomLeft,
            bottomRight: BottomRight,
        } = props;

        return (
            <div
                className="pb-grid2x2"
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gridTemplateRows: "auto auto",
                    gap,
                    border: isEdit ? "2px dashed #ef4444" : "none",
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
                            background: "#ef4444",
                            color: "#fff",
                            padding: "2px 8px",
                            fontSize: "12px",
                            borderRadius: "4px",
                            zIndex: 1,
                        }}
                    >
                        2×2 Grid
                    </span>
                )}

                <div style={{ minHeight: isEdit ? "60px" : undefined }}>
                    <TopLeft />
                </div>
                <div style={{ minHeight: isEdit ? "60px" : undefined }}>
                    <TopRight />
                </div>
                <div style={{ minHeight: isEdit ? "60px" : undefined }}>
                    <BottomLeft />
                </div>
                <div style={{ minHeight: isEdit ? "60px" : undefined }}>
                    <BottomRight />
                </div>
            </div>
        );
    },
};
