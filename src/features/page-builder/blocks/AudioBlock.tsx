export const AudioBlock = {
    fields: {
        audioUrl: { type: "text" },
        padding: { type: "text" },
        controls: {
            type: "select",
            options: [
                { label: "Show Controls", value: "true" },
                { label: "Hide Controls", value: "false" },
            ],
        },
        margin: { type: "text" },
        borderRadius: { type: "text" },
        backgroundColor: { type: "text" },
    },

    defaultProps: {
        audioUrl: "",
        padding: "0px",
        controls: "true",
        margin: "0px",
        borderRadius: "8px",
        backgroundColor: "#f1f5f9",
    },

    render: (props: any) => {
        if (!props.audioUrl) {
            return (
                <div
                    style={{
                        padding: "20px",
                        margin: props.margin ?? "0px",
                        backgroundColor: props.backgroundColor ?? "#f1f5f9",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: props.borderRadius ?? "8px",
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
            <div
                style={{
                    margin: props.margin ?? "0px",
                    borderRadius: props.borderRadius ?? "8px",
                    backgroundColor: props.backgroundColor ?? "#f1f5f9",
                    padding: props.padding,
                    overflow: "hidden",
                }}
            >
                <audio
                    src={props.audioUrl}
                    controls={props.controls === "true"}
                    style={{ width: "100%" }}
                />
            </div>
        );
    },
};
