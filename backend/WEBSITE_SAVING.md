# Website Saving Logic Documentation

This document outlines the backend logic responsible for creating, updating, and saving websites in the Builder platform.

## 1. Data Model (`Page`)

The core entity for a website is the `Page` model defined in `prisma/schema.prisma`.

```prisma
model Page {
  id           String   @id @default(cuid())
  userId       String
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  title        String
  previewImage String?  @db.Text
  favicon      String?  @db.Text
  visible      Boolean  @default(false)
  
  // Main content (likely the home page JSON structure)
  content      String?  @db.Text
  
  // Additional pages structure (JSON array of { id, slug, title, content })
  pages        Json?    
  
  subdomain    String   @unique

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Key Fields:
- **`content`**: Stores the JSON structure of the main page (components, layout, styles).
- **`pages`**: A JSON field that stores an array of additional pages for the website. Each object in this array typically contains its own `content` field.
- **`subdomain`**: Unique identifier for the published site (e.g., `my-site`.builder.com).
- **`visible`**: Boolean flag to toggle site visibility (publish status).

---

## 2. API Endpoints

The logic is implemented in `src/routes/sites.ts`. All endpoints require authentication via the `authenticateToken` middleware.

### Create Website (`POST /`)

Responsible for initializing a new website.

**Logic Flow:**
1.  **Validation**: Validates `title` and `subdomain` using Zod.
    -   `title`: 1-100 characters.
    -   `subdomain`: Lowercase alphanumeric with hyphens only.
2.  **Uniqueness Check**: Checks if the `subdomain` is already taken (`prisma.page.findFirst`).
3.  **Creation**: Creates a new `Page` record linked to the authenticated user.
4.  **Logging**: Logs the `sites_create` action.

**Request Body:**
```json
{
  "title": "My Portfolio",
  "subdomain": "portfolio-v1"
}
```

### Update Website (`PUT /:id`)

Responsible for saving changes to the website, including content updates, page additions, and metadata changes.

**Logic Flow:**
1.  **Authorization**: Verifies the site exists and belongs to the authenticated user.
2.  **Partial Update**: Accepts partial fields in the request body. Only provided fields are updated.
3.  **Persistence**: Updates the record in the database using `prisma.page.update`.
4.  **Logging**: Logs the `sites_update` action.

**Request Body (Partial):**
```json
{
  "title": "New Title",
  "content": "{\"root\": {...}}",   // Serialized JSON of the editor state
  "pages": [                        // Array of additional pages
    { "id": "1", "slug": "about", "content": "..." }
  ],
  "previewImage": "data:image/png;base64,...",
  "visible": true
}
```

### Get Website (`GET /:id`)

Retrieves the full site data, including the main `content` and the `pages` JSON, allowing the frontend editor to load the saved state.

---

## 3. Saving & Publishing Flow

1.  **Auto-Save / Manual Save**: The frontend editor collects the current state of the canvas (serialized JSON).
2.  **Payload Construction**: The frontend constructs a payload containing the `content` string and the `pages` array.
3.  **API Call**: A `PUT` request is sent to `/sites/:id`.
4.  **Database Write**: Prisma updates the specific columns. Since `content` and `pages` can be large, they are stored as `Text` and `Json` types respectively in PostgreSQL.

## 4. Key Files

-   **`backend/src/routes/sites.ts`**: Contains the Express route handlers for `POST` and `PUT` operations.
-   **`backend/prisma/schema.prisma`**: Defines the database schema for the `Page` model.
