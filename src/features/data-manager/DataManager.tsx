import { useState, useEffect } from "react";
import { config as appConfig } from "@/config";
import savedApiService, { SavedApiItem } from "@/shared/services/savedApi.service";
import connectionService, { ConnectionItem } from "@/shared/services/connection.service";

interface DataManagerProps {
    onBack: () => void;
}

export default function DataManager({ onBack }: DataManagerProps) {
    const [tab, setTab] = useState<"connections" | "apis">("connections");

    // ── Connection state ──
    const [connections, setConnections] = useState<ConnectionItem[]>([]);
    const [showConnForm, setShowConnForm] = useState(false);
    const [connForm, setConnForm] = useState({ name: "", host: "localhost", port: "27017", username: "", password: "", authDb: "admin", connectionString: "" });
    const [connLoading, setConnLoading] = useState(false);
    const [testResult, setTestResult] = useState<{ id: string; ok: boolean } | null>(null);

    // ── Saved API state ──
    const [apis, setApis] = useState<SavedApiItem[]>([]);
    const [showApiForm, setShowApiForm] = useState(false);
    const [apiForm, setApiForm] = useState({ apiName: "", method: "POST", connectionId: "", dbName: "", collectionName: "", columns: "", description: "" });
    const [apiLoading, setApiLoading] = useState(false);

    const token = localStorage.getItem("framely_token");

    // ── Fetch data ──
    useEffect(() => {
        loadConnections();
        loadApis();
    }, []);

    async function loadConnections() {
        try {
            const data = await connectionService.list();
            setConnections(data);
        } catch { /* silent */ }
    }

    async function loadApis() {
        try {
            const data = await savedApiService.list();
            setApis(data);
        } catch { /* silent */ }
    }

    // ── Create connection ──
    async function handleCreateConnection() {
        setConnLoading(true);
        try {
            await connectionService.create({
                name: connForm.name,
                host: connForm.host,
                port: parseInt(connForm.port) || 27017,
                username: connForm.username || undefined,
                password: connForm.password || undefined,
                authDb: connForm.authDb || "admin",
                connectionString: connForm.connectionString || undefined,
            });
            setShowConnForm(false);
            setConnForm({ name: "", host: "localhost", port: "27017", username: "", password: "", authDb: "admin", connectionString: "" });
            loadConnections();
        } catch (e: any) {
            alert("Failed: " + (e.message || "Unknown error"));
        } finally {
            setConnLoading(false);
        }
    }

    // ── Test connection ──
    async function handleTestConnection(id: string) {
        setTestResult(null);
        try {
            const ok = await connectionService.test(id);
            setTestResult({ id, ok });
        } catch {
            setTestResult({ id, ok: false });
        }
    }

    // ── Delete connection ──
    async function handleDeleteConnection(id: string) {
        if (!confirm("Delete this connection?")) return;
        try {
            await fetch(`${appConfig.apiUrl}/connections/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            loadConnections();
        } catch { /* silent */ }
    }

    // ── Create saved API ──
    async function handleCreateApi() {
        setApiLoading(true);
        try {
            await savedApiService.create({
                apiName: apiForm.apiName,
                method: apiForm.method,
                connectionId: apiForm.connectionId,
                dbName: apiForm.dbName,
                collectionName: apiForm.collectionName,
                columns: apiForm.columns ? apiForm.columns.split(",").map((c) => c.trim()) : [],
                description: apiForm.description || undefined,
            });
            setShowApiForm(false);
            setApiForm({ apiName: "", method: "POST", connectionId: "", dbName: "", collectionName: "", columns: "", description: "" });
            loadApis();
        } catch (e: any) {
            alert("Failed: " + (e.message || "Unknown error"));
        } finally {
            setApiLoading(false);
        }
    }

    // ── Delete saved API ──
    async function handleDeleteApi(id: string) {
        if (!confirm("Delete this saved API?")) return;
        try {
            await fetch(`${appConfig.apiUrl}/saved-apis/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            });
            loadApis();
        } catch { /* silent */ }
    }

    // ── Copy ID ──
    function copyToClipboard(text: string) {
        navigator.clipboard.writeText(text);
    }

    // ── Styles ──
    const s = {
        page: { minHeight: "100vh", background: "#f8fafc", fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", padding: "40px 20px" } as React.CSSProperties,
        container: { maxWidth: "960px", margin: "0 auto", width: "100%" } as React.CSSProperties,
        header: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px" } as React.CSSProperties,
        backBtn: { background: "none", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "8px 16px", cursor: "pointer", fontSize: "14px", color: "#334155", display: "flex", alignItems: "center", gap: "6px" } as React.CSSProperties,
        title: { fontSize: "24px", fontWeight: 600, color: "#0f172a", margin: 0 } as React.CSSProperties,
        subtitle: { fontSize: "14px", color: "#64748b", marginTop: "4px" } as React.CSSProperties,
        tabs: { display: "flex", gap: "4px", background: "#e2e8f0", borderRadius: "10px", padding: "4px", marginBottom: "24px", width: "fit-content" } as React.CSSProperties,
        tab: (active: boolean) => ({
            padding: "8px 20px", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "14px", fontWeight: 500,
            background: active ? "#fff" : "transparent",
            color: active ? "#0f172a" : "#64748b",
            boxShadow: active ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
            transition: "all 0.2s",
        }) as React.CSSProperties,
        card: { background: "#fff", borderRadius: "12px", border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", marginBottom: "16px" } as React.CSSProperties,
        cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderBottom: "1px solid #f1f5f9" } as React.CSSProperties,
        addBtn: { background: "#3b82f6", color: "#fff", border: "none", borderRadius: "8px", padding: "8px 16px", cursor: "pointer", fontSize: "14px", fontWeight: 500, display: "flex", alignItems: "center", gap: "6px" } as React.CSSProperties,
        row: (isLast: boolean) => ({
            display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px",
            borderBottom: isLast ? "none" : "1px solid #f1f5f9",
        }) as React.CSSProperties,
        label: { fontWeight: 500, color: "#0f172a", fontSize: "14px" } as React.CSSProperties,
        meta: { fontSize: "12px", color: "#94a3b8", marginTop: "2px" } as React.CSSProperties,
        badge: (color: string) => ({
            padding: "2px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: 600,
            background: color + "15", color: color, letterSpacing: "0.5px",
        }) as React.CSSProperties,
        iconBtn: (color: string) => ({
            background: "none", border: "none", cursor: "pointer", padding: "4px 8px",
            fontSize: "13px", color, borderRadius: "4px",
        }) as React.CSSProperties,
        formOverlay: { position: "fixed" as const, inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999 } as React.CSSProperties,
        formModal: { background: "#fff", borderRadius: "16px", padding: "28px", width: "480px", maxWidth: "90vw", boxShadow: "0 20px 60px rgba(0,0,0,0.15)" } as React.CSSProperties,
        formTitle: { fontSize: "18px", fontWeight: 600, color: "#0f172a", marginBottom: "20px" } as React.CSSProperties,
        inputGroup: { marginBottom: "14px" } as React.CSSProperties,
        inputLabel: { display: "block", fontSize: "13px", fontWeight: 500, color: "#334155", marginBottom: "5px" } as React.CSSProperties,
        input: { width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "14px", outline: "none", boxSizing: "border-box" as const, transition: "border 0.2s" } as React.CSSProperties,
        select: { width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "14px", outline: "none", background: "#fff", boxSizing: "border-box" as const } as React.CSSProperties,
        formActions: { display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "20px" } as React.CSSProperties,
        cancelBtn: { padding: "8px 16px", borderRadius: "8px", border: "1px solid #e2e8f0", background: "#fff", cursor: "pointer", fontSize: "14px", color: "#64748b" } as React.CSSProperties,
        submitBtn: (disabled: boolean) => ({
            padding: "8px 20px", borderRadius: "8px", border: "none", background: disabled ? "#94a3b8" : "#3b82f6", color: "#fff", cursor: disabled ? "default" : "pointer", fontSize: "14px", fontWeight: 500,
        }) as React.CSSProperties,
        empty: { padding: "40px", textAlign: "center" as const, color: "#94a3b8", fontSize: "14px" } as React.CSSProperties,
        idBox: { display: "inline-flex", alignItems: "center", gap: "4px", background: "#f1f5f9", padding: "2px 8px", borderRadius: "4px", fontSize: "11px", fontFamily: "monospace", color: "#64748b", cursor: "pointer" } as React.CSSProperties,
    };

    const methodColors: Record<string, string> = { GET: "#10b981", POST: "#3b82f6", PUT: "#f59e0b", DELETE: "#ef4444" };

    return (
        <div style={s.page}>
            <div style={s.container}>
                {/* Header */}
                <div style={s.header}>
                    <div>
                        <button onClick={onBack} style={s.backBtn}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                            Back to Sites
                        </button>
                    </div>
                    <div style={{ textAlign: "right" }}>
                        <h1 style={s.title}>Data Manager</h1>
                        <p style={s.subtitle}>Manage database connections & dynamic APIs</p>
                    </div>
                </div>

                {/* Tabs */}
                <div style={s.tabs}>
                    <button style={s.tab(tab === "connections")} onClick={() => setTab("connections")}>🔗 Connections</button>
                    <button style={s.tab(tab === "apis")} onClick={() => setTab("apis")}>⚡ Saved APIs</button>
                </div>

                {/* ── Connections Tab ── */}
                {tab === "connections" && (
                    <div style={s.card}>
                        <div style={s.cardHeader}>
                            <span style={{ fontSize: "15px", fontWeight: 600, color: "#0f172a" }}>Database Connections</span>
                            <button onClick={() => setShowConnForm(true)} style={s.addBtn}>+ Add Connection</button>
                        </div>
                        {connections.length === 0 ? (
                            <div style={s.empty}>No connections yet. Add one to get started!</div>
                        ) : (
                            connections.map((conn, i) => (
                                <div key={conn.id} style={s.row(i === connections.length - 1)}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                        <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "#ecfdf5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>🗄️</div>
                                        <div>
                                            <div style={s.label}>{conn.name}</div>
                                            <div style={s.meta}>{conn.host}:{conn.port} • {conn.type}</div>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                        <span
                                            style={s.idBox}
                                            title="Click to copy ID"
                                            onClick={() => copyToClipboard(conn.id)}
                                        >
                                            {conn.id.slice(0, 12)}… 📋
                                        </span>
                                        {testResult?.id === conn.id && (
                                            <span style={{ fontSize: "12px", color: testResult.ok ? "#10b981" : "#ef4444", fontWeight: 500 }}>
                                                {testResult.ok ? "✓ Connected" : "✗ Failed"}
                                            </span>
                                        )}
                                        <button onClick={() => handleTestConnection(conn.id)} style={s.iconBtn("#3b82f6")}>Test</button>
                                        <button onClick={() => handleDeleteConnection(conn.id)} style={s.iconBtn("#ef4444")}>Delete</button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {/* ── Saved APIs Tab ── */}
                {tab === "apis" && (
                    <div style={s.card}>
                        <div style={s.cardHeader}>
                            <span style={{ fontSize: "15px", fontWeight: 600, color: "#0f172a" }}>Saved APIs</span>
                            <button onClick={() => setShowApiForm(true)} style={s.addBtn}>+ Create API</button>
                        </div>
                        {apis.length === 0 ? (
                            <div style={s.empty}>No saved APIs yet. Create one to power your dynamic blocks!</div>
                        ) : (
                            apis.map((api, i) => (
                                <div key={api.id} style={s.row(i === apis.length - 1)}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                        <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>⚡</div>
                                        <div>
                                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                                <span style={s.label}>{api.apiName}</span>
                                                <span style={s.badge(methodColors[api.method] || "#64748b")}>{api.method}</span>
                                            </div>
                                            <div style={s.meta}>
                                                {api.dbName}.{api.collectionName}
                                                {api.connection && <> • via <strong>{api.connection.name}</strong></>}
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                        <span
                                            style={s.idBox}
                                            title="Click to copy ID — paste this into your Puck block settings"
                                            onClick={() => copyToClipboard(api.id)}
                                        >
                                            {api.id.slice(0, 12)}… 📋
                                        </span>
                                        <button onClick={() => handleDeleteApi(api.id)} style={s.iconBtn("#ef4444")}>Delete</button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {/* Info box */}
                {tab === "apis" && (
                    <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "10px", padding: "16px 20px", fontSize: "13px", color: "#1e40af", lineHeight: 1.6 }}>
                        <strong>How to use:</strong> Copy an API's ID → open the Puck Editor → select a Form, DynamicTable, or DynamicChart block → paste the ID in its "Saved API ID" setting.
                        <br />
                        <strong>POST APIs</strong> are for form submissions. <strong>GET APIs</strong> are for tables & charts.
                    </div>
                )}
            </div>

            {/* ── Connection Form Modal ── */}
            {showConnForm && (
                <div style={s.formOverlay} onClick={() => setShowConnForm(false)}>
                    <div style={s.formModal} onClick={(e) => e.stopPropagation()}>
                        <div style={s.formTitle}>Add Database Connection</div>
                        <div style={s.inputGroup}>
                            <label style={s.inputLabel}>Connection Name *</label>
                            <input style={s.input} placeholder="My MongoDB" value={connForm.name} onChange={(e) => setConnForm({ ...connForm, name: e.target.value })} />
                        </div>
                        <div style={{ display: "flex", gap: "12px" }}>
                            <div style={{ ...s.inputGroup, flex: 2 }}>
                                <label style={s.inputLabel}>Host *</label>
                                <input style={s.input} placeholder="localhost" value={connForm.host} onChange={(e) => setConnForm({ ...connForm, host: e.target.value })} />
                            </div>
                            <div style={{ ...s.inputGroup, flex: 1 }}>
                                <label style={s.inputLabel}>Port</label>
                                <input style={s.input} placeholder="27017" value={connForm.port} onChange={(e) => setConnForm({ ...connForm, port: e.target.value })} />
                            </div>
                        </div>
                        <div style={{ display: "flex", gap: "12px" }}>
                            <div style={{ ...s.inputGroup, flex: 1 }}>
                                <label style={s.inputLabel}>Username</label>
                                <input style={s.input} placeholder="admin" value={connForm.username} onChange={(e) => setConnForm({ ...connForm, username: e.target.value })} />
                            </div>
                            <div style={{ ...s.inputGroup, flex: 1 }}>
                                <label style={s.inputLabel}>Password</label>
                                <input style={s.input} type="password" placeholder="••••••" value={connForm.password} onChange={(e) => setConnForm({ ...connForm, password: e.target.value })} />
                            </div>
                        </div>
                        <div style={s.inputGroup}>
                            <label style={s.inputLabel}>Auth Database</label>
                            <input style={s.input} placeholder="admin" value={connForm.authDb} onChange={(e) => setConnForm({ ...connForm, authDb: e.target.value })} />
                        </div>
                        <div style={s.inputGroup}>
                            <label style={s.inputLabel}>Or Connection String (overrides above)</label>
                            <input style={s.input} placeholder="mongodb://user:pass@host:port/db" value={connForm.connectionString} onChange={(e) => setConnForm({ ...connForm, connectionString: e.target.value })} />
                        </div>
                        <div style={s.formActions}>
                            <button style={s.cancelBtn} onClick={() => setShowConnForm(false)}>Cancel</button>
                            <button style={s.submitBtn(!connForm.name || (!connForm.host && !connForm.connectionString))} disabled={!connForm.name || (!connForm.host && !connForm.connectionString)} onClick={handleCreateConnection}>
                                {connLoading ? "Creating..." : "Create Connection"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Saved API Form Modal ── */}
            {showApiForm && (
                <div style={s.formOverlay} onClick={() => setShowApiForm(false)}>
                    <div style={s.formModal} onClick={(e) => e.stopPropagation()}>
                        <div style={s.formTitle}>Create Saved API</div>
                        <div style={s.inputGroup}>
                            <label style={s.inputLabel}>API Name *</label>
                            <input style={s.input} placeholder="Contact Form Submissions" value={apiForm.apiName} onChange={(e) => setApiForm({ ...apiForm, apiName: e.target.value })} />
                        </div>
                        <div style={{ display: "flex", gap: "12px" }}>
                            <div style={{ ...s.inputGroup, flex: 1 }}>
                                <label style={s.inputLabel}>Method *</label>
                                <select style={s.select} value={apiForm.method} onChange={(e) => setApiForm({ ...apiForm, method: e.target.value })}>
                                    <option value="GET">GET — Fetch data (Tables, Charts)</option>
                                    <option value="POST">POST — Insert data (Forms)</option>
                                    <option value="PUT">PUT — Update data</option>
                                    <option value="DELETE">DELETE — Remove data</option>
                                </select>
                            </div>
                            <div style={{ ...s.inputGroup, flex: 1 }}>
                                <label style={s.inputLabel}>Connection *</label>
                                <select style={s.select} value={apiForm.connectionId} onChange={(e) => setApiForm({ ...apiForm, connectionId: e.target.value })}>
                                    <option value="">Select a connection...</option>
                                    {connections.map((c) => (
                                        <option key={c.id} value={c.id}>{c.name} ({c.host})</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div style={{ display: "flex", gap: "12px" }}>
                            <div style={{ ...s.inputGroup, flex: 1 }}>
                                <label style={s.inputLabel}>Database Name *</label>
                                <input style={s.input} placeholder="my_database" value={apiForm.dbName} onChange={(e) => setApiForm({ ...apiForm, dbName: e.target.value })} />
                            </div>
                            <div style={{ ...s.inputGroup, flex: 1 }}>
                                <label style={s.inputLabel}>Collection Name *</label>
                                <input style={s.input} placeholder="contacts" value={apiForm.collectionName} onChange={(e) => setApiForm({ ...apiForm, collectionName: e.target.value })} />
                            </div>
                        </div>
                        <div style={s.inputGroup}>
                            <label style={s.inputLabel}>Columns (comma-separated, for GET projections)</label>
                            <input style={s.input} placeholder="name, email, message, createdAt" value={apiForm.columns} onChange={(e) => setApiForm({ ...apiForm, columns: e.target.value })} />
                        </div>
                        <div style={s.inputGroup}>
                            <label style={s.inputLabel}>Description</label>
                            <input style={s.input} placeholder="Handles contact form submissions" value={apiForm.description} onChange={(e) => setApiForm({ ...apiForm, description: e.target.value })} />
                        </div>
                        <div style={s.formActions}>
                            <button style={s.cancelBtn} onClick={() => setShowApiForm(false)}>Cancel</button>
                            <button
                                style={s.submitBtn(!apiForm.apiName || !apiForm.connectionId || !apiForm.dbName || !apiForm.collectionName)}
                                disabled={!apiForm.apiName || !apiForm.connectionId || !apiForm.dbName || !apiForm.collectionName}
                                onClick={handleCreateApi}
                            >
                                {apiLoading ? "Creating..." : "Create API"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
