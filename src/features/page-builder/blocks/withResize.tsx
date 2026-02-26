import React from "react";
import { ResizableWrapper } from "./ResizableWrapper";

/**
 * withResize – Higher-order function that wraps a Puck block definition
 * to add drag-to-resize functionality on all 8 borders/corners.
 *
 * It injects `resizeWidth` and `resizeHeight` fields into the block's
 * sidebar fields and wraps the block's render output in a ResizableWrapper.
 *
 * Usage:
 *   import { withResize } from "./withResize";
 *   export const config = { components: { Button: withResize(ButtonBlock) } };
 */
export function withResize<T extends { fields: any; defaultProps: any; render: (props: any) => any }>(
    block: T
): T {
    const originalRender = block.render;

    return {
        ...block,

        fields: {
            ...block.fields,
            resizeWidth: {
                type: "text",
                label: "Width (resize)",
            },
            resizeHeight: {
                type: "text",
                label: "Height (resize)",
            },
        },

        defaultProps: {
            ...block.defaultProps,
            resizeWidth: "auto",
            resizeHeight: "auto",
        },

        render: (props: any) => {
            const { editMode, puck, id, resizeWidth, resizeHeight } = props;
            const isEditing = editMode || puck?.isEditing;

            const rendered = originalRender(props);

            return React.createElement(
                ResizableWrapper,
                {
                    id: id,
                    width: resizeWidth ?? "auto",
                    height: resizeHeight ?? "auto",
                    enabled: !!isEditing,
                    children: rendered,
                }
            );
        },
    } as T;
}
