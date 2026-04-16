import React, { useRef, useCallback, useEffect } from "react";
import { usePuck, registerOverlayPortal } from "@puckeditor/core";
import { useResize, type ResizeHandle } from "./useResize";
import "./resizable.css";

const HANDLES: ResizeHandle[] = [
    "right",
    "left",
    "bottom",
    "top",
    "bottom-right",
    "top-left",
    "top-right",
    "bottom-left",
];

/* ------------------------------------------------------------------ */
/*  ResizableEditor – only rendered inside Puck editor context        */
/* ------------------------------------------------------------------ */
function ResizableEditor({
    id,
    width,
    height,
    children,
}: {
    id: string;
    width: string;
    height: string;
    children: React.ReactNode;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { dispatch, getItemById, getSelectorForId } = usePuck();

    // Register each handle with Puck's overlay portal (disableDrag: true)
    // so Puck knows not to start a drag from these elements.
    const handlePortalRefs = useRef<Map<string, (() => void) | undefined>>(new Map());

    const registerHandle = useCallback((dir: string, el: HTMLDivElement | null) => {
        // Clean up previous registration
        const prev = handlePortalRefs.current.get(dir);
        if (prev) prev();
        handlePortalRefs.current.delete(dir);

        if (el) {
            const cleanup = registerOverlayPortal(el, { disableDrag: true });
            handlePortalRefs.current.set(dir, cleanup);
        }
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            handlePortalRefs.current.forEach((cleanup) => cleanup?.());
            handlePortalRefs.current.clear();
        };
    }, []);

    const handleResizeEnd = useCallback(
        (newWidth: number, newHeight: number) => {
            const item = getItemById(id);
            const selector = getSelectorForId(id);

            if (item && selector) {
                dispatch({
                    type: "replace",
                    destinationIndex: selector.index,
                    destinationZone: selector.zone,
                    data: {
                        ...item,
                        props: {
                            ...item.props,
                            resizeWidth: `${newWidth}px`,
                            resizeHeight: `${newHeight}px`,
                        },
                    },
                });
            }
        },
        [id, dispatch, getItemById, getSelectorForId]
    );

    const { getHandleRef, dimensionDisplayRef } = useResize({
        containerRef,
        onResizeEnd: handleResizeEnd,
        minWidth: 20,
        minHeight: 20,
    });

    // Combined ref callback: registers with both useResize AND Puck overlay portal
    const getCombinedRef = useCallback(
        (dir: ResizeHandle) => (el: HTMLDivElement | null) => {
            getHandleRef(dir)(el);
            registerHandle(dir, el);
        },
        [getHandleRef, registerHandle]
    );

    return (
        <div
            ref={containerRef}
            className="pb-resizable"
            style={{
                width: width !== "auto" ? width : undefined,
                height: height !== "auto" ? height : undefined,
            }}
        >
            {children}

            {/* Resize handles */}
            {HANDLES.map((dir) => (
                <div
                    key={dir}
                    ref={getCombinedRef(dir)}
                    className={`pb-resize-handle pb-resize-handle--${dir}`}
                    data-puck-overlay-portal="true"
                />
            ))}

            {/* Dimension tooltip */}
            <div ref={dimensionDisplayRef} className="pb-resize-dimension" />
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  ResizableWrapper – renders ResizableEditor only in edit mode       */
/* ------------------------------------------------------------------ */
export function ResizableWrapper({
    id,
    width,
    height,
    enabled,
    children,
}: {
    id: string;
    width: string;
    height: string;
    enabled: boolean;
    children: React.ReactNode;
}) {
    if (!enabled) {
        // In view/render mode, apply persisted dimensions without handles
        const style: React.CSSProperties =
            width !== "auto" || height !== "auto"
                ? {
                    width: width !== "auto" ? width : undefined,
                    height: height !== "auto" ? height : undefined,
                }
                : {};

        if (Object.keys(style).length > 0) {
            return <div style={style}>{children}</div>;
        }
        return <>{children}</>;
    }

    return (
        <ResizableEditor id={id} width={width} height={height}>
            {children}
        </ResizableEditor>
    );
}
