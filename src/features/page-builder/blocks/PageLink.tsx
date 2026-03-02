import React from "react";
import { ComponentConfig } from "@puckeditor/core";
import { usePreview } from "../renderer/PreviewContext";

export type PageLinkProps = {
    pageId: string;
    text: string;
    className?: string;
    style?: React.CSSProperties;
};

export const PageLink: ComponentConfig<PageLinkProps> = {
    fields: {
        pageId: {
            type: "select",
            options: [], // Will be populated dynamically
            label: "Select Page",
        },
        text: {
            type: "text",
            label: "Link Text",
        },
        className: {
            type: "text",
            label: "CSS Class",
        },
    },
    defaultProps: {
        pageId: "",
        text: "Click me",
    },
    render: ({ pageId, text, className, style }) => {
        // Check if we are in preview mode
        const preview = usePreview();

        const handleClick = (e: React.MouseEvent) => {
            let pid = pageId;
            // Catch variations like "Home", "index"
            if (pid === 'Home' || pid === 'index') pid = 'root';

            if (preview && pid) {
                e.preventDefault();
                preview.navigateToPage(pid);
            }
        };

        // Handle root path specifically (avoid /root)
        let targetPath = pageId;
        if (targetPath === 'root' || targetPath === 'Home' || targetPath === 'index') targetPath = '';

        // In live site, rely on href. In preview, intercept.
        // Ensure href is safe if pageId is missing
        const href = pageId ? (preview ? '#' : `/${targetPath}`) : '#';

        return (
            <a
                href={href}
                onClick={handleClick}
                className={className}
                style={{ ...style, display: "inline-block", cursor: "pointer", color: "blue", textDecoration: "underline" } as React.CSSProperties}
            >
                {text}
            </a>
        );
    },
};
