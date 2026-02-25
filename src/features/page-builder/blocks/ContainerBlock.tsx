export const ContainerBlock = {
    fields: {
        maxWidth: { type: "text" },
        // Slot field for nested content
        children: {
            type: "slot",
            allow: [
                "Section",
                "Heading",
                "Paragraph",
                "Button",
                "Image",
                "TwoColumn",
                "Container",
            ],
        },
    },

    defaultProps: {
        maxWidth: "1600px",
    },

    render: (props: any) => {
        const { editMode: isEdit, maxWidth, children: Children } = props;

        return (
            <div
                style={{
                    maxWidth,
                    margin: "0 auto",
                    border: isEdit ? "2px dashed #10b981" : "none",
                    minHeight: isEdit ? "100px" : undefined,
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
                            background: "#10b981",
                            color: "#fff",
                            padding: "2px 8px",
                            fontSize: "12px",
                            borderRadius: "4px",
                        }}
                    >
                        Container
                    </span>
                )}

                {/* Render nested content via slot */}
                <Children />
            </div>
        );
    },
};