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
        padding: { type: "text" },
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
        margin: { type: "text" },
        borderRadius: { type: "text" },
        background: { type: "text" },
    },

    defaultProps: {
        gap: "20px",
        padding: "0px",
        sidebarWidth: "280px",
        sidebarHeight: "100vh",
        margin: "0px",
        borderRadius: "4px",
        background: "#6366f1",
    },

    render: (props: any) => {
        const { editMode: isEdit, gap, padding, sidebarWidth, sidebarHeight, sidebar: Sidebar, main: Main } = props;

        return (
            <div
                className="pb-layout2"
                style={{
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
