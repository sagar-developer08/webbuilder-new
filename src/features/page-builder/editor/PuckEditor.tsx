import { Data, Puck, usePuck } from "@puckeditor/core";
import "@puckeditor/core/dist/index.css";
import { useEffect, useState } from "react";
import { Button } from "../../../ui/button";
import { config as appConfig } from "../../../config";
import { config as puckConfig } from "../config/puckConfig";

interface Props {
  onPublish: (data: Data, pages?: SubPage[], rootContent?: Data) => void;
  initialData?: Data & { id?: string; title?: string; subdomain?: string };
}

// Sub-page interface
export interface SubPage {
  id: string; // Unique ID
  slug: string; // URL slug
  title: string;
  content: string; // Serialized JSON of Data
}

function SaveHeader({ onSave, onPublish, pages, rootContent }: { onSave: (data: Data) => void; onPublish: (data: Data, pages?: SubPage[], rootContent?: Data) => void; pages: SubPage[]; rootContent?: Data }) {
  const { appState } = usePuck();

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <Button variant="outline" onClick={() => onSave(appState.data)}>
        Save
      </Button>
      <Button onClick={() => onPublish(appState.data, pages, rootContent)}>
        Publish
      </Button>
    </div>
  );
}

export default function PageEditor({ onPublish, initialData }: Props) {
  // State for all saved sites list
  const [sites, setSites] = useState<any[]>([]);

  // State for current site
  const [currentSiteId, setCurrentSiteId] = useState<string | null>(
    (initialData as any)?.id || null
  );
  const [currentSiteMeta, setCurrentSiteMeta] = useState<{ title?: string; subdomain?: string }>({
    title: (initialData as any)?.title,
    subdomain: (initialData as any)?.subdomain,
  });

  // State for multi-page support
  const [pages, setPages] = useState<SubPage[]>([]);
  const [activePageId, setActivePageId] = useState<string>("root"); // "root" or sub-page ID

  // Editor data state
  const [rootContent, setRootContent] = useState<Data>(initialData ?? { content: [], root: {} });
  // We need to keep sync of what is currently in Puck vs what is in our state to switch pages without losing data
  // Puck controls its own state, but we can feed it via `data` prop.
  // However, `data` prop only sets INITIAL data. To update it, we need to force re-render (key change).
  const [puckKey, setPuckKey] = useState<string>("initial-root");
  const [currentPuckData, setCurrentPuckData] = useState<Data>(initialData ?? { content: [], root: {} });

  // Dynamic config for PageLink
  const [editorConfig, setEditorConfig] = useState(puckConfig);

  // Update config when pages change
  useEffect(() => {
    const pageOptions = [
      { label: "Home", value: "root" },
      ...pages.map(p => ({ label: p.title, value: p.id }))
    ];

    // Deep clone config or just update the reference carefully
    const newConfig = {
      ...puckConfig,
      components: {
        ...puckConfig.components,
        PageLink: {
          ...puckConfig.components.PageLink,
          fields: {
            ...puckConfig.components.PageLink.fields,
            pageId: {
              type: "select" as const,
              options: pageOptions
            }
          }
        },
        Navbar: {
          ...puckConfig.components.Navbar, // Ensure Navbar is in config
          fields: {
            ...puckConfig.components.Navbar?.fields,
            links: {
              ...puckConfig.components.Navbar?.fields.links,
              type: "array", // TypeScript might need this re-asserted if lost
              arrayFields: {
                //@ts-ignore - TS might complain about deep access
                ...puckConfig.components.Navbar?.fields.links.arrayFields,
                pageId: {
                  type: "select",
                  options: pageOptions
                }
              }
            }
          }
        }
      }
    };
    setEditorConfig(newConfig as any);
  }, [pages]);

  // Initial fetch of sites
  useEffect(() => {
    fetchSites();
  }, []);

  const fetchSites = () => {
    fetch(`${appConfig.apiUrl}/sites`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSites(data.sites);
        }
      })
      .catch((err) => console.error("Failed to load sites", err));
  };

  // Helper to switch pages
  const switchPage = (targetPageId: string) => {
    // 1. Save current puck state of previous page
    if (activePageId === "root") {
      setRootContent(currentPuckData);
    } else {
      setPages(prev => prev.map(p => p.id === activePageId ? { ...p, content: JSON.stringify(currentPuckData) } : p));
    }

    // 2. Load new data
    let nextData: Data = { content: [], root: {} };
    if (targetPageId === "root") {
      nextData = rootContent;
    } else {
      const p = pages.find(page => page.id === targetPageId);
      if (p) {
        try {
          nextData = JSON.parse(p.content);
        } catch (e) { console.error("Error parsing page content", e); }
      }
    }

    // 3. Update active ID and force remount
    setActivePageId(targetPageId);
    setCurrentPuckData(nextData); // Set explicit data for the new Key
    setPuckKey(`${targetPageId}-${Date.now()}`); // Force remount
  };

  const handleCreatePage = () => {
    const title = prompt("Page Title (e.g. About Us):");
    if (!title) return;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const newPage: SubPage = {
      id: `page-${Date.now()}`,
      title,
      slug,
      content: '{"content":[], "root":{}}'
    };

    setPages([...pages, newPage]);
    // Optionally switch to it immediately
    if (confirm("Switch to new page?")) {
      // Need to save current state first!
      if (activePageId === "root") {
        setRootContent(currentPuckData);
      } else {
        setPages(prev => prev.map(p => p.id === activePageId ? { ...p, content: JSON.stringify(currentPuckData) } : p));
      }
      // Then add and switch
      // Note: functionality inside setPages callback is cleaner but complex here.
      // We just did setPages above.
      // Let's just create it and let user click it to switch, simpler and safer.
    }
  };

  const handleSave = async (data: Data) => {

    let title = currentSiteMeta.title || "Untitled Site";
    let subdomain = currentSiteMeta.subdomain || `site-${Date.now()}`;

    if (!currentSiteId) {
      const name = window.prompt("Enter a name for your site:", title);
      if (name === null) return;
      title = name || title;
      subdomain = title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + "-" + Date.now().toString().slice(-4);
    }

    // Capture current view's data into the payload structure
    let finalRootContent = rootContent;
    let finalPages = [...pages];

    if (activePageId === "root") {
      finalRootContent = data;
    } else {
      finalPages = pages.map(p => p.id === activePageId ? { ...p, content: JSON.stringify(data) } : p);
      // Also update local state
      setPages(finalPages);
    }
    setRootContent(finalRootContent);

    const payload = {
      title,
      subdomain,
      content: JSON.stringify(finalRootContent),
      pages: finalPages, // Send the sub-pages array
      visible: false,
    };

    let url = `${appConfig.apiUrl}/sites`;
    let method = "POST";

    if (currentSiteId) {
      url = `${appConfig.apiUrl}/sites/${currentSiteId}`;
      method = "PUT";
    }

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        try {
          const errorJson = JSON.parse(errorText);
          alert(`Failed to save: ${errorJson.msg || res.statusText}`);
        } catch {
          alert(`Failed to save: ${res.status} ${res.statusText}`);
        }
        return;
      }

      const json = await res.json();
      if (json.success) {
        alert("Site saved successfully!");
        if (json.site) {
          setCurrentSiteId(json.site.id);
          setCurrentSiteMeta({ title: json.site.title, subdomain: json.site.subdomain });
          fetchSites(); // Refresh list
        }
      } else {
        alert(`Failed to save: ${json.msg}`);
      }
    } catch (e) {
      console.error(e);
      alert("Error saving site");
    }
  };

  const handleLoadSite = async (siteId: string) => {
    if (currentSiteId === siteId) return;
    if (!confirm("Switch to this site? Any unsaved changes will be lost.")) return;

    try {
      const res = await fetch(`${appConfig.apiUrl}/sites/${siteId}`);
      const json = await res.json();
      if (json.success && json.site) {
        const site = json.site;
        setCurrentSiteId(site.id);
        setCurrentSiteMeta({ title: site.title, subdomain: site.subdomain });

        // Load Root Content
        try {
          const content = JSON.parse(site.content || '{"content":[], "root":{}}');
          setRootContent(content);
          setCurrentPuckData(content);
        } catch (e) {
          setRootContent({ content: [], root: {} });
        }

        // Load Pages
        if (site.pages && Array.isArray(site.pages)) {
          setPages(site.pages);
        } else {
          setPages([]);
        }

        // Reset to root page
        setActivePageId("root");
        setPuckKey(`${site.id}-root-${Date.now()}`);
      }
    } catch (e) {
      console.error(e);
      alert("Failed to load site");
    }
  };

  const handleDeleteSite = async (e: React.MouseEvent, siteId: string) => {
    e.stopPropagation(); // Prevent loading the site
    if (!confirm("Are you sure you want to delete this site?")) return;

    try {
      const res = await fetch(`${appConfig.apiUrl}/sites/${siteId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setSites(prev => prev.filter(s => s.id !== siteId));
        if (currentSiteId === siteId) {
          // Reset editor if current site was deleted
          window.location.reload();
        }
      } else {
        alert("Failed to delete site");
      }
    } catch (e) {
      console.error(e);
      alert("Error deleting site");
    }
  };

  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div style={{ display: "flex", width: "100%", height: "100vh" }}>
      {/* Sidebar (Saved Sites + Pages) */}
      <div style={{
        width: sidebarOpen ? "250px" : "0",
        background: "#fff",
        borderRight: sidebarOpen ? "1px solid #e2e8f0" : "none",
        display: "flex",
        flexDirection: "column",
        zIndex: 10,
        height: "100vh",
        transition: "width 0.3s ease",
        overflow: "hidden",
        position: "relative"
      }}>
        {/* Top Half: Saved Sites */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0, borderBottom: "1px solid #e2e8f0", opacity: sidebarOpen ? 1 : 0, transition: "opacity 0.2s" }}>
          <div style={{ padding: "16px", borderBottom: "1px solid #e2e8f0" }}>
            <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 600 }}>Saved Sites</h3>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "12px" }}>
            {sites.map(site => (
              <div
                key={site.id}
                onClick={() => handleLoadSite(site.id)}
                style={{
                  padding: "10px",
                  marginBottom: "8px",
                  borderRadius: "6px",
                  background: site.id === currentSiteId ? "#e0f2fe" : "#f8fafc",
                  border: "1px solid",
                  borderColor: site.id === currentSiteId ? "#bae6fd" : "#e2e8f0",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <div style={{ overflow: "hidden" }}>
                  <div style={{ fontWeight: 500, fontSize: "14px", marginBottom: "4px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {site.title || "Untitled"}
                  </div>
                  <div style={{ fontSize: "12px", color: "#64748b" }}>
                    {site.subdomain}
                  </div>
                </div>
                <button
                  onClick={(e) => handleDeleteSite(e, site.id)}
                  style={{
                    color: "#ef4444",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    marginLeft: "8px",
                    padding: "4px"
                  }}
                  title="Delete Site"
                >
                  ✕
                </button>
              </div>
            ))}
            {sites.length === 0 && <div style={{ color: "#94a3b8", fontSize: "13px", padding: "8px" }}>No saved sites</div>}

            <div style={{ marginTop: "auto", paddingTop: "10px", borderTop: "1px solid #eee" }}>
              <Button
                variant="outline"
                onClick={() => {
                  if (confirm("Create new site? Unsaved changes will be lost.")) {
                    window.location.reload();
                  }
                }}
                style={{ width: "100%" }}
              >
                + Create New Site
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Half: Pages */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
          <div style={{ padding: "16px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 600 }}>Pages</h3>
            <Button size="sm" variant="outline" onClick={handleCreatePage}>+ New</Button>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "12px" }}>
            <div
              onClick={() => switchPage("root")}
              style={{
                padding: "10px",
                marginBottom: "8px",
                borderRadius: "6px",
                background: activePageId === "root" ? "#e0f2fe" : "#f8fafc",
                border: "1px solid",
                borderColor: activePageId === "root" ? "#bae6fd" : "#e2e8f0",
                cursor: "pointer",
              }}
            >
              <div style={{ fontWeight: 500, fontSize: "14px" }}>Home</div>
            </div>
            {pages.map(page => (
              <div
                key={page.id}
                onClick={() => switchPage(page.id)}
                style={{
                  padding: "10px",
                  marginBottom: "8px",
                  borderRadius: "6px",
                  background: activePageId === page.id ? "#e0f2fe" : "#f8fafc",
                  border: "1px solid",
                  borderColor: activePageId === page.id ? "#bae6fd" : "#e2e8f0",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <div style={{ fontWeight: 500, fontSize: "14px" }}>{page.title}</div>
                <div style={{ fontSize: "10px", color: "#64748b" }}>/{page.slug}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Puck Editor */}
      <div style={{ flex: 1, position: "relative" }}>

        {/* Sidebar Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            position: "absolute",
            top: "12px",
            left: "12px",
            zIndex: 100, // Above Puck toolbar
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: "4px",
            width: "32px", height: "32px",
            cursor: "pointer",
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
            display: "flex", alignItems: "center", justifyContent: "center"
          }}
          title={sidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
        >
          {/* Simple Menu Icon */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {sidebarOpen ? (
              <path d="M19 12H5m7-7l-7 7 7 7" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <Puck
          key={puckKey}
          config={editorConfig}
          data={currentPuckData}
          onPublish={onPublish}
          onChange={(newData) => {
            setCurrentPuckData(newData);
          }}
          renderHeaderActions={() => (
            <SaveHeader onSave={handleSave} onPublish={onPublish} pages={pages} rootContent={rootContent} />
          )}
        />
      </div>
    </div>
  );
}

