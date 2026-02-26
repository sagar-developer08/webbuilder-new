import { Puck } from "@puckeditor/core";
import "@puckeditor/core/dist/index.css";
import { config } from "../config/puckConfig";
import { useCallback, useRef, useState } from "react";

interface Props {
  onPublish: (data: any) => void;
  onSave?: (data: any) => void;
  isSaving?: boolean;
  initialData?: any;
}

export default function PageEditor({ onPublish, onSave, isSaving, initialData }: Props) {
  const latestData = useRef<any>(initialData ?? { content: [] });
  const [saved, setSaved] = useState(false);

  const handleSave = useCallback(() => {
    if (onSave) {
      onSave(latestData.current);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  }, [onSave]);

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      {/* Save button floating top-right */}
      {onSave && (
        <button
          onClick={handleSave}
          disabled={isSaving}
          style={{
            position: "fixed",
            top: "12px",
            right: "180px",
            zIndex: 10000,
            padding: "8px 20px",
            background: saved ? "#22c55e" : isSaving ? "#64748b" : "#dc2626",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: isSaving ? "not-allowed" : "pointer",
            fontSize: "14px",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "6px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            transition: "background 0.2s",
          }}
        >
          {saved ? "✓ Saved" : isSaving ? "Saving..." : "💾 Save"}
        </button>
      )}
      <Puck
        config={config}
        data={initialData ?? { content: [] }}
        onChange={(data: any) => {
          latestData.current = data;
        }}
        onPublish={(data) => {
          onPublish(data);
        }}
      />
    </div>
  );
}