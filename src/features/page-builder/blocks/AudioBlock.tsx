export const AudioBlock = {
    fields: {
        audioUrl: { type: "text" },
        controls: {
            type: "select",
            options: [
                { label: "Show Controls", value: "true" },
                { label: "Hide Controls", value: "false" },
            ],
        },
    },

    defaultProps: {
        audioUrl: "",
        controls: "true",
    },

    render: (props: any) => {
        if (!props.audioUrl) {
            return (
                <div
                    style={{
                        padding: "20px",
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
                    🔊 Paste an audio URL in settings
                </div>
            );
        }

        return (
            <audio
                src={props.audioUrl}
                controls={props.controls === "true"}
                style={{ width: "100%" }}
            />
        );
    },
};
