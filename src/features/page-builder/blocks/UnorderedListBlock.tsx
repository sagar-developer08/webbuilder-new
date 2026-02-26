export const UnorderedListBlock = {
    fields: {
        listItems: { type: "textarea" },
        fontSize: { type: "text" },
        color: { type: "text" },
        padding: { type: "text" },
        margin: { type: "text" },
    },

    defaultProps: {
        listItems: "Item 1\nItem 2\nItem 3",
        fontSize: "16px",
        color: "#374151",
        padding: "0px",
        margin: "0px",
    },

    render: (props: any) => {
        const items = (props.listItems || "")
            .split("\n")
            .map((item: string) => item.trim())
            .filter((item: string) => item.length > 0);

        return (
            <ul
                style={{
                    fontSize: props.fontSize,
                    color: props.color,
                    padding: props.padding,
                    margin: props.margin ?? "0px",
                    paddingLeft: "24px",
                    listStyleType: "disc",
                    lineHeight: "1.8",
                }}
            >
                {items.map((item: string, i: number) => (
                    <li key={i}>{item}</li>
                ))}
            </ul>
        );
    },
};
