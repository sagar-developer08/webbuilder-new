import { createContext, useContext } from 'react';

export interface PreviewContextType {
    navigateToPage: (pageId: string) => void;
    currentPageId: string;
}

export const PreviewContext = createContext<PreviewContextType | null>(null);

export const usePreview = () => useContext(PreviewContext);
