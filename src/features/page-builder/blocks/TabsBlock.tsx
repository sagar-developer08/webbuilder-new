import { useState } from "react";

export const TabsBlock = {
    fields: {
        tabLabels: { type: "text" },
        tabContents: { type: "textarea" },
        padding: { type: "text" },
        margin: { type: "text" },
        backgroundColor: { type: "text" },
    },

    defaultProps: {
        tabLabels: "Overview, Features, Pricing",
        tabContents: "This is the overview tab content.\nThese are the features of the product.\nPricing starts at $9.99/month.",
        padding: "0px",
        margin: "0px",
        backgroundColor: "transparent",
    },

    render: (props: any) => {
        const labels = (props.tabLabels || "")
            .split(",")
            .map((l: string) => l.trim())
            .filter((l: string) => l.length > 0);

        const contents = (props.tabContents || "")
            .split("\n")
            .map((c: string) => c.trim());

        return <TabsRenderer labels={labels} contents={contents} padding={props.padding} margin={props.margin} backgroundColor={props.backgroundColor} />;
    },
};

function TabsRenderer({ labels, contents, padding, margin, backgroundColor }: { labels: string[]; contents: string[]; padding?: string; margin?: string; backgroundColor?: string }) {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div style={{ margin: margin ?? "16px 0", padding: padding }}>
            <div
                style={{
                    display: "flex",
                    borderBottom: "2px solid #e2e8f0",
                    gap: "0",
                }}
            >
                {labels.map((label, i) => (
                    <button
                        key={i}
                        onClick={() => setActiveTab(i)}
                        style={{
                            padding: "10px 20px",
                            border: "none",
                            borderBottom: activeTab === i ? "2px solid #2563eb" : "2px solid transparent",
                            backgroundColor: backgroundColor ?? "transparent",
                            color: activeTab === i ? "#2563eb" : "#64748b",
                            fontWeight: activeTab === i ? 600 : 400,
                            fontSize: "14px",
                            cursor: "pointer",
                            marginBottom: "-2px",
                            transition: "all 0.2s ease",
                        }}
                    >
                        {label}
                    </button>
                ))}
            </div>
            <div
                style={{
                    padding: "20px 16px",
                    fontSize: "14px",
                    color: "#4b5563",
                    lineHeight: "1.6",
                }}
            >
                {contents[activeTab] || ""}
            </div>
        </div>
    );
}
