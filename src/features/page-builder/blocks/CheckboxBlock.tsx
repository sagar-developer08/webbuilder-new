export const CheckboxBlock = {
    fields: {
        innerText: { type: "text" },
        padding: { type: "text" },
        checked: {
            type: "select",
            options: [
                { label: "Unchecked", value: "false" },
                { label: "Checked", value: "true" },
            ],
        },
        margin: { type: "text" },
    },

    defaultProps: {
        innerText: "Checkbox",
        padding: "0px",
        checked: "false",
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
                    type="checkbox"
                    defaultChecked={props.checked === "true"}
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
