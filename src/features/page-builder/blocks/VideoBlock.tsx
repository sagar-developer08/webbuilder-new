export const VideoBlock = {
    fields: {
        videoUrl: { type: "text" },
        controls: {
            type: "select",
            options: [
                { label: "Show Controls", value: "true" },
                { label: "Hide Controls", value: "false" },
            ],
        },
        autoplay: {
            type: "select",
            options: [
                { label: "Yes", value: "true" },
                { label: "No", value: "false" },
            ],
        },
        loop: {
            type: "select",
            options: [
                { label: "Yes", value: "true" },
                { label: "No", value: "false" },
            ],
        },
        muted: {
            type: "select",
            options: [
                { label: "Yes", value: "true" },
                { label: "No", value: "false" },
            ],
        },
        padding: { type: "text" },
        margin: { type: "text" },
        borderRadius: { type: "text" },
        backgroundColor: { type: "text" },
    },

    defaultProps: {
        videoUrl: "",
        controls: "true",
        autoplay: "false",
        loop: "false",
        muted: "false",
        padding: "0px",
        margin: "0px",
        borderRadius: "8px",
        backgroundColor: "#f1f5f9",
    },

    render: (props: any) => {
        if (!props.videoUrl) {
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
                    🎬 Paste a video URL in settings
                </div>
            );
        }

        return (
            <div style={{ aspectRatio: "16 / 9", width: "100%", borderRadius: props.borderRadius ?? "8px", overflow: "hidden", padding: props.padding, margin: props.margin ?? "0px", backgroundColor: props.backgroundColor ?? "#f1f5f9" }}>
                <video
                    src={props.videoUrl}
                    controls={props.controls === "true"}
                    autoPlay={props.autoplay === "true"}
                    loop={props.loop === "true"}
                    muted={props.muted === "true"}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
            </div>
        );
    },
};
