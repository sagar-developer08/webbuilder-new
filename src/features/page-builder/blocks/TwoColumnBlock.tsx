export const TwoColumnBlock = {
    fields: {
        gap: { type: "text" },
        // Slot fields for left and right columns
        left: {
            type: "slot",
            allow: ["Section", "Heading", "Paragraph", "Button", "Image", "Container"],
        },
        right: {
            type: "slot",
            allow: ["Section", "Heading", "Paragraph", "Button", "Image", "Container"],
        },
    },

    defaultProps: {
        gap: "40px",
    },

    render: (props: any) => {
        const { editMode: isEdit, gap, left: Left, right: Right } = props;

        return (
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap,
                    border: isEdit ? "2px dashed #f59e0b" : "none",
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
                            background: "#f59e0b",
                            color: "#fff",
                            padding: "2px 8px",
                            fontSize: "12px",
                            borderRadius: "4px",
                        }}
                    >
                        Two Column
                    </span>
                )}

                <div
                    style={{
                        flex: "1 1 300px",
                        minWidth: 0,
                        minHeight: isEdit ? "60px" : undefined,
                    }}
                >
                    <Left />
                </div>
                <div
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