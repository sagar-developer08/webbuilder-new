export const CardBlock = {
    fields: {
        cardTitle: { type: "text" },
        cardBody: { type: "textarea" },
        cardImageUrl: { type: "text" },
        backgroundColor: { type: "text" },
        padding: { type: "text" },
        borderRadius: { type: "text" },
        margin: { type: "text" },
        boxShadow: { type: "text" },
    },

    defaultProps: {
        cardTitle: "Card Title",
        cardBody: "Card body text. Describe something interesting here.",
        cardImageUrl: "",
        backgroundColor: "#ffffff",
        padding: "20px",
        borderRadius: "12px",
        margin: "0px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
    },

    render: (props: any) => {
        return (
            <div
                style={{
                    backgroundColor: props.backgroundColor,
                    borderRadius: props.borderRadius,
                    border: "1px solid #e2e8f0",
                    overflow: "hidden",
                    boxShadow: props.boxShadow ?? "0 1px 3px rgba(0,0,0,0.08)",
                    margin: props.margin ?? "0px",
                }}
            >
                {props.cardImageUrl && (
                    <div style={{ aspectRatio: "16 / 9", overflow: "hidden" }}>
                        <img
                            src={props.cardImageUrl}
                            alt={props.cardTitle}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                        />
                    </div>
                )}
                <div style={{ padding: props.padding }}>
                    <h3
                        style={{
                            fontSize: "18px",
                            fontWeight: 600,
                            color: "#1e293b",
                            marginBottom: "8px",
                            margin: "0 0 8px 0",
                        }}
                    >
                        {props.cardTitle}
                    </h3>
                    <p
                        style={{
                            fontSize: "14px",
                            color: "#64748b",
                            lineHeight: "1.6",
                            margin: 0,
                        }}
                    >
                        {props.cardBody}
                    </p>
                </div>
            </div>
        );
    },
};
