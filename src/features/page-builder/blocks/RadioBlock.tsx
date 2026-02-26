export const RadioBlock = {
    fields: {
        innerText: { type: "text" },
        name: { type: "text" },
        value: { type: "text" },
        padding: { type: "text" },
        margin: { type: "text" },
    },

    defaultProps: {
        innerText: "Radio",
        name: "radio-group",
        value: "option1",
        padding: "0px",
        margin: "0px",
    },

    render: (props: any) => {
        return (
            <label
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "14px",
                    color: "#374151",
                    cursor: "pointer",
                    padding: props.padding,
                    margin: props.margin ?? "0px",
                    marginBottom: "8px",
                }}
            >
                <input
                    type="radio"
                    name={props.name}
                    value={props.value}
                    style={{
                        width: "16px",
                        height: "16px",
                        accentColor: "#2563eb",
                    }}
                />
                {props.innerText}
            </label>
        );
    },
};
