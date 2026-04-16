import "./blocks-responsive.css";
const ALLOWED_CHILDREN = [
    "Section", "Heading1", "Heading2", "Heading3", "Heading4", "Heading5", "Heading6",
    "Paragraph", "Span", "Button", "Image", "Video", "Audio", "Marquee",
    "Icon", "Embed", "Link", "Form", "Input", "Textarea", "Select",
    "Checkbox", "Radio", "SubmitButton", "OrderedList", "UnorderedList",
    "ListItem", "Blockquote", "Code", "Divider", "Badge", "Spacer",
    "Table", "Accordion", "Tabs", "Card", "Container",
    "ThreeColumn", "TwoRow", "ThreeRow", "Header2Col", "TwoColFooter",
    "Sidebar2Row", "Grid2x2", "Layout1", "Layout2", "Layout3",
    "Layout4", "Layout5", "Layout6", "Layout7", "Layout8",
];

export const TwoColumnBlock = {
    fields: {
        gap: { type: "text" },
        padding: { type: "text" },
        // Slot fields for left and right columns
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
        width: { type: "text" },
        height: { type: "text" },
    },

    defaultProps: {
        gap: "40px",
        padding: "0px",
        margin: "0px",
        borderRadius: "4px",
        background: "#f59e0b",
        width: "auto",
        height: "auto",
    },

    render: (props: any) => {
        const { editMode: isEdit, gap, padding, left: Left, right: Right } = props;

        return (
            <div
                className="pb-two-col"
                style={{
                    width: props.width !== "auto" ? props.width : undefined,
                    height: props.height !== "auto" ? props.height : undefined,
                    display: "flex",
                    flexWrap: "wrap",
                    gap,
                    border: isEdit ? "2px dashed #f59e0b" : "none",
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
                            background: props.background ?? "#f59e0b",
                            color: "#fff",
                            padding: "2px 8px",
                            fontSize: "12px",
                            borderRadius: props.borderRadius ?? "4px",
                        }}
                    >
                        Two Column
                    </span>
                )}

                <div
                    className="pb-col"
                    style={{
                        flex: "1 1 300px",
                        minWidth: 0,
                        minHeight: isEdit ? "60px" : undefined,
                    }}
                >
                    <Left />
                </div>
                <div
                    className="pb-col"
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