import "./blocks-responsive.css";

const ALLOWED_CHILDREN = [
    "Section", "Heading1", "Heading2", "Heading3", "Heading4", "Heading5", "Heading6",
    "Paragraph", "Span", "Button", "Image", "Video", "Audio", "Marquee",
    "Icon", "Embed", "Link", "Form", "Input", "Textarea", "Select",
    "Checkbox", "Radio", "SubmitButton", "OrderedList", "UnorderedList",
    "ListItem", "Blockquote", "Code", "Divider", "Badge", "Spacer",
    "Table", "Accordion", "Tabs", "Card", "Container",
];

/**
 * Layout 2: Sidebar left + main content right
 */
export const Layout2Block = {
    fields: {
        gap: { type: "text" },
        sidebarWidth: { type: "text" },
        sidebarHeight: { type: "text" },
        sidebar: {
            type: "slot",
            allow: ALLOWED_CHILDREN,
        },
        main: {
            type: "slot",
            allow: ALLOWED_CHILDREN,
        },
    },

    defaultProps: {
        gap: "20px",
        sidebarWidth: "280px",
        sidebarHeight: "100vh",
    },

    render: (props: any) => {
        const { editMode: isEdit, gap, sidebarWidth, sidebarHeight, sidebar: Sidebar, main: Main } = props;

        return (
            <div
                className="pb-layout2"
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap,
                    border: isEdit ? "2px dashed #6366f1" : "none",
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
                            background: "#6366f1",
                            color: "#fff",
                            padding: "2px 8px",
                            fontSize: "12px",
                            borderRadius: "4px",
                        }}
                    >
                        Layout 2
                    </span>
                )}

                {/* Sidebar left */}
                <div
                    className="pb-sidebar"
                    style={{
                        flex: `0 0 ${sidebarWidth}`,
                        height: sidebarHeight,
                        minHeight: isEdit ? "120px" : undefined,
                    }}
                >
                    <Sidebar />
                </div>

                {/* Main content right */}
                <div
                    className="pb-col"
                    style={{
                        flex: "1 1 0%",
                        minWidth: 0,
                        minHeight: isEdit ? "120px" : undefined,
                    }}
                >
                    <Main />
                </div>
            </div>
        );
    },
};
