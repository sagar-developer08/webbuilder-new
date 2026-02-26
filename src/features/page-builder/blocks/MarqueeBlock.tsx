export const MarqueeBlock = {
    fields: {
        text: { type: "text" },
        direction: {
            type: "select",
            options: [
                { label: "Left", value: "left" },
                { label: "Right", value: "right" },
            ],
        },
        speed: {
            type: "select",
            options: [
                { label: "Slow", value: "slow" },
                { label: "Normal", value: "normal" },
                { label: "Fast", value: "fast" },
            ],
        },
        backgroundColor: { type: "text" },
        color: { type: "text" },
        fontSize: { type: "text" },
        pauseOnHover: {
            type: "select",
            options: [
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" },
            ],
        },
    },

    defaultProps: {
        text: "This is a scrolling marquee text ✦ Add your announcement here ✦",
        direction: "left",
        speed: "normal",
        backgroundColor: "#1a1a2e",
        color: "#ffffff",
        fontSize: "18px",
        pauseOnHover: "yes",
    },

    render: (props: any) => {
        const speedMap: Record<string, string> = {
            slow: "20s",
            normal: "12s",
            fast: "6s",
        };

        const duration = speedMap[props.speed] || "12s";
        const isReverse = props.direction === "right";
        const uniqueId = `marquee-${Math.random().toString(36).slice(2, 9)}`;

        const keyframesCSS = `
            @keyframes ${uniqueId}-scroll {
                0% { transform: translateX(${isReverse ? "-100%" : "0%"}); }
                100% { transform: translateX(${isReverse ? "0%" : "-100%"}); }
            }
        `;

        return (
            <div
                style={{
                    backgroundColor: props.backgroundColor,
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    width: "100%",
                    padding: "12px 0",
                }}
            >
                <style>{keyframesCSS}</style>
                <div
                    style={{
                        display: "inline-flex",
                        animation: `${uniqueId}-scroll ${duration} linear infinite`,
                        animationPlayState: "running",
                        ...(props.pauseOnHover === "yes" ? {} : {}),
                    }}
                    onMouseEnter={(e) => {
                        if (props.pauseOnHover === "yes") {
                            (e.currentTarget as HTMLDivElement).style.animationPlayState = "paused";
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (props.pauseOnHover === "yes") {
                            (e.currentTarget as HTMLDivElement).style.animationPlayState = "running";
                        }
                    }}
                >
                    {/* Duplicate the text to create a seamless loop */}
                    <span
                        style={{
                            color: props.color,
                            fontSize: props.fontSize,
                            paddingRight: "60px",
                            fontWeight: "500",
                        }}
                    >
                        {props.text}
                    </span>
                    <span
                        style={{
                            color: props.color,
                            fontSize: props.fontSize,
                            paddingRight: "60px",
                            fontWeight: "500",
                        }}
                    >
                        {props.text}
                    </span>
                </div>
            </div>
        );
    },
};
