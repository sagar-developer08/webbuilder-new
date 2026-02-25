export const ImageBlock = {
    fields: {
        src: { type: "text" },
        // Width as a percentage (0–100) for easy resizing
        width: {
            type: "number",
            min: 10,
            max: 100,
            step: 5,
        },
        borderRadius: { type: "text" },
    },

    defaultProps: {
        src: "https://via.placeholder.com/400",
        width: 100,
        borderRadius: "8px",
    },

    render: (props: any) => {
        const widthPercent = typeof props.width === "number" ? props.width : 100;

        return (
            <img
                src={props.src}
                style={{
                    width: `${widthPercent}%`,
                    maxWidth: "100%",
                    height: "auto",
                    display: "block",
                    borderRadius: props.borderRadius,
                }}
                alt=""
            />
        );
    },
};