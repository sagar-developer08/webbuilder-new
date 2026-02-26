import { useState, useEffect } from 'react'
import PageEditor from '@/features/page-builder/editor/PuckEditor'
import PageRenderer from '@/features/page-builder/renderer/PageRenderer'
import { dashboardTemplate, templates } from '@/features/page-builder/templates'
import { LoginPage } from '@/features/auth/pages/LoginPage'
import { STORAGE_KEYS } from '@/shared/constants'
import { useSites, useCreateSite, useSaveSite, useSite } from '@/features/page-builder/hooks/useSites'

type AppMode = 'login' | 'sites' | 'pick' | 'edit' | 'view'

/**
 * Root App Component
 *
 * Flow:
 * 1. "login"  — Login screen (if not authenticated)
 * 2. "sites"  — List of saved websites + create new
 * 3. "pick"   — Template picker (blank or pre-built)
 * 4. "edit"   — Puck editor with save button
 * 5. "view"   — Published page renderer
 */
function App() {
  const [pageData, setPageData] = useState<any>({ content: [] })
  const [mode, setMode] = useState<AppMode>('login')
  const [activeSiteId, setActiveSiteId] = useState<string | null>(null)
  const [createError, setCreateError] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newSubdomain, setNewSubdomain] = useState('')
  const [showCreateForm, setShowCreateForm] = useState(false)

  // Check if already logged in on mount
  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
    if (token) {
      setMode('sites')
    }
  }, [])

  // ---------- Login mode ----------
  if (mode === 'login') {
    return (
      <LoginPageWrapper
        onLoginSuccess={() => setMode('sites')}
      />
    )
  }

  // ---------- Sites list mode ----------
  if (mode === 'sites') {
    return (
      <SitesDashboard
        onSelectSite={(siteId: string, content: any) => {
          setActiveSiteId(siteId)
          setPageData(content ? (typeof content === 'string' ? JSON.parse(content) : content) : { content: [] })
          setMode('edit')
        }}
        onNewSite={() => setMode('pick')}
        onLogout={() => {
          localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN)
          localStorage.removeItem(STORAGE_KEYS.USER)
          setMode('login')
        }}
        showCreateForm={showCreateForm}
        setShowCreateForm={setShowCreateForm}
        newTitle={newTitle}
        setNewTitle={setNewTitle}
        newSubdomain={newSubdomain}
        setNewSubdomain={setNewSubdomain}
        createError={createError}
        setCreateError={setCreateError}
        onSiteCreated={(siteId: string) => {
          setActiveSiteId(siteId)
          setMode('pick')
        }}
      />
    )
  }

  // ---------- Template picker mode ----------
  if (mode === 'pick') {
    return (
      <TemplatePicker
        onSelect={(data: any) => {
          setPageData(data)
          setMode('edit')
        }}
        onBack={() => setMode('sites')}
      />
    )
  }

  // ---------- Editor mode ----------
  if (mode === 'edit') {
    return (
      <EditorWithSave
        siteId={activeSiteId}
        pageData={pageData}
        onPublish={(data: any) => {
          setPageData(data)
          setMode('view')
        }}
        onBack={() => setMode('sites')}
      />
    )
  }

  // ---------- View / Preview mode ----------
  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        <button
          onClick={() => setMode('edit')}
          style={btnStyle('#1e293b')}
        >
          ← Back to Editor
        </button>
        <button
          onClick={() => setMode('sites')}
          style={btnStyle('#f59e0b')}
        >
          My Sites
        </button>
      </div>
      <PageRenderer data={pageData} />
    </div>
  )
}

// ============================================================
// Sub-components
// ============================================================

/** Wraps LoginPage and detects successful login */
function LoginPageWrapper({ onLoginSuccess }: { onLoginSuccess: () => void }) {
  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
      if (token) {
        clearInterval(interval)
        onLoginSuccess()
      }
    }, 300)
    return () => clearInterval(interval)
  }, [onLoginSuccess])

  return <LoginPage />
}

