export const OrderedListBlock = {
    fields: {
        listItems: { type: "textarea" },
        fontSize: { type: "text" },
        color: { type: "text" },
    },

    defaultProps: {
        listItems: "Step 1\nStep 2\nStep 3",
        fontSize: "16px",
        color: "#374151",
    },

    render: (props: any) => {
        const items = (props.listItems || "")
            .split("\n")
            .map((item: string) => item.trim())
            .filter((item: string) => item.length > 0);

        return (
            <ol
                style={{
                    fontSize: props.fontSize,
                    color: props.color,
                    paddingLeft: "24px",
                    listStyleType: "decimal",
                    lineHeight: "1.8",
                }}
            >
                {items.map((item: string, i: number) => (
                    <li key={i}>{item}</li>
                ))}
            </ol>
        );
    },
};
