// ---------------------------------------------------------------------------
// AnimationWrapper – applies runtime animation behaviour to a block
// ---------------------------------------------------------------------------
import React, { useRef, useState, useEffect, useCallback } from "react";
import { getScrollStyle, type AnimationConfig, DEFAULT_ANIMATION } from "./types";
import "./animations.css";

interface Props {
    children: React.ReactNode;
    animation?: AnimationConfig;
    isEditing?: boolean;
}

/**
 * Wraps a block's rendered output and applies the configured animation.
 *
 * Supports four trigger modes:
 *  - onAppear  → IntersectionObserver fires a CSS keyframe animation once
 *  - onScroll  → transform values scrubbed by scroll progress
 *  - onHover   → CSS hover classes (+ JS tilt for tilt3d)
 *  - loop      → infinite CSS keyframe animation
 */
export const AnimationWrapper: React.FC<Props> = ({
    children,
    animation,
    isEditing = false,
}) => {
    const cfg: AnimationConfig = { ...DEFAULT_ANIMATION, ...(animation || {}) };
    const ref = useRef<HTMLDivElement>(null);

    // ── state ──
    const [isVisible, setIsVisible] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});

    const { type, trigger, duration, delay, easing } = cfg;
    const isActive = trigger !== "none" && type !== "none";

    // ── IntersectionObserver (onAppear) ──
    useEffect(() => {
        if (!isActive || trigger !== "onAppear" || isEditing) return;
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry && entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 },
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [trigger, type, isEditing, isActive]);

    // ── Scroll listener (onScroll) ──
    useEffect(() => {
        if (!isActive || trigger !== "onScroll" || isEditing) return;
        const el = ref.current;
        if (!el) return;

        const handleScroll = () => {
            const rect = el.getBoundingClientRect();
            const wh = window.innerHeight;
            // 0 → element top at viewport bottom ; 1 → element top at viewport top
            const progress = Math.max(0, Math.min(1, 1 - rect.top / wh));
            setScrollProgress(progress);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // initial position
        return () => window.removeEventListener("scroll", handleScroll);
    }, [trigger, type, isEditing, isActive]);

    // ── 3D Tilt mouse tracking (onHover + tilt3d) ──
    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (trigger !== "onHover" || type !== "tilt3d") return;
            const el = ref.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;   // -0.5 … 0.5
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            setTiltStyle({
                transform: `perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg)`,
            });
        },
        [trigger, type],
    );

    const handleMouseLeave = useCallback(() => {
        if (trigger !== "onHover" || type !== "tilt3d") return;
        setTiltStyle({ transform: "perspective(800px) rotateY(0deg) rotateX(0deg)" });
    }, [trigger, type]);

    // ── No animation configured → pass-through ──
    if (!isActive) return <>{children}</>;

    // ── Editor mode: show a badge but don't animate ──
    if (isEditing) {
        return (
            <div style={{ position: "relative" }}>
                {children}
                <span className="wb-anim-badge">
                    {trigger === "onAppear" && "Appear"}
                    {trigger === "onScroll" && "Scroll"}
                    {trigger === "onHover" && "Hover"}
                    {trigger === "loop" && "Loop"}
                </span>
            </div>
        );
    }

    // ── Build className & style per trigger ──
    let className = "";
    let style: React.CSSProperties = {};

    if (trigger === "onAppear") {
        if (isVisible) {
            className = `wb-entrance wb-entrance-${type}`;
            style = {
                animationDuration: `${duration}ms`,
                animationDelay: `${delay}ms`,
                animationTimingFunction: easing,
            };
        } else {
            className = "wb-anim-hidden"; // invisible until IO fires
        }
    }

    if (trigger === "onScroll") {
        style = {
            ...getScrollStyle(type, scrollProgress),
            transition: `transform 60ms linear, opacity 60ms linear`,
        };
    }

    if (trigger === "onHover") {
        className = `wb-hover-${type}`;
        style = {
            ["--wb-duration" as any]: `${duration}ms`,
            ["--wb-easing" as any]: easing,
            ...(type === "tilt3d" ? tiltStyle : {}),
        };
    }

    if (trigger === "loop") {
        className = `wb-loop wb-loop-${type}`;
        style = {
            animationDuration: `${duration}ms`,
            animationDelay: `${delay}ms`,
            animationTimingFunction: easing,
        };
    }

    return (
        <div
            ref={ref}
            className={className}
            style={style}
            onMouseMove={type === "tilt3d" ? handleMouseMove : undefined}
            onMouseLeave={type === "tilt3d" ? handleMouseLeave : undefined}
        >
            {children}
        </div>
    );
};
