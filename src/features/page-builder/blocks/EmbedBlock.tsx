export const EmbedBlock = {
    fields: {
        embedUrl: { type: "text" },
        padding: { type: "text" },
        aspectRatio: {
            type: "select",
            options: [
                { label: "16:9", value: "16 / 9" },
                { label: "4:3", value: "4 / 3" },
                { label: "1:1", value: "1 / 1" },
            ],
        },
        margin: { type: "text" },
        borderRadius: { type: "text" },
        backgroundColor: { type: "text" },
    },

    defaultProps: {
        embedUrl: "",
        padding: "0px",
        aspectRatio: "16 / 9",
        margin: "0px",
        borderRadius: "8px",
        backgroundColor: "#f1f5f9",
    },

    render: (props: any) => {
        if (!props.embedUrl) {
            return (
                <div
                    style={{
                        aspectRatio: "16 / 9",
                        backgroundColor: props.backgroundColor ?? "#f1f5f9",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: props.borderRadius ?? "8px",
                        border: "2px dashed #cbd5e1",
                        color: "#94a3b8",
                        fontSize: "14px",
                        margin: props.margin ?? "0px",
                    }}
                >
                    🔗 Paste an embed URL in settings (YouTube, Maps, Figma, etc.)
                </div>
            );
        }

        return (
            <div
                style={{
                    aspectRatio: props.aspectRatio,
                    width: "100%",
                    borderRadius: props.borderRadius ?? "8px",
                    overflow: "hidden",
                    padding: props.padding,
                    margin: props.margin,
                }}
            >
                <iframe
                    src={props.embedUrl}
                    style={{
                        width: "100%",
                        height: "100%",
                        border: "none",
                    }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>
        );
    },
};
