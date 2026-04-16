// ---------------------------------------------------------------------------
// AnimationField – Custom Puck sidebar field for configuring animations
// ---------------------------------------------------------------------------
import React from "react";
import {
    TRIGGER_OPTIONS,
    ANIMATION_OPTIONS,
    EASING_OPTIONS,
    DEFAULT_ANIMATION,
    type AnimationConfig,
} from "./types";

/* ── Inline style helpers ───────────────────────────────────────────────── */
const panelStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "12px",
    borderRadius: "8px",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    fontSize: "13px",
};

const labelStyle: React.CSSProperties = {
    display: "block",
    fontWeight: 600,
    fontSize: "11px",
    color: "#475569",
    marginBottom: "4px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
};

const selectStyle: React.CSSProperties = {
    width: "100%",
    padding: "6px 8px",
    borderRadius: "6px",
    border: "1px solid #cbd5e1",
    background: "#fff",
    fontSize: "13px",
    color: "#1e293b",
    outline: "none",
};

const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "6px 8px",
    borderRadius: "6px",
    border: "1px solid #cbd5e1",
    background: "#fff",
    fontSize: "13px",
    color: "#1e293b",
    outline: "none",
    boxSizing: "border-box",
};

const rowStyle: React.CSSProperties = {
    display: "flex",
    gap: "8px",
};

const halfStyle: React.CSSProperties = {
    flex: 1,
};

/* ── Component ──────────────────────────────────────────────────────────── */

interface AnimationFieldProps {
    name: string;
    value: AnimationConfig | undefined;
    onChange: (value: AnimationConfig) => void;
    field: any;
    id: string;
}

export function AnimationFieldRender({ value, onChange }: AnimationFieldProps) {
    const config: AnimationConfig = { ...DEFAULT_ANIMATION, ...(value || {}) };

    const update = (partial: Partial<AnimationConfig>) => {
        onChange({ ...config, ...partial });
    };

    // When trigger changes, reset the animation type to avoid invalid combos
    const handleTriggerChange = (trigger: string) => {
        if (trigger === "none") {
            update({ trigger: "none", type: "none" });
            return;
        }
        const opts = ANIMATION_OPTIONS[trigger] || [];
        const firstType = opts[0]?.value ?? "none";
        update({ trigger, type: firstType });
    };

    const currentTypeOptions = ANIMATION_OPTIONS[config.trigger] || [];
    const isActive = config.trigger !== "none" && config.type !== "none";

    return (
        <div style={panelStyle}>
            {/* ── Trigger ── */}
            <div>
                <label style={labelStyle}>Trigger</label>
                <select
                    style={selectStyle}
                    value={config.trigger}
                    onChange={(e) => handleTriggerChange(e.target.value)}
                >
                    {TRIGGER_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* ── Animation type (shown only when a trigger is selected) ── */}
            {config.trigger !== "none" && (
                <div>
                    <label style={labelStyle}>Effect</label>
                    <select
                        style={selectStyle}
                        value={config.type}
                        onChange={(e) => update({ type: e.target.value })}
                    >
                        {currentTypeOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* ── Duration & Delay ── */}
            {isActive && (
                <div style={rowStyle}>
                    <div style={halfStyle}>
                        <label style={labelStyle}>Duration (ms)</label>
                        <input
                            type="number"
                            style={inputStyle}
                            value={config.duration}
                            min={50}
                            max={5000}
                            step={50}
                            onChange={(e) => update({ duration: Number(e.target.value) || 600 })}
                        />
                    </div>
                    <div style={halfStyle}>
                        <label style={labelStyle}>Delay (ms)</label>
                        <input
                            type="number"
                            style={inputStyle}
                            value={config.delay}
                            min={0}
                            max={5000}
                            step={50}
                            onChange={(e) => update({ delay: Number(e.target.value) || 0 })}
                        />
                    </div>
                </div>
            )}

            {/* ── Easing ── */}
            {isActive && (
                <div>
                    <label style={labelStyle}>Easing</label>
                    <select
                        style={selectStyle}
                        value={config.easing}
                        onChange={(e) => update({ easing: e.target.value })}
                    >
                        {EASING_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* ── Status badge ── */}
            {isActive && (
                <div
                    style={{
                        fontSize: "11px",
                        color: "#6366f1",
                        fontStyle: "italic",
                        paddingTop: "2px",
                    }}
                >
                    ✦ {TRIGGER_OPTIONS.find((t) => t.value === config.trigger)?.label} →{" "}
                    {currentTypeOptions.find((t) => t.value === config.type)?.label || config.type}
                </div>
            )}
        </div>
    );
}
