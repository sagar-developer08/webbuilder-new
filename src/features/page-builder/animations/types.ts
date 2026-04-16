// ---------------------------------------------------------------------------
// Animation system – type definitions & option lists
// ---------------------------------------------------------------------------

export interface AnimationConfig {
  type: string // e.g. "fadeIn", "zoomIn", "lift", "bobbing"
  trigger: string // "none" | "onAppear" | "onScroll" | "onHover" | "loop"
  duration: number // ms
  delay: number // ms
  easing: string // CSS timing function
}

export const DEFAULT_ANIMATION: AnimationConfig = {
  type: 'none',
  trigger: 'none',
  duration: 600,
  delay: 0,
  easing: 'ease',
}

// ── Trigger options ──────────────────────────────────────────────────────────
export const TRIGGER_OPTIONS = [
  { label: 'None', value: 'none' },
  { label: 'On Appear', value: 'onAppear' },
  { label: 'On Scroll', value: 'onScroll' },
  { label: 'On Hover', value: 'onHover' },
  { label: 'Loop', value: 'loop' },
] as const

// ── Animation-type options grouped by trigger ────────────────────────────────
export const ANIMATION_OPTIONS: Record<string, { label: string; value: string }[]> = {
  onAppear: [
    { label: 'Fade In', value: 'fadeIn' },
    { label: 'Fade In Up', value: 'fadeInUp' },
    { label: 'Fade In Down', value: 'fadeInDown' },
    { label: 'Fade In Left', value: 'fadeInLeft' },
    { label: 'Fade In Right', value: 'fadeInRight' },
    { label: 'Zoom In', value: 'zoomIn' },
    { label: 'Zoom Out', value: 'zoomOut' },
    { label: 'Slide Up', value: 'slideUp' },
    { label: 'Slide Down', value: 'slideDown' },
    { label: 'Slide Left', value: 'slideLeft' },
    { label: 'Slide Right', value: 'slideRight' },
    { label: 'Bounce', value: 'bounce' },
    { label: 'Spin', value: 'spin' },
    { label: 'Reveal', value: 'reveal' },
  ],
  onScroll: [
    { label: 'Parallax', value: 'parallax' },
    { label: 'Scale on Scroll', value: 'scaleOnScroll' },
    { label: 'Rotate on Scroll', value: 'rotateOnScroll' },
    { label: 'Fade In (scroll)', value: 'fadeIn' },
    { label: 'Fade In Up (scroll)', value: 'fadeInUp' },
    { label: 'Fade In Down (scroll)', value: 'fadeInDown' },
    { label: 'Slide Up (scroll)', value: 'slideUp' },
    { label: 'Slide Down (scroll)', value: 'slideDown' },
  ],
  onHover: [
    { label: 'Lift / Translate', value: 'lift' },
    { label: 'Shadow Expand', value: 'shadowExpand' },
    { label: 'Image Inner Zoom', value: 'imageInnerZoom' },
    { label: '3D Tilt', value: 'tilt3d' },
  ],
  loop: [
    { label: 'Bobbing', value: 'bobbing' },
    { label: 'Pulse', value: 'pulse' },
    { label: 'Spin', value: 'spin' },
  ],
}

// ── Easing options ───────────────────────────────────────────────────────────
export const EASING_OPTIONS = [
  { label: 'Ease', value: 'ease' },
  { label: 'Ease In', value: 'ease-in' },
  { label: 'Ease Out', value: 'ease-out' },
  { label: 'Ease In-Out', value: 'ease-in-out' },
  { label: 'Linear', value: 'linear' },
  { label: 'Bounce', value: 'cubic-bezier(0.34, 1.56, 0.64, 1)' },
  { label: 'Smooth', value: 'cubic-bezier(0.4, 0, 0.2, 1)' },
] as const

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Compute inline scroll-based transform/opacity for a given animation type */
export function getScrollStyle(animationType: string, progress: number): React.CSSProperties {
  switch (animationType) {
    case 'parallax':
      return { transform: `translateY(${(1 - progress) * 60}px)` }
    case 'scaleOnScroll': {
      const s = 0.6 + progress * 0.4 // 0.6 → 1.0
      return { transform: `scale(${s})`, opacity: 0.4 + progress * 0.6 }
    }
    case 'rotateOnScroll':
      return { transform: `rotate(${progress * 360}deg)` }
    // Entrance-style animations scrubbed by scroll
    case 'fadeIn':
      return { opacity: progress }
    case 'fadeInUp':
      return {
        opacity: progress,
        transform: `translateY(${(1 - progress) * 40}px)`,
      }
    case 'fadeInDown':
      return {
        opacity: progress,
        transform: `translateY(${(progress - 1) * 40}px)`,
      }
    case 'slideUp':
      return { transform: `translateY(${(1 - progress) * 80}px)` }
    case 'slideDown':
      return { transform: `translateY(${(progress - 1) * 80}px)` }
    default:
      return { opacity: progress }
  }
}
