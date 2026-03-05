# Dynamic Web Builder - Architecture & Flow Guide

This document provides a highly detailed breakdown of the React-based Visual Page Builder project (`webbuilder-new`) and its profound integration with the **Dynamic API Engine**. It serves as a complete blueprint to understand how frontend drag-and-drop elements securely interact directly with MongoDB databases without writing any custom backend routes.

---

## 🏗️ Core Architecture Overview

The system is a fully functional Drag-and-Drop Website Builder utilizing modern web technologies. Unlike a standard statically generated React app, it orchestrates a complex flow between an **Editor State**, **Multi-Page State**, and a **Published Renderer**, and is entirely powered by the **Saved API Engine** on the backend.

**Tech Stack:**
- **Frontend Framework**: Vite + React 18 + TypeScript
- **Visual Editing Engine**: `@puckeditor/core` (Handles drag-and-drop, block definition, and JSON serialization)
- **Styling**: Tailwind CSS + Modular SCSS + ShadCN UI
- **Backend Connector**: Dynamic "Saved APIs" pointing to MongoDB Collections
- **State & Data Fetching**: TanStack Query (React Query) + Context API

---

## 🔀 The Dynamic Data Flow (The Secret Sauce)

The true power of this architecture lies in combining visual components with the backend's **Saved API Engine** (`api/saved-apis`). 

Instead of writing specific backend endpoints for "Contact Forms" or "User Dashboards", the architecture employs a universal bridge where frontend Editor Widgets map directly to highly configured, secure MongoDB operations.

### 1. Dynamic Form Submissions (Data Ingestion)

When a user drags a **Form Group** element onto the canvas (e.g., to create a Contact Us or Registration page):

1. **Configuration**: In the Puck Editor Settings Panel, the user specifies a **Saved API ID** for the form's `onSubmit` action.
2. **The Backend Tie**: That Saved API ID correlates to a `POST` configuration on the backend, pointing securely to a specific MongoDB database and collection (e.g., `prod_db` -> `contact_inquiries`).
3. **Execution (`mode: "view"`)**: When a real user fills the form on the published site, the form intercepts the submit event, gathers the `Input`, `Textarea`, and `Select` values, and sends a standard payload to:
   ```
   POST /api/saved-apis/:id/execute
   ```
4. **Validation & Insert**: The backend receives the payload, automatically assigns `createdAt` timestamps, validates that the submitted fields match the allowed `columns` defined in the Saved API, and executes an `insertMany` securely. 

*Result: Forms deployed instantly push data to production databases with zero backend routing code.*

### 2. Dynamic Dashboards (Data Consumption/BI)

When a user drags data visualization blocks like a **Table**, **AreaChart**, or **Superset Embed** onto the canvas:

1. **Configuration**: The user links the Chart or Table widget to a `GET` **Saved API ID**.
2. **The Backend Tie**: The Saved API is pre-configured with aggregation logic (e.g., "Get Active Users"). The configuration handles complex joins (`$lookup`), pipeline filtering (`$match`), and field restriction (`$project`).
3. **Execution (`mode: "view"`)**: When the page loads, the widget calls:
   ```
   POST /api/saved-apis/:id/execute 
   Payload: { "filter": {}, "limit": 100 }
   ```
4. **Rendering**: The backend dynamically translates the request and the `meta.joins` into a raw MongoDB Native Driver aggregation pipeline. The resulting data is sent back, and the Chart/Table components (using chart.js/TanStack Table) instantly visualize the data.

*Result: Users can construct secure BI dashboards and Admin Panels entirely via drag-and-drop, with all relational MongoDB logic obfuscated by the Saved API metadata.*

---

## 🔄 App Mode Orchestration (`src/app/App.tsx`)

The frontend application relies on a single source of truth—the Root App Component, which dictates the core Builder layout through **three discrete modes**:

### 1. `"pick"` Mode (Template Picker)
When a user authenticates, they are placed in the Template Picker.
- **Action:** Triggers an API call to `/api/sites` to fetch all sites created by the user.
- **UI Presentation:** Displays available "Pre-built Templates" (like a starting Dashboard template) alongside the user's existing sites.
- **Transition Result:** Clicking "Blank Canvas", a "Template", or an "Existing Site" transitions the mode to `"edit"`.

### 2. `"edit"` Mode (Puck Editor Workspace)
Mounts the `<PageEditor>` (`src/features/page-builder/editor/PuckEditor.tsx`).
- **Initialization:** Loads the saved structured JSON from `initialData`.
- **Multi-Page Management:** 
  - Sub-pages (`/about`, `/contact`) are managed through a custom `pagesPlugin` added to Puck. 
  - Swapping pages serializes the layout to a string locally, and injects the selected page's JSON into the primary Puck Data state.
- **Autosave/Manual Save Flow:** Triggers a request to `/api/sites`, passing:
  ```json
  {
    "title": "Dynamic CRM Site",
    "subdomain": "crm-demo",
    "content": "{...}", // Root page Puck JSON containing form and chart block layouts
    "pages": [{ "id": "page-x", "slug": "dashboard", "content": "{...}" }] 
  }
  ```
- **Transition Result:** Clicking "Publish" transitions the mode to `"view"`.

### 3. `"view"` Mode (The Live Renderer)
Mounts the `<PageRenderer>` (`src/features/page-builder/renderer/PageRenderer.tsx`).
- Hides the Editor layout and canvas controls.
- Uses `<Render config={editorConfig} data={pageData} />` from `@puckeditor/core`, strictly rendering the raw JSON into interactive React components.
- During this mode, the dynamic data hooks (React Query) attached to the configured Charts, Tables, and Forms actively execute their `/api/saved-apis/:id/execute` calls.
- Employs custom internal routing logic (`onNavigate`) so navigation links hot-swap the `pageData` payload to simulate MPA routing smoothly.

---

## 🛠️ The Complete Backend Contract

To drive this dynamic builder, the Node.js backend operates dual domains: the CMS layer for sites, and the Engine layer for the dynamic APIs.

### Domain 1: Configuration Management (Sites)
1. **`GET /api/sites`** -> Returns array of user sites.
2. **`POST /api/sites`** -> Saves serialized site JSON (`content`, `pages`).
3. **`PUT /api/sites/:id`** -> Updates site layout JSON.

### Domain 2: The Dynamic API Engine (Saved APIs)
1. **`POST /api/saved-apis`** -> Creates a new mapping. Defines the Target Database, Collection, Allowed Columns, Method (`GET`/`POST`/`PUT`/`DELETE`), and Aggregation Metadata (`joins`).
2. **`POST /api/saved-apis/:id/execute`** -> The Universal Executor. 
   - If `POST`: Parses payload, attaches timestamps, validates fields, and inserts documents (Used by Drag-and-Drop Forms).
   - If `GET`: Translates payload filters and `meta.joins` into MongoDB Aggregation Pipelines, fetches data, and returns formatted arrays (Used by Dashboards/Charts).
   - If `PUT/DELETE`: Modifies records strictly via `meta.matchField` logic.

---

## Summary

By wiring the frontend **Puck Editor Blocks** configuration directly into the **Saved API Execution Engine**, `webbuilder-new` transcends being just a static page builder. It is a full-stack low-code platform capable of spinning up functional CRMs, Data Entry Tools, and BI Dashboards in minutes.
