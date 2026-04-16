import React from "react";
import { ComponentConfig } from "@puckeditor/core";
import { usePreview } from "../renderer/PreviewContext";

export type NavbarBlockProps = {
    logo?: string;
    title: string;
    links: { label: string; pageId: string }[];
    backgroundColor?: string;
    textColor?: string;
};

export const NavbarBlock: ComponentConfig<NavbarBlockProps> = {
    fields: {
        logo: {
            type: "text",
            label: "Logo URL",
        },
        title: {
            type: "text",
            label: "Site Title",
        },
        links: {
            type: "array",
            label: "Navigation Links",
            getItemSummary: (item) => item.label || "Link",
            arrayFields: {
                label: { type: "text" },
                pageId: {
                    type: "select",
                    label: "Page",
                    // The options will be injected dynamically by PuckEditor just like PageLink
                    options: [],
                },
            },
            defaultItemProps: {
                label: "New Link",
                pageId: "",
            },
        },
        backgroundColor: {
            type: "text",
            label: "Background Color",
        },
        textColor: {
            type: "text",
            label: "Text Color",
        },
    },
    defaultProps: {
        title: "My Site",
        links: [],
        backgroundColor: "#ffffff",
        textColor: "#1e293b",
    },
    render: ({ logo, title, links, backgroundColor, textColor }) => {
        const preview = usePreview();

        return (
            <nav
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "16px 32px",
                    backgroundColor: backgroundColor,
                    color: textColor,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    {logo && (
                        <img
                            src={logo}
                            alt="Logo"
                            style={{ height: "32px", width: "auto", objectFit: "contain" }}
                        />
                    )}
                    {title && (
                        <div style={{ fontWeight: 700, fontSize: "18px" }}>
                            {title}
                        </div>
                    )}
                </div>

                <div style={{ display: "flex", gap: "24px" }}>
                    {links.map((link, i) => {
                        // Ensure preview mode is detected
                        const isPreview = !!preview;

                        const handleClick = (e: React.MouseEvent) => {
                            let pid = link.pageId;
                            // normalize common "home" references
                            if (pid === 'Home' || pid === 'index') pid = 'root';

                            if (isPreview && pid) {
                                e.preventDefault();
                                preview.navigateToPage(pid);
                            }
                        };

                        // Handle root path specifically
                        let targetPath = link.pageId;
                        if (targetPath === 'root' || targetPath === 'Home' || targetPath === 'index') targetPath = '';

                        // If preview, use '#' to prevent navigation. If live, convert to path.
                        const href = isPreview ? '#' : `/${targetPath}`;

                        return (
                            <a
                                key={i}
                                href={href}
                                onClick={handleClick}
                                style={{
                                    color: "inherit",
                                    textDecoration: "none",
                                    fontWeight: 500,
                                    cursor: "pointer",
                                    fontSize: "15px",
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                            >
                                {link.label}
                            </a>
                        );
                    })}
                </div>
            </nav>
        );
    },
};
