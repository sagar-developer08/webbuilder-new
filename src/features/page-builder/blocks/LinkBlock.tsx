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
        width: { type: "text" },
        height: { type: "text" },
    },

    defaultProps: {
        innerText: "Link",
        href: "#",
        color: "#2563eb",
        fontSize: "16px",
        padding: "0px",
        underline: "underline",
        margin: "0px",
        width: "auto",
        height: "auto",
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
                    width: props.width !== "auto" ? props.width : undefined,
                    height: props.height !== "auto" ? props.height : undefined,
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
