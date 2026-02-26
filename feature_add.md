# 🏗️ Builder — Visual Website Editor

A drag-and-drop website builder with a visual canvas editor. Elements are organized in the **left sidebar** under the **Elements** section, grouped by category.

---

## 📐 Sidebar Structure

```
Left Sidebar → Elements
├── Text
├── Basic
├── Media
├── Link
├── Form
└── Content
```

> All elements are **drag-and-drop** — grab any element card from the sidebar and drop it onto the canvas. Click an element on the canvas to select it and edit its properties in the **right Settings panel**.

---


## 🔤 Text Elements

Text elements render inline-editable HTML text tags. **Click directly on any text element on the canvas to type/edit the text in place.** Styles (font size, weight, color, alignment) are controlled from the Settings panel.

### Heading 1 – Heading 6

| Element | HTML Tag | Default Text | Usage |
|---------|----------|--------------|-------|
| Heading 1 | `<h1>` | `Heading 1` | Main page title |
| Heading 2 | `<h2>` | `Heading 2` | Section title |
| Heading 3 | `<h3>` | `Heading 3` | Sub-section title |
| Heading 4 | `<h4>` | `Heading 4` | Card headers, small sections |
| Heading 5 | `<h5>` | `Heading 5` | Minor headings |
| Heading 6 | `<h6>` | `Heading 6` | Smallest heading level |

> **How it works:** These use the `contentEditable` attribute in edit mode. Click to type. On blur, the new text is saved to the element's `innerText` content field.

### Paragraph

| Property | Description |
|----------|-------------|
| Type | `p` |
| Tag | `<p>` |
| Usage | Body text blocks. Click to edit inline. |

### Span

| Property | Description |
|----------|-------------|
| Type | `span` |
| Tag | `<span>` |
| Usage | Inline text for styling a portion of content differently — e.g., highlighted words inside another text block. |

---

## 🧩 Basic Elements

### Image

| Setting | Description |
|---------|-------------|
| `imageUrl` | URL of the image to display (paste any public image URL) |
| `altText` | Alt text for accessibility |
| Dimensions | Set width/height in the Style settings |

**How it works:** Renders a `<img>` inside a 16:9 `AspectRatio` wrapper. If no URL is set, a placeholder message is shown in the canvas. Images are fully styled (border-radius, object-fit, etc.).

### Button

| Setting | Description |
|---------|-------------|
| `buttonLabel` | The text shown on the button (default: `"Button"`) |
| `href` | Optional link target. Supports: internal page slug (`/about`), external URL (`https://...`), `mailto:`, `tel:` |

**How it works:**
- Without `href` → renders a plain `<button>` element.
- With an **external** `href` (starts with `https://`, `mailto:`, `tel:`) → opens in a new tab.
- With an **internal** `href` (e.g., `/about`) → navigates to that page within the builder (page switching is handled internally by the editor context).
- In **live/preview mode**, clicks trigger actual navigation. In edit mode, clicks are suppressed.

---

## 🎬 Media Elements

### Video

| Setting | Description |
|---------|-------------|
| `videoUrl` | Direct URL to a video file (MP4, WebM, etc.) |
| `controls` | Toggle to show/hide browser video controls (default: `true`) |

**How it works:** Renders a native `<video>` element inside a 16:9 aspect ratio container. Supports `autoplay`, `loop`, and `muted` via styles.

### Audio

| Setting | Description |
|---------|-------------|
| `audioUrl` | URL to an audio file (MP3, OGG, WAV, etc.) |
| `controls` | Toggle to show/hide browser audio controls (default: `true`) |

**How it works:** Renders a native HTML `<audio>` element that spans the full width of its parent container.

### Marquee

| Setting | Description |
|---------|-------------|
| `marqueeText` | The text that scrolls horizontally (default: `"Scrolling text..."`) |

**How it works:** Uses a CSS keyframe animation (`marquee-scroll`) to continuously scroll the text from right to left. The text is duplicated for seamless looping.

### Icon

