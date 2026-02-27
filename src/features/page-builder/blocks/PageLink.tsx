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
            if (preview && pageId) {
                e.preventDefault();
                preview.navigateToPage(pageId);
            }
        };

        // In live site, rely on href. In preview, intercept.
        // Ensure href is safe if pageId is missing
        const href = pageId ? (preview ? '#' : `/${pageId}`) : '#';

        return (
            <a
                href={href}
                onClick={handleClick}
                className={className}
                style={{ ...style, display: "inline-block", cursor: "pointer", color: "blue", textDecoration: "underline" }}
            >
                {text}
            </a>
        );
    },
};
