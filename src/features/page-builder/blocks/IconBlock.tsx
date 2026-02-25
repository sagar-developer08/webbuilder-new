export const IconBlock = {
    fields: {
        iconName: { type: "text" },
        size: { type: "text" },
        color: { type: "text" },
        href: { type: "text" },
    },

    defaultProps: {
        iconName: "Star",
        size: "24px",
        color: "#000000",
        href: "",
    },

    render: (props: any) => {
        // Render a simple SVG placeholder since we can't dynamically import Lucide icons
        // in a Puck block without async loading. Using an inline Unicode/emoji fallback.
        const iconContent = (
            <span
                style={{
                    fontSize: props.size,
                    color: props.color,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    lineHeight: 1,
                }}
                title={props.iconName}
            >
                {/* Unicode star as default, user sees icon name in tooltip */}
                ⭐
            </span>
        );

        if (props.href) {
            return (
                <a
                    href={props.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "inline-flex", textDecoration: "none" }}
                >
                    {iconContent}
                </a>
            );
        }

        return iconContent;
    },
};