| Setting | Description |
|---------|-------------|
| `iconName` | Name of any [Lucide icon](https://lucide.dev/icons/) (e.g., `"Star"`, `"Heart"`, `"ArrowRight"`) |
| `href` | Optional URL — wraps the icon in an `<a>` tag linking to the URL in a new tab |
| `fontSize` | Controls the icon size (in `px` or `rem`) via the style panel |

**How it works:** Dynamically resolves the icon name against the full Lucide icon library. Falls back to `Star` if the name is invalid.

### Embed

| Setting | Description |
|---------|-------------|
| `embedUrl` | Any `<iframe>`-compatible URL — YouTube embeds (`https://www.youtube.com/embed/...`), Google Maps, Figma, Loom, etc. |

**How it works:** Renders an `<iframe>` inside a 16:9 AspectRatio wrapper. In **edit mode**, `pointer-events: none` is applied so you can still select/move the element without accidentally clicking inside the iframe. In **live/preview mode**, the iframe is fully interactive.

---

## 🔗 Link Elements

### Link

| Setting | Description |
|---------|-------------|
| `innerText` | The clickable text to display (default: `"Link"`) |
| `href` | Destination URL or internal page path |

**How it works:**
- **External links** (starting with `https://`, `mailto:`, `tel:`) open in a new tab with `rel="noopener noreferrer"`.
- **Internal links** (e.g., `/contact`) resolve to the matching page by `slug` or `id` and navigate the builder's canvas to that page.
- In **edit mode**, all clicks are suppressed (so you can select and style freely). Navigation only fires in **live/preview mode**.

---

## 📋 Form Elements

Form elements are typically placed **inside a Form layout container**. The Form element handles the `<form>` wrapper and submission behavior.

### Form

| Property | Description |
|----------|-------------|
| Type | `form` (layout group) |
| Usage | Drag onto canvas to create a `<form>` wrapper. Drop Input, Textarea, Select, Checkbox, Radio, and Submit elements inside it. |

### Input

| Setting | Description |
|---------|-------------|
| `inputType` | HTML input type: `text`, `email`, `password`, `number`, `tel`, `url`, `date`, etc. (default: `"text"`) |
| `placeholder` | Placeholder text shown inside the input |

**How it works:** Renders a styled `<input>` element. The input type controls native browser validation and keyboard types on mobile.

### Textarea

| Setting | Description |
|---------|-------------|
| `placeholder` | Placeholder text |
| Rows | Controlled via height style |

**How it works:** Renders a `<textarea>` for multi-line text input.

### Select (Dropdown)

| Setting | Description |
|---------|-------------|
| `options` | Newline-separated list of option labels (e.g., `Option 1\nOption 2\nOption 3`) |
| `placeholder` | The initial empty state label (default: `"Select..."`) |

**How it works:** Each line in `options` becomes a `<SelectItem>`. The user picks one from the dropdown in live mode.

### Checkbox

| Setting | Description |
|---------|-------------|
| `innerText` | Label text displayed next to the checkbox (default: `"Checkbox"`) |
| `checked` | Whether the checkbox starts pre-checked |

**How it works:** In **edit mode**, the checkbox reflects the configured `checked` value and is not interactive. In **live/preview mode**, the user can toggle the checkbox and its state is tracked locally via React state.

### Radio

| Setting | Description |
|---------|-------------|
| `innerText` | Label text displayed next to the radio button (default: `"Radio"`) |
| `name` | Radio group name — radio buttons with the same `name` are mutually exclusive |
| `value` | The value submitted for this radio option (default: `"option1"`) |

**How it works:** Radio buttons within the same parent container are automatically scoped to the same group (using the parent's element ID as a suffix) so they work independently across multiple radio groups on the same page.

### Submit Button

| Property | Description |
|----------|-------------|
| Type | `submitButton` |
| Usage | A `<button type="submit">` that submits the enclosing `<form>`. Style it via the settings panel. |

---

## 📦 Content Elements

### Ordered List

| Setting | Description |
|---------|-------------|
| `listItems` | Newline-separated list items (e.g., `Step 1\nStep 2\nStep 3`) |

**How it works:** Renders a `<ol>` with `list-decimal` styling. Each line becomes a `<li>`.

### Unordered List

| Setting | Description |
|---------|-------------|
| `listItems` | Newline-separated list items |

**How it works:** Renders a `<ul>` with `list-disc` styling. Each line becomes a `<li>`.

### List Item

| Property | Description |
|----------|-------------|
| Type | `li` |
| Usage | A single `<li>` element — use inside Ordered/Unordered List containers. |

### Blockquote

| Property | Description |
|----------|-------------|
| Type | `blockquote` |
| Tag | `<blockquote>` |
| Usage | Renders a styled quotation block. Click to edit text inline. |

### Code

| Property | Description |
|----------|-------------|
| Type | `code` |
| Tag | `<code>` |
| Usage | Inline or block code snippet with monospace font. Click to edit. |

### Divider

| Property | Description |
|----------|-------------|
| Type | `hr` |
| Tag | `<hr>` |
| Usage | A horizontal rule to visually separate sections. Style via border-color, thickness. |

### Badge

| Property | Description |
|----------|-------------|
| Type | `badge` |
| Usage | A small inline label/tag (e.g., "New", "Beta", "Sale"). Click to edit the badge text. Style with background color and border-radius for pill shapes. |

### Spacer

| Property | Description |
|----------|-------------|
| Type | `spacer` |
| Usage | An invisible block used to add vertical or horizontal white space between elements. Set `height` in the style panel. |

### Table

| Setting | Description |
|---------|-------------|
| `tableHeaders` | Comma-separated column headers (e.g., `Name, Age, City`) |
| `tableRows` | Newline-separated rows; each row is comma-separated cells (e.g., `Alice, 30, NY\nBob, 25, LA`) |

**How it works:** Renders a full `<table>` with a styled `<thead>` (muted background) and `<tbody>`. Columns auto-size to content.

### Accordion

| Setting | Description |
|---------|-------------|
| `accordionItems` | Newline-separated items, each formatted as `Label | Body content` (e.g., `FAQ 1 | Answer 1\nFAQ 2 | Answer 2`) |

**How it works:** Renders a collapsible accordion (single-open). Clicking a trigger header expands/collapses its content panel. Useful for FAQs, feature lists, etc.

### Tabs

| Setting | Description |
|---------|-------------|
| `tabLabels` | Comma-separated tab names (e.g., `Overview, Features, Pricing`) |
| `tabContents` | Newline-separated content per tab (position-matched to labels) |

**How it works:** Renders a tabbed interface. Clicking a tab label shows its corresponding content. The first tab is active by default.

### Card

| Setting | Description |
|---------|-------------|
| `cardTitle` | The card's heading (default: `"Card Title"`) |
| `cardBody` | Descriptive body text (default: `"Card body text."`) |
| `cardImageUrl` | Optional image URL shown at the top of the card in a 16:9 ratio |

**How it works:** Renders a styled card component with an optional cover image, a title in `CardHeader`, and body text in `CardContent`. Style with shadows, borders, and border-radius.

---

## 🧩 Widget Tab

The **Widget** tab provides integrations with external data/chart tools.

### Superset Charts

Drag a chart from your connected [Apache Superset](https://superset.apache.org/) instance directly onto the canvas. The chart renders as an embedded iframe from your Superset base URL.

> Requires a valid Superset API connection configured in the backend (`/api/superset/charts`).

### ETL (Extract, Load & Transform)

Drag the ETL widget onto the canvas to embed a data pipeline viewer/editor. This widget connects to the backend ETL service.

---

## 🎛️ How the Editor Works

1. **Drag** any element from the sidebar onto the canvas.
2. **Click** to select an element — a blue selection ring appears with resize handles.
3. **Edit content** directly on the canvas (for text elements) or via the **right Settings panel** for all other element-specific properties.
4. **Style** the element — adjust dimensions, colors, fonts, spacing, borders, shadows, and opacity in the **Styles** section of the right panel.
5. **Responsive** — switch between Desktop, Tablet, and Mobile views at the top to preview and edit responsive styling per breakpoint.
6. **Preview** — click the 👁️ eye icon to enter Preview mode and test all interactive elements (links, buttons, forms, etc.).
7. **Save** — click **Save** to persist changes. Toggle **Draft / Public** to control site visibility.
8. **Pages** — use the left sidebar site panel to add new pages and switch between them.

---

## 🗂️ Project Structure

```
frontend/src/pages/editor/
├── elements.ts              # Master list of all elements (id, label, group, category, icon)
├── ComponentsTab.tsx        # Left sidebar: Layout tab with Layout + Elements sections
├── LeftSidebar.tsx          # Sidebar container and tab navigation
├── SettingsTab.tsx          # Right panel: all element-specific and style settings
├── EditorPage.tsx           # Main editor page layout
├── editor/
│   ├── ElementWrapper.tsx   # HOC: selection, drag, resize, context menu for every element
│   ├── Container.tsx        # All layout container logic and rendering
│   ├── Text.tsx             # Headings, paragraph, span (inline editable)
│   ├── Button.tsx           # Button with internal/external navigation
│   ├── Link.tsx             # Anchor tag with internal/external navigation
│   ├── Image.tsx            # Image with AspectRatio wrapper
│   ├── Video.tsx            # Video player
│   ├── Audio.tsx            # Audio player
│   ├── Marquee.tsx          # Scrolling text animation
│   ├── Icon.tsx             # Lucide icon renderer (optional link)
│   ├── Embed.tsx            # iframe embed (YouTube, Maps, etc.)
│   ├── Input.tsx            # Form input field
│   ├── Textarea.tsx         # Multi-line form input
│   ├── Select.tsx           # Dropdown select
│   ├── Checkbox.tsx         # Checkbox with label
│   ├── Radio.tsx            # Radio button with scoped group
│   ├── SubmitButton.tsx     # Form submit button
│   ├── List.tsx             # Ordered and unordered lists
│   ├── Blockquote.tsx       # Quote block
│   ├── Code.tsx             # Code snippet
│   ├── Divider.tsx          # Horizontal rule
│   ├── Badge.tsx            # Inline badge/tag
│   ├── Spacer.tsx           # White-space block
│   ├── Table.tsx            # Data table
│   ├── Accordion.tsx        # Collapsible accordion
│   ├── Tabs.tsx             # Tabbed content
│   └── Card.tsx             # Content card with image, title, body
```
