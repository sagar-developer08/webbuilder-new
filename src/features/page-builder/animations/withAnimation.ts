// ---------------------------------------------------------------------------
// withAnimation – HOC that injects animation fields + wrapper into a Puck block
// ---------------------------------------------------------------------------
import React from 'react'
import { AnimationWrapper } from './AnimationWrapper'
import { AnimationFieldRender } from './AnimationField'
import { DEFAULT_ANIMATION } from './types'

/**
 * Higher-order function for Puck blocks.
 * Works identically to `withResize` – injects an `animation` custom field
 * into the block's sidebar and wraps the rendered output in <AnimationWrapper>.
 *
 * Usage in puckConfig:
 *   Button: withAnimation(withResize(ButtonBlock))
 */
export function withAnimation<
  T extends { fields?: any; defaultProps?: any; render: (props: any) => any },
>(block: T): T {
  const originalRender = block.render

  return {
    ...block,

    // ── Inject animation field ──
    fields: {
      ...block.fields,
      animation: {
        type: 'custom',
        label: 'Animation',
        render: AnimationFieldRender,
      },
    },

    // ── Inject default animation config ──
    defaultProps: {
      ...block.defaultProps,
      animation: { ...DEFAULT_ANIMATION },
    },

    // ── Wrap render output ──
    render: (props: any) => {
      const { editMode, puck, animation } = props
      const isEditing = editMode || puck?.isEditing
      const rendered = originalRender(props)

      return React.createElement(AnimationWrapper, {
        animation,
        isEditing: !!isEditing,
        children: rendered,
      })
    },
  } as T
}
