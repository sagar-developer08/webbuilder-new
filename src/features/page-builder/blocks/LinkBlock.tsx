export const LinkBlock = {
    fields: {
        innerText: { type: "text" },
        href: { type: "text" },
        color: { type: "text" },
        fontSize: { type: "text" },
        padding: { type: "text" },
        underline: {
            type: "select",
            options: [
                { label: "Yes", value: "underline" },
                { label: "No", value: "none" },
            ],
        },
        margin: { type: "text" },
    },

    defaultProps: {
        innerText: "Link",
        href: "#",
        color: "#2563eb",
        fontSize: "16px",
        padding: "0px",
        underline: "underline",
        margin: "0px",
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
                    padding: props.padding,
                    margin: props.margin ?? "0px",
                    textDecoration: props.underline,
                    cursor: "pointer",
                }}
            >
                {props.innerText}
            </a>
        );
    },
};