/** Sites dashboard — lists saved sites + create new */
function SitesDashboard({
  onSelectSite,
  onNewSite,
  onLogout,
  showCreateForm,
  setShowCreateForm,
  newTitle,
  setNewTitle,
  newSubdomain,
  setNewSubdomain,
  createError,
  setCreateError,
  onSiteCreated,
}: {
  onSelectSite: (id: string, content: any) => void
  onNewSite: () => void
  onLogout: () => void
  showCreateForm: boolean
  setShowCreateForm: (v: boolean) => void
  newTitle: string
  setNewTitle: (v: string) => void
  newSubdomain: string
  setNewSubdomain: (v: string) => void
  createError: string
  setCreateError: (v: string) => void
  onSiteCreated: (id: string) => void
}) {
  const { data: sites, isLoading, error } = useSites()
  const createMutation = useCreateSite()

  const handleCreate = () => {
    if (!newTitle.trim() || !newSubdomain.trim()) {
      setCreateError('Title and subdomain are required')
      return
    }
    setCreateError('')
    createMutation.mutate(
      { title: newTitle.trim(), subdomain: newSubdomain.trim().toLowerCase() },
      {
        onSuccess: (site) => {
          setNewTitle('')
          setNewSubdomain('')
          setShowCreateForm(false)
          onSiteCreated(site.id)
        },
        onError: (err: any) => {
          setCreateError(err?.response?.data?.error || err.message || 'Failed to create site')
        },
      }
    )
  }

  const user = (() => {
    try {
      const u = localStorage.getItem(STORAGE_KEYS.USER)
      return u ? JSON.parse(u) : null
    } catch {
      return null
    }
  })()

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
        padding: '40px 20px',
      }}
    >
      {/* Header */}
      <div
        style={{
          maxWidth: '900px',
          margin: '0 auto 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <h1 style={{ color: '#f8fafc', fontSize: '1.8rem', fontWeight: 700, margin: 0 }}>
            My Websites
          </h1>
          {user && (
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: '4px 0 0' }}>
              Welcome, {user.name || user.email}
            </p>
          )}
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => setShowCreateForm(true)} style={btnStyle('#3b82f6')}>
            + New Website
          </button>
          <button onClick={onLogout} style={btnStyle('#475569')}>
            Logout
          </button>
        </div>
      </div>

      {/* Create form */}
      {showCreateForm && (
        <div
          style={{
            maxWidth: '500px',
            margin: '0 auto 32px',
            background: 'rgba(255,255,255,0.06)',
            borderRadius: '12px',
            padding: '24px',
            border: '1px solid #334155',
          }}
        >
          <h3 style={{ color: '#f8fafc', marginTop: 0, marginBottom: '16px' }}>Create New Website</h3>
          <input
            placeholder="Site title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            style={inputStyle}
          />
          <input
            placeholder="subdomain (e.g. my-portfolio)"
            value={newSubdomain}
            onChange={(e) => setNewSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
            style={{ ...inputStyle, marginTop: '12px' }}
          />
          {createError && (
            <p style={{ color: '#ef4444', fontSize: '0.85rem', margin: '8px 0 0' }}>{createError}</p>
          )}
          <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            <button
              onClick={handleCreate}
              disabled={createMutation.isPending}
              style={btnStyle('#22c55e')}
            >
              {createMutation.isPending ? 'Creating...' : 'Create'}
            </button>
            <button
              onClick={() => {
                setShowCreateForm(false)
                setCreateError('')
              }}
              style={btnStyle('#475569')}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Sites grid */}
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {isLoading && <p style={{ color: '#94a3b8', textAlign: 'center' }}>Loading sites...</p>}
        {error && <p style={{ color: '#ef4444', textAlign: 'center' }}>Failed to load sites</p>}

        {sites && sites.length === 0 && !showCreateForm && (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginBottom: '16px' }}>
              You haven't created any websites yet
            </p>
            <button onClick={() => setShowCreateForm(true)} style={btnStyle('#3b82f6')}>
              + Create Your First Website
            </button>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
          {sites?.map((site) => (
            <button
              key={site.id}
              onClick={() => onSelectSite(site.id, null)}
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid #334155',
                borderRadius: '12px',
                padding: '24px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s',
                color: '#e2e8f0',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#3b82f6'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#334155'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <h3 style={{ margin: '0 0 8px', fontSize: '1.1rem', fontWeight: 600 }}>{site.title}</h3>
              <p style={{ margin: '0 0 12px', fontSize: '0.8rem', color: '#64748b' }}>
                {site.subdomain}.builder.com
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span
                  style={{
                    fontSize: '0.75rem',
                    padding: '2px 8px',
                    borderRadius: '9999px',
                    background: site.visible ? 'rgba(34,197,94,0.15)' : 'rgba(100,116,139,0.2)',
                    color: site.visible ? '#22c55e' : '#94a3b8',
                  }}
                >
                  {site.visible ? 'Published' : 'Draft'}
                </span>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                  {new Date(site.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

/** Template picker */
function TemplatePicker({ onSelect, onBack }: { onSelect: (data: any) => void; onBack: () => void }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
        padding: '40px 20px',
      }}
    >
      <button onClick={onBack} style={{ ...btnStyle('#475569'), marginBottom: '24px' }}>
        ← Back to My Sites
      </button>
      <h1 style={{ color: '#f8fafc', fontSize: '2.2rem', fontWeight: 700, marginBottom: '8px', letterSpacing: '-0.02em' }}>
        Choose a Template
      </h1>
      <p style={{ color: '#94a3b8', fontSize: '1rem', marginBottom: '48px' }}>
        Start from scratch or pick a pre-built layout
      </p>
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {/* Blank template */}
        <button
          onClick={() => onSelect({ content: [] })}
          style={{
            width: '260px',
            minHeight: '200px',
            background: 'rgba(255,255,255,0.04)',
            border: '2px dashed #475569',
            borderRadius: '16px',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            transition: 'all 0.25s ease',
            padding: '32px 20px',
            color: '#cbd5e1',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#f59e0b'
            e.currentTarget.style.background = 'rgba(245,158,11,0.06)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#475569'
            e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
          }}
        >
          <span style={{ fontSize: '48px' }}>➕</span>
          <span style={{ fontSize: '18px', fontWeight: 600 }}>Blank Page</span>
          <span style={{ fontSize: '13px', color: '#64748b' }}>Start from an empty canvas</span>
        </button>
        {/* Pre-built templates */}
        {templates.map((tpl) => (
          <button
            key={tpl.name}
            onClick={() => {
              if (tpl.name === 'Dashboard') onSelect(dashboardTemplate)
              else onSelect({ content: [] })
            }}
            style={{
              width: '260px',
              minHeight: '200px',
              background: 'rgba(255,255,255,0.06)',
              border: '2px solid #334155',
              borderRadius: '16px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              transition: 'all 0.25s ease',
              padding: '32px 20px',
              color: '#e2e8f0',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#f59e0b'
              e.currentTarget.style.background = 'rgba(245,158,11,0.08)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#334155'
              e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <span style={{ fontSize: '48px' }}>{tpl.thumbnail}</span>
            <span style={{ fontSize: '18px', fontWeight: 600 }}>{tpl.name}</span>
            <span style={{ fontSize: '13px', color: '#94a3b8', textAlign: 'center', lineHeight: 1.4 }}>
              {tpl.description}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

/** Editor with save-to-backend wired up */
function EditorWithSave({
  siteId,
  pageData,
  onPublish,
  onBack,
}: {
  siteId: string | null
  pageData: any
  onPublish: (data: any) => void
  onBack: () => void
}) {
  const saveMutation = useSaveSite()
  const { data: siteData } = useSite(siteId)
  const [loadedData, setLoadedData] = useState<any>(null)

  // When site data loads from backend, use it
  useEffect(() => {
    if (siteData?.content) {
      try {
        const parsed = typeof siteData.content === 'string' ? JSON.parse(siteData.content) : siteData.content
        setLoadedData(parsed)
      } catch {
        setLoadedData(pageData)
      }
    }
  }, [siteData])

  const editorData = loadedData || pageData

  const handleSave = (data: any) => {
    if (!siteId) return
    saveMutation.mutate({
      id: siteId,
      content: JSON.stringify(data),
    })
  }

  return (
    <div>
      {/* Back button */}
      <button
        onClick={onBack}
        style={{
          position: 'fixed',
          top: '12px',
          right: '290px',
          zIndex: 10000,
          ...btnStyle('#475569'),
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        }}
      >
        ← My Sites
      </button>
      <PageEditor
        initialData={editorData}
        onPublish={onPublish}
        onSave={handleSave}
        isSaving={saveMutation.isPending}
      />
    </div>
  )
}

// ============================================================
// Shared styles
// ============================================================

const btnStyle = (bg: string): React.CSSProperties => ({
  padding: '8px 20px',
  background: bg,
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: 600,
})

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 14px',
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid #475569',
  borderRadius: '8px',
  color: '#e2e8f0',
  fontSize: '14px',
  outline: 'none',
  boxSizing: 'border-box',
}

export default App
