import { useState } from 'react'
import PageEditor, { SubPage } from '@/features/page-builder/editor/PuckEditor';
import PageRenderer from '@/features/page-builder/renderer/PageRenderer';
import { dashboardTemplate, templates } from '@/features/page-builder/templates';

/**
 * Root App Component
 *
 * Supports three modes:
 * 1. "pick" — Template picker (start blank or from a pre-built template)
 * 2. "edit" — Puck editor with the selected template data
 * 3. "view" — Published page renderer
 */
function App() {
  const [pageData, setPageData] = useState<any>({ content: [] });
  const [allPages, setAllPages] = useState<SubPage[]>([]);
  const [rootData, setRootData] = useState<any>(null);
  const [mode, setMode] = useState<"pick" | "edit" | "view">("pick");

  const handleNavigate = (pageId: string) => {
    console.log("Navigating to:", pageId);

    if (pageId === "root" || !pageId) {
      if (rootData) setPageData(rootData);
      return;
    }

    const page = allPages.find(p => p.id === pageId);
    if (page) {
      try {
        const content = JSON.parse(page.content);
        setPageData(content);
      } catch (e) { console.error("Failed to parse page content", e); }
    }
  };

  // ----- Template picker -----
  if (mode === "pick") {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
          padding: "40px 20px",
        }}
      >
        <h1
          style={{
            color: "#f8fafc",
            fontSize: "2.2rem",
            fontWeight: 700,
            marginBottom: "8px",
            letterSpacing: "-0.02em",
          }}
        >
          Choose a Template
        </h1>
        <p
          style={{
            color: "#94a3b8",
            fontSize: "1rem",
            marginBottom: "48px",
          }}
        >
          Start from scratch or pick a pre-built layout
        </p>

        <div
          style={{
            display: "flex",
            gap: "24px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {/* Blank template card */}
          <button
            onClick={() => {
              setPageData({ content: [] });
              setMode("edit");
            }}
            style={{
              width: "260px",
              minHeight: "200px",
              background: "rgba(255,255,255,0.04)",
              border: "2px dashed #475569",
              borderRadius: "16px",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              transition: "all 0.25s ease",
              padding: "32px 20px",
              color: "#cbd5e1",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#f59e0b";
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(245,158,11,0.06)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#475569";
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.04)";
            }}
          >
            <span style={{ fontSize: "48px" }}>➕</span>
            <span style={{ fontSize: "18px", fontWeight: 600 }}>Blank Page</span>
            <span style={{ fontSize: "13px", color: "#64748b" }}>
              Start from an empty canvas
            </span>
          </button>

          {/* Pre-built templates */}
          {templates.map((tpl) => (
            <button
              key={tpl.name}
              onClick={() => {
                // Map template name to data
                if (tpl.name === "Dashboard") {
                  setPageData(dashboardTemplate);
                }
                setMode("edit");
              }}
              style={{
                width: "260px",
                minHeight: "200px",
                background: "rgba(255,255,255,0.06)",
                border: "2px solid #334155",
                borderRadius: "16px",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                transition: "all 0.25s ease",
                padding: "32px 20px",
                color: "#e2e8f0",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#f59e0b";
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(245,158,11,0.08)";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#334155";
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.06)";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
              }}
            >
              <span style={{ fontSize: "48px" }}>{tpl.thumbnail}</span>
              <span style={{ fontSize: "18px", fontWeight: 600 }}>{tpl.name}</span>
              <span
                style={{
                  fontSize: "13px",
                  color: "#94a3b8",
                  textAlign: "center",
                  lineHeight: 1.4,
                }}
              >
                {tpl.description}
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ----- Editor mode -----
  if (mode === "edit") {
    return (
      <PageEditor
        initialData={pageData}
        onPublish={(data, pages, rootContent) => {
          setPageData(data); // Start preview with what we were just editing
          if (pages) setAllPages(pages);
          // If rootContent provided, use it. If not provided (single page edit), assume data is root.
          setRootData(rootContent || data);
          setMode("view");
        }}
      />
    );
  }

  // ----- View / Preview mode -----
  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
        <button
          onClick={() => setMode("edit")}
          style={{
            padding: "8px 20px",
            background: "#1e293b",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          ← Back to Editor
        </button>
        <button
          onClick={() => setMode("pick")}
          style={{
            padding: "8px 20px",
            background: "#f59e0b",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          New Page
        </button>
      </div>
      <PageRenderer data={pageData} onNavigate={handleNavigate} />
    </div>
  );
}

export default App
