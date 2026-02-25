import { Suspense, useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import PageEditor from '@/features/page-builder/editor/PuckEditor';
import PageRenderer from '@/features/page-builder/renderer/PageRenderer';

/**
 * Root App Component
 * 
 * This component is kept minimal and only handles routing.
 * All page content is handled by feature-based page components.
 * 
 * Performance: Suspense boundary for lazy-loaded routes
 */
function App() {
  // return (
  //   <Suspense
  //     fallback={
  //       <div
  //         style={{
  //           display: 'flex',
  //           justifyContent: 'center',
  //           alignItems: 'center',
  //           height: '100vh',
  //         }}
  //       >
  //         <div>Loading...</div>
  //       </div>
  //     }
  //   >
  //     <RouterProvider router={router} />
  //   </Suspense>
  // )
  const [pageData, setPageData] = useState<any>({ content: [] });
  const [mode, setMode] = useState<"edit" | "view">("edit");

  if (mode === "edit") {
    return (
      <PageEditor
        initialData={pageData}
        onPublish={(data) => {
          setPageData(data);
          setMode("view");
        }}
      />
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => setMode("edit")}>
        Back to Editor
      </button>

      <PageRenderer data={pageData} />
    </div>
  );
}

export default App
