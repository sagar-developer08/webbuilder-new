import { useRef, useCallback, useEffect } from 'react'

export type ResizeHandle =
  | 'right'
  | 'bottom'
  | 'bottom-right'
  | 'left'
  | 'top'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'

interface UseResizeOptions {
  containerRef: React.RefObject<HTMLDivElement | null>
  onResizeEnd: (width: number, height: number) => void
  onResizeStart?: () => void
  minWidth?: number
  minHeight?: number
}

/**
 * Helper: get the parent (top-level) document.
 * When Puck renders inside an iframe, `handleEl.ownerDocument` is the
 * iframe's contentDocument. The parent document is where dnd-kit lives.
 */
function getParentDocument(el: HTMLElement): Document {
  try {
    const win = el.ownerDocument.defaultView
    if (win && win.parent && win.parent !== win) {
      return win.parent.document
    }
  } catch {
    /* cross-origin iframe – fall back */
  }
  return el.ownerDocument
}

/**
 * useResize – Manages drag-to-resize via pointer events with pointer capture.
 *
 * CRITICAL: Puck renders component content inside an iframe (AutoFrame).
 * Resize handles live in the iframe's DOM, so we must listen for
 * pointermove/pointerup on BOTH the iframe document (ownerDocument)
 * AND the parent document (where Puck & dnd-kit live) to ensure
 * events are captured regardless of whether the cursor is inside
 * or outside the canvas iframe.
 */
