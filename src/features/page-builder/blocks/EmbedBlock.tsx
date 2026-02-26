export const EmbedBlock = {
    fields: {
        embedUrl: { type: "text" },
        aspectRatio: {
            type: "select",
            options: [
                { label: "16:9", value: "16 / 9" },
                { label: "4:3", value: "4 / 3" },
                { label: "1:1", value: "1 / 1" },
            ],
        },
    },

    defaultProps: {
        embedUrl: "",
        aspectRatio: "16 / 9",
    },

    render: (props: any) => {
        if (!props.embedUrl) {
            return (
                <div
                    style={{
                        aspectRatio: "16 / 9",
                        backgroundColor: "#f1f5f9",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "8px",
                        border: "2px dashed #cbd5e1",
                        color: "#94a3b8",
                        fontSize: "14px",
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
                    borderRadius: "8px",
                    overflow: "hidden",
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
