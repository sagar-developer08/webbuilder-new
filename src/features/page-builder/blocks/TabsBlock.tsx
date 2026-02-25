import { useState } from "react";

export const TabsBlock = {
    fields: {
        tabLabels: { type: "text" },
        tabContents: { type: "textarea" },
    },

    defaultProps: {
        tabLabels: "Overview, Features, Pricing",
        tabContents: "This is the overview tab content.\nThese are the features of the product.\nPricing starts at $9.99/month.",
    },

    render: (props: any) => {
        const labels = (props.tabLabels || "")
            .split(",")
            .map((l: string) => l.trim())
            .filter((l: string) => l.length > 0);

        const contents = (props.tabContents || "")
            .split("\n")
            .map((c: string) => c.trim());

        return <TabsRenderer labels={labels} contents={contents} />;
    },
};

function TabsRenderer({ labels, contents }: { labels: string[]; contents: string[] }) {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div style={{ margin: "16px 0" }}>
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
                            backgroundColor: "transparent",
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