export function useResize({
  containerRef,
  onResizeEnd,
  onResizeStart,
  minWidth = 20,
  minHeight = 20,
}: UseResizeOptions) {
  const isResizing = useRef(false)
  const startX = useRef(0)
  const startY = useRef(0)
  const startWidth = useRef(0)
  const startHeight = useRef(0)
  const direction = useRef<ResizeHandle>('right')
  const activePointerId = useRef<number | null>(null)
  const activeHandle = useRef<HTMLElement | null>(null)
  const onResizeEndRef = useRef(onResizeEnd)
  const onResizeStartRef = useRef(onResizeStart)
  const dimensionDisplayRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    onResizeEndRef.current = onResizeEnd
  }, [onResizeEnd])
  useEffect(() => {
    onResizeStartRef.current = onResizeStart
  }, [onResizeStart])

  const updateDimensionDisplay = useCallback((w: number, h: number) => {
    if (dimensionDisplayRef.current) {
      dimensionDisplayRef.current.textContent = `${Math.round(w)} × ${Math.round(h)}`
      dimensionDisplayRef.current.style.display = 'block'
    }
  }, [])

  const hideDimensionDisplay = useCallback(() => {
    if (dimensionDisplayRef.current) {
      dimensionDisplayRef.current.style.display = 'none'
    }
  }, [])

  const getHandleRef = useCallback(
    (dir: ResizeHandle) => {
      return (handleEl: HTMLDivElement | null) => {
        // Cleanup previous listeners
        if ((handleEl as any)?.__pbCleanup) {
          ;(handleEl as any).__pbCleanup()
          ;(handleEl as any).__pbCleanup = undefined
        }
        if (!handleEl) return

        // Determine the iframe doc and parent doc
        const iframeDoc = handleEl.ownerDocument
        const parentDoc = getParentDocument(handleEl)
        const isInIframe = iframeDoc !== parentDoc

        // We'll also need the iframe element itself to translate coordinates
        let iframeEl: HTMLIFrameElement | null = null
        if (isInIframe) {
          try {
            iframeEl = parentDoc.querySelector('iframe#preview-frame') as HTMLIFrameElement | null
          } catch {
            /* cross-origin */
          }
        }

        /**
         * Translate clientX/clientY from the parent document coordinate
         * space into the iframe's coordinate space.
         */
        const toIframeCoords = (clientX: number, clientY: number) => {
          if (!iframeEl) return { x: clientX, y: clientY }
          const rect = iframeEl.getBoundingClientRect()
          const scaleX =
            iframeEl.clientWidth / (iframeEl.contentWindow?.innerWidth || iframeEl.clientWidth)
          const scaleY =
            iframeEl.clientHeight / (iframeEl.contentWindow?.innerHeight || iframeEl.clientHeight)
          return {
            x: (clientX - rect.left) / scaleX,
            y: (clientY - rect.top) / scaleY,
          }
        }

        // --- PointerMove handler ---
        const onPointerMove = (e: PointerEvent) => {
          if (!isResizing.current || !containerRef.current) return

          e.preventDefault()
          e.stopPropagation()
          e.stopImmediatePropagation()

          // Determine if this event came from parent doc or iframe doc
          const fromParent = e.target instanceof parentDoc.defaultView!.Element && isInIframe
          let cx = e.clientX
          let cy = e.clientY

          if (fromParent && iframeEl) {
            // Event from parent doc – translate coords into iframe space
            const coords = toIframeCoords(cx, cy)
            cx = coords.x
            cy = coords.y
          }

          const el = containerRef.current
          const d = direction.current
          const dx = cx - startX.current
          const dy = cy - startY.current

          let newW = startWidth.current
          let newH = startHeight.current

          if (d === 'right' || d === 'bottom-right' || d === 'top-right')
            newW = Math.max(minWidth, startWidth.current + dx)
          if (d === 'left' || d === 'bottom-left' || d === 'top-left')
            newW = Math.max(minWidth, startWidth.current - dx)
          if (d === 'bottom' || d === 'bottom-right' || d === 'bottom-left')
            newH = Math.max(minHeight, startHeight.current + dy)
          if (d === 'top' || d === 'top-left' || d === 'top-right')
            newH = Math.max(minHeight, startHeight.current - dy)

          el.style.width = `${newW}px`
          el.style.height = `${newH}px`
          updateDimensionDisplay(newW, newH)
        }

        // --- PointerUp handler ---
        const onPointerUp = (e: PointerEvent) => {
          if (!isResizing.current || !containerRef.current) return

          e.preventDefault()
          e.stopPropagation()
          e.stopImmediatePropagation()

          isResizing.current = false

          // Release pointer capture
          const h = activeHandle.current
          if (h && activePointerId.current !== null) {
            try {
              h.releasePointerCapture(activePointerId.current)
            } catch {}
          }

          // Remove listeners from BOTH documents
          removeGlobalListeners()

          // Reset cursor on both documents' bodies
          iframeDoc.body.style.cursor = ''
          iframeDoc.body.style.userSelect = ''
          if (isInIframe) {
            parentDoc.body.style.cursor = ''
            parentDoc.body.style.userSelect = ''
          }

          const el = containerRef.current
          el.classList.remove('pb-resizing')
          hideDimensionDisplay()
          activePointerId.current = null
          activeHandle.current = null

          onResizeEndRef.current(el.offsetWidth, el.offsetHeight)
        }

        // --- Add / remove listeners on BOTH documents ---
        const addGlobalListeners = () => {
          iframeDoc.addEventListener('pointermove', onPointerMove, true)
          iframeDoc.addEventListener('pointerup', onPointerUp, true)
          if (isInIframe) {
            parentDoc.addEventListener('pointermove', onPointerMove, true)
            parentDoc.addEventListener('pointerup', onPointerUp, true)
          }
        }

        const removeGlobalListeners = () => {
          iframeDoc.removeEventListener('pointermove', onPointerMove, true)
          iframeDoc.removeEventListener('pointerup', onPointerUp, true)
          if (isInIframe) {
            parentDoc.removeEventListener('pointermove', onPointerMove, true)
            parentDoc.removeEventListener('pointerup', onPointerUp, true)
          }
        }

        // --- PointerDown (on the handle, capture phase) ---
        const onPointerDown = (e: PointerEvent) => {
          if (e.button !== 0) return

          // CRITICAL: Block everything so Puck/dnd-kit never sees this pointer
          e.preventDefault()
          e.stopPropagation()
          e.stopImmediatePropagation()

          const el = containerRef.current
          if (!el) return

          isResizing.current = true
          direction.current = dir
          // Use clientX/Y which is in iframe coordinate space
          startX.current = e.clientX
          startY.current = e.clientY
          startWidth.current = el.offsetWidth
          startHeight.current = el.offsetHeight
          activePointerId.current = e.pointerId
          activeHandle.current = handleEl

          // Capture the pointer to this element
          handleEl.setPointerCapture(e.pointerId)

          el.classList.add('pb-resizing')
          onResizeStartRef.current?.()

          // Listen on BOTH iframe doc and parent doc
          addGlobalListeners()

          // Set cursor on both documents
          const cursor = getCursorForDirection(dir)
          iframeDoc.body.style.cursor = cursor
          iframeDoc.body.style.userSelect = 'none'
          if (isInIframe) {
            parentDoc.body.style.cursor = cursor
            parentDoc.body.style.userSelect = 'none'
          }
        }

        // Suppress mouse/drag events that dnd-kit might use as fallback
        const suppress = (ev: Event) => {
          if (isResizing.current) {
            ev.preventDefault()
            ev.stopPropagation()
            ev.stopImmediatePropagation()
          }
        }

        // Attach all listeners in capture phase
        handleEl.addEventListener('pointerdown', onPointerDown, true)
        handleEl.addEventListener('mousedown', suppress, true)
        handleEl.addEventListener('dragstart', suppress, true)
        handleEl.addEventListener('touchstart', suppress, { capture: true, passive: false })

        // Store cleanup
        ;(handleEl as any).__pbCleanup = () => {
          handleEl.removeEventListener('pointerdown', onPointerDown, true)
          handleEl.removeEventListener('mousedown', suppress, true)
          handleEl.removeEventListener('dragstart', suppress, true)
          handleEl.removeEventListener('touchstart', suppress, true)
          removeGlobalListeners()
        }
      }
    },
    [containerRef, minWidth, minHeight, updateDimensionDisplay, hideDimensionDisplay]
  )

  return { getHandleRef, dimensionDisplayRef }
}

function getCursorForDirection(dir: ResizeHandle): string {
  switch (dir) {
    case 'right':
    case 'left':
      return 'col-resize'
    case 'bottom':
    case 'top':
      return 'row-resize'
    case 'bottom-right':
    case 'top-left':
      return 'nwse-resize'
    case 'top-right':
    case 'bottom-left':
      return 'nesw-resize'
    default:
      return 'default'
  }
}
