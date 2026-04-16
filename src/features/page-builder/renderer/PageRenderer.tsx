import { Render } from "@puckeditor/core";
import { config } from "../config/puckConfig";
import { PreviewContext } from "./PreviewContext";

interface Props {
  data: any;
  onNavigate?: (pageId: string) => void;
}

export default function PageRenderer({ data, onNavigate }: Props) {
  // If no navigation handler is provided, we assume live mode or no-op
  const contextValue = onNavigate ? { navigateToPage: onNavigate, currentPageId: '' } : null;

  const content = <Render config={config} data={data} />;

  if (contextValue) {
    return (
      <PreviewContext.Provider value={contextValue}>
        {content}
      </PreviewContext.Provider>
    );
  }

  return content;
}