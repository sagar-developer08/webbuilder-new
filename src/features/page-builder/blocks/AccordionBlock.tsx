import { useState } from "react";

export const AccordionBlock = {
    fields: {
        accordionItems: { type: "textarea" },
    },

    defaultProps: {
        accordionItems: "FAQ 1 | Answer to frequently asked question 1\nFAQ 2 | Answer to frequently asked question 2\nFAQ 3 | Answer to frequently asked question 3",
    },

    render: (props: any) => {
        const items = (props.accordionItems || "")
            .split("\n")
            .map((line: string) => {
                const [label, ...bodyParts] = line.split("|");
                return {
                    label: (label || "").trim(),
                    body: bodyParts.join("|").trim(),
                };
            })
            .filter((item: { label: string; body: string }) => item.label.length > 0);

        return <AccordionRenderer items={items} />;
    },
};

function AccordionRenderer({ items }: { items: { label: string; body: string }[] }) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <div style={{ margin: "16px 0", borderRadius: "8px", border: "1px solid #e2e8f0", overflow: "hidden" }}>
            {items.map((item, i) => (
                <div key={i}>
                    <button
                        onClick={() => setOpenIndex(openIndex === i ? null : i)}
                        style={{
                            width: "100%",
                            padding: "14px 16px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            backgroundColor: openIndex === i ? "#f8fafc" : "#ffffff",
                            border: "none",
                            borderBottom: "1px solid #e2e8f0",
                            cursor: "pointer",
                            fontSize: "15px",
                            fontWeight: 600,
                            color: "#1e293b",
                            textAlign: "left",
                        }}
                    >
                        {item.label}
                        <span
                            style={{
                                transform: openIndex === i ? "rotate(180deg)" : "rotate(0deg)",
                                transition: "transform 0.2s ease",
                                fontSize: "12px",
                            }}
                        >
                            ▼
                        </span>
                    </button>
                    {openIndex === i && (
                        <div
                            style={{
                                padding: "14px 16px",
                                fontSize: "14px",
                                color: "#4b5563",
                                lineHeight: "1.6",
                                backgroundColor: "#fafafa",
                                borderBottom: "1px solid #e2e8f0",
                            }}
                        >
                            {item.body}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
