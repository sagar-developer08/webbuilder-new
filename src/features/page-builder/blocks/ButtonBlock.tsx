export const ButtonBlock = {
    fields: {
        label: { type: "text" },
        link: { type: "text" },
        backgroundColor: { type: "text" },
        color: { type: "text" },
        padding: { type: "text" },
        margin: { type: "text" },
    },

    defaultProps: {
        label: "Click Me",
        link: "#",
        backgroundColor: "#007bff",
        color: "#ffffff",
        padding: "12px 24px",
        margin: "0px",
    },

    render: (props: any) => {
        return (
            <a href={props.link}>
                <button
                    style={{
                        backgroundColor: props.backgroundColor,
                        color: props.color,
                        padding: props.padding,
                        margin: props.margin ?? "0px",
                        border: "none",
                        cursor: "pointer",
                    }}
                >
                    {props.label}
                </button>
            </a>
        );
    },
};