export const RadioBlock = {
    fields: {
        innerText: { type: "text" },
        name: { type: "text" },
        value: { type: "text" },
    },

    defaultProps: {
        innerText: "Radio",
        name: "radio-group",
        value: "option1",
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
