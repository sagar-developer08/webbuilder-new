export const LinkBlock = {
    fields: {
        innerText: { type: "text" },
        href: { type: "text" },
        color: { type: "text" },
        fontSize: { type: "text" },
        underline: {
            type: "select",
            options: [
                { label: "Yes", value: "underline" },
                { label: "No", value: "none" },
            ],
        },
    },

    defaultProps: {
        innerText: "Link",
        href: "#",
        color: "#2563eb",
        fontSize: "16px",
        underline: "underline",
    },

    render: (props: any) => {
        const isExternal =
            props.href.startsWith("https://") ||
            props.href.startsWith("http://") ||
            props.href.startsWith("mailto:") ||
            props.href.startsWith("tel:");

        return (
            <a
                href={props.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                style={{
                    color: props.color,
                    fontSize: props.fontSize,
                    textDecoration: props.underline,
                    cursor: "pointer",
                }}
            >
                {props.innerText}
            </a>
        );
    },
};
