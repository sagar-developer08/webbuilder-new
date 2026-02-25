const ALLOWED_CHILDREN = [
    "Section", "Heading1", "Heading2", "Heading3", "Heading4", "Heading5", "Heading6",
    "Paragraph", "Span", "Button", "Image", "Video", "Audio", "Marquee",
    "Icon", "Embed", "Link", "Form", "Input", "Textarea", "Select",
    "Checkbox", "Radio", "SubmitButton", "OrderedList", "UnorderedList",
    "ListItem", "Blockquote", "Code", "Divider", "Badge", "Spacer",
    "Table", "Accordion", "Tabs", "Card", "Container",
];

export const Sidebar2RowBlock = {
    fields: {
        gap: { type: "text" },
        sidebarWidth: { type: "text" },
        sidebar: {
            type: "slot",
            allow: ALLOWED_CHILDREN,
        },
        top: {
            type: "slot",
            allow: ALLOWED_CHILDREN,
        },
        bottom: {
            type: "slot",
            allow: ALLOWED_CHILDREN,
        },
    },

    defaultProps: {
        gap: "20px",
        sidebarWidth: "250px",
    },

    render: (props: any) => {
        const {
            editMode: isEdit,
            gap,
            sidebarWidth,
            sidebar: Sidebar,
            top: Top,
            bottom: Bottom,
        } = props;

        return (
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap,
                    border: isEdit ? "2px dashed #a855f7" : "none",
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
                            background: "#a855f7",
                            color: "#fff",
                            padding: "2px 8px",
                            fontSize: "12px",
                            borderRadius: "4px",
                        }}
                    >
                        Sidebar + 2 Row
                    </span>
                )}

                {/* Narrow sidebar on the left */}
                <div
                    style={{
                        flex: `0 0 ${sidebarWidth}`,
                        minHeight: isEdit ? "120px" : undefined,
                    }}
                >
                    <Sidebar />
                </div>

                {/* Two stacked rows on the right */}
                <div
                    style={{
                        flex: "1 1 0%",
                        minWidth: 0,
                        display: "flex",
                        flexDirection: "column",
                        gap,
                    }}
                >
                    <div style={{ minHeight: isEdit ? "60px" : undefined }}>
                        <Top />
                    </div>
                    <div style={{ minHeight: isEdit ? "60px" : undefined }}>
                        <Bottom />
                    </div>
                </div>
            </div>
        );
    },
};
