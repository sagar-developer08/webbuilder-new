import { useState } from 'react'
import PageEditor, { SubPage } from '@/features/page-builder/editor/PuckEditor';
import PageRenderer from '@/features/page-builder/renderer/PageRenderer';
import { dashboardTemplate, templates } from '@/features/page-builder/templates';
import { config as appConfig } from "@/config";
import { useEffect } from 'react';
import { useAuth } from '@/features/auth/AuthContext';
import AuthModal from '@/features/auth/components/AuthModal';
import DataManager from '@/features/data-manager/DataManager';

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
  const [mode, setMode] = useState<"pick" | "edit" | "view" | "data">("pick");
  const [sites, setSites] = useState<any[]>([]);
  const [selectedSiteId, setSelectedSiteId] = useState<string | null>(null);

  const { user, token, isLoading, logout } = useAuth();

  useEffect(() => {
    if (!token) return;

    fetch(`${appConfig.apiUrl}/sites`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSites(data.sites);
        }
      })
      .catch((err) => console.error("Failed to load sites", err));
  }, [token, mode]); // Add mode dependency to refresh sites when returning to picker

  const handleNavigate = (pageId: string) => {
    console.log("Navigating to:", pageId);

    if (pageId === "root" || !pageId) {
      console.log("Navigating to root, using rootData:", rootData);
      if (rootData) {
        setPageData(rootData);
      } else {
        // Fallback if rootData is somehow missing
        console.warn("No root data found, staying on current page or might be broken.");
      }
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

  if (isLoading) {
    return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc" }}>Loading...</div>;
  }

  if (!user) {
    return <AuthModal />;
  }

  // ----- Template picker -----
  if (mode === "pick") {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#f8fafc",
          fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
          padding: "60px 20px",
        }}
      >
        <div style={{ width: "100%", maxWidth: "1000px", display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", background: "#fff", padding: "8px 16px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
            <button
              onClick={() => setMode("data")}
              style={{ background: "#f0f9ff", border: "1px solid #bae6fd", color: "#0369a1", fontSize: "13px", cursor: "pointer", padding: "5px 12px", borderRadius: "6px", fontWeight: 500, display: "flex", alignItems: "center", gap: "4px" }}
            >
              ⚡ Data Manager
            </button>
            <span style={{ fontSize: "14px", fontWeight: 500, color: "#334155" }}>{user.name || user.email}</span>
            <button
              onClick={logout}
              style={{ background: "none", border: "none", color: "#ef4444", fontSize: "14px", cursor: "pointer", padding: "4px 8px" }}
            >
              Logout
            </button>
          </div>
        </div>

        <div style={{ maxWidth: "1000px", margin: "0 auto", width: "100%" }}>
          <h1
            style={{
              color: "#0f172a",
              fontSize: "24px",
              fontWeight: 600,
              marginBottom: "8px",
            }}
          >
            Start a New Project
          </h1>
          <p
            style={{
              color: "#64748b",
              fontSize: "15px",
              marginBottom: "24px",
            }}
          >
            Choose a template to start from scratch or pick a pre-built layout
          </p>

          <div
            style={{
              display: "flex",
              gap: "20px",
              overflowX: "auto",
              paddingBottom: "24px",
              marginBottom: "32px",
            }}
          >
            {/* Blank template card */}
            <button
              onClick={() => {
                setPageData({ content: [] });
                setMode("edit");
              }}
              style={{
                flex: "0 0 220px",
                height: "160px",
                background: "#fff",
                border: "2px dashed #cbd5e1",
                borderRadius: "12px",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                transition: "all 0.2s ease",
                padding: "20px",
                color: "#64748b",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#94a3b8";
                (e.currentTarget as HTMLButtonElement).style.background = "#f1f5f9";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#cbd5e1";
                (e.currentTarget as HTMLButtonElement).style.background = "#fff";
              }}
            >
              <span style={{ fontSize: "32px" }}>➕</span>
              <span style={{ fontSize: "16px", fontWeight: 600, color: "#0f172a" }}>Blank Canvas</span>
            </button>

            {/* Pre-built templates */}
            {templates.map((tpl) => (
              <button
                key={tpl.name}
                onClick={() => {
                  if (tpl.name === "Dashboard") {
                    setPageData(dashboardTemplate);
                  }
                  setMode("edit");
                }}
                style={{
                  flex: "0 0 220px",
                  height: "160px",
                  background: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "12px",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                  transition: "all 0.2s ease",
                  padding: "20px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "#cbd5e1";
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 6px rgba(0,0,0,0.05)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "#e2e8f0";
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 1px 3px rgba(0,0,0,0.05)";
                }}
              >
                <span style={{ fontSize: "32px" }}>{tpl.thumbnail}</span>
                <span style={{ fontSize: "16px", fontWeight: 600, color: "#0f172a" }}>{tpl.name}</span>
                <span style={{ fontSize: "13px", color: "#64748b", textAlign: "center", lineHeight: 1.4 }}>
                  {tpl.description}
                </span>
              </button>
            ))}
          </div>

          <h2
            style={{
              color: "#0f172a",
              fontSize: "20px",
              fontWeight: 600,
              marginBottom: "16px",
            }}
          >
            Your Sites
          </h2>

          <div
            style={{
              background: "#fff",
              borderRadius: "12px",
              border: "1px solid #e2e8f0",
              overflow: "hidden",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
          >
            {sites.length === 0 ? (
              <div style={{ padding: "40px", textAlign: "center", color: "#94a3b8", fontSize: "15px" }}>
                You haven't created any sites yet. Start a new project above!
              </div>
            ) : (
              sites.map((site, index) => (
                <div
                  key={site.id}
                  onClick={() => {
                    setSelectedSiteId(site.id);
                    setMode("edit");
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "20px 24px",
                    borderBottom: index < sites.length - 1 ? "1px solid #e2e8f0" : "none",
                    cursor: "pointer",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#f1f5f9")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: "#e0f2fe", color: "#0369a1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>
                      🌐
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: "#0f172a", fontSize: "16px", marginBottom: "4px" }}>
                        {site.title || "Untitled Site"}
                      </div>
                      <div style={{ color: "#64748b", fontSize: "14px" }}>
                        {site.subdomain}
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      color: "#3b82f6",
                      fontSize: "14px",
                      fontWeight: 500,
                      display: "flex",
                      alignItems: "center",
                      gap: "4px"
                    }}
                  >
                    Edit Site
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }

  // ----- Data Manager mode -----
  if (mode === "data") {
    return <DataManager onBack={() => setMode("pick")} />;
  }

  // ----- Editor mode -----
  if (mode === "edit") {
    return (
      <PageEditor
        initialData={pageData}
        initialSiteId={selectedSiteId}
        onPublish={(data, pages, rootContent) => {
          // If we are editing a subpage, 'data' is the subpage content.
          // If we are editing root, 'data' is root content.
          // rootContent argument comes from PuckEditor which knows the full state.

          setPageData(data); // Start preview with what we were just editing
          if (pages) setAllPages(pages);

          // CRITICAL: Ensure rootData is set correctly. 
          // If rootContent is passed (always now), use it.
          if (rootContent) {
            setRootData(rootContent);
          } else {
            // Fallback: If no rootContent passed, assume current data is root (single page mode)
            setRootData(data);
          }

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
