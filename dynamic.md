# Sage DB Viewer (Database Viewer)

A modern, comprehensive database management and BI tool built with a Node.js backend and a Vite + React + TypeScript frontend. It allows you to connect to your databases (MongoDB, etc.), browse data, visualize collections, and dynamically create, save, and execute custom APIs against your data.

## Features

- 🔐 **User Authentication** (Login/Register with JWT)
- 🔌 **Database Connection Management**
- 📊 **Database and Collection Browsing**
- 📋 **Data Grid View** with Pagination
- 📈 **Collection Statistics and Schema Exploration**
- 🛠️ **Saved APIs (Dynamic API Builder)**
- 🎨 **Modern UI** built with shadcn/ui components

## Tech Stack

### Backend
- Node.js + Express
- MongoDB (Mongoose for app configuration data, native MongoDB driver for user connections)
- JWT Authentication
- crypto-js for password encryption

### Frontend
- Vite + React + TypeScript
- Redux Toolkit for state management
- shadcn/ui for UI components
- TanStack Table for data grids
- React Router for navigation

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB installed and running

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/dbviewer
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRE=7d
   ENCRYPTION_KEY=your-32-character-encryption-key!!
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the frontend directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

---

## 🔄 Core Flows & Working

### 1. Connection Management Flow
Users can securely create and manage database connections:
1. User provides connection string/credentials.
2. The backend encrypts the password using `crypto-js` and an `ENCRYPTION_KEY`.
3. The connection is tested using the native driver before saving into the config database (Mongoose).
4. When performing an action, the backend decrypts the credentials temporarily to establish a direct driver connection with the target database.

### 2. Database Browsing Flow
Once a connection is established, users can view metadata:
1. The backend lists databases available for the connected user.
2. Users can fetch collections, view sample data, and inspect schemas recursively.

---

## ⚡ API Creation and Execution (Saved APIs)

One of the core features is the **Saved API Engine**, which allows you to define a virtual endpoint mapping to a specific query, operation, or pipeline on your database, and then execute it on demand. 

### Saved API Concept
Instead of writing boilerplate backend routes for every new database collection, you create a "Saved API" specifying the database, collection, allowed columns, method (GET, POST, PUT, DELETE), and additional metadata like Join configurations or update fields.

The backend routes are mounted at `/api/saved-apis`.

### Creating a Saved API
When you create a saved API (`POST /api/saved-apis`), you define its behavior:
```json
{
  "apiName": "Get Active Users",
  "method": "GET",
  "connectionId": "<your_connection_id>",
  "dbName": "production_db",
  "collectionName": "users",
  "columns": ["username", "email", "status"],
  "meta": {
    "joins": [
      {
        "from": "user_profiles",
        "localField": "_id",
        "foreignField": "userId",
        "as": "profile",
        "unwind": true
      }
    ]
  }
}
```

### Executing a Saved API
Once created, you can execute it dynamically via:
`POST /api/saved-apis/:id/execute`

The behavior of execution relies heavily on the `method` defined in the Saved API:

#### 1. GET (Data Fetching & Joining)
- **Basic Fetch**: It applies filtering, sorting, limiting, and pagination based on the incoming `req.body.payload`:
  ```json
  {
    "payload": {
      "filter": { "status": "active" },
      "limit": 50,
      "skip": 0,
      "sort": { "createdAt": -1 }
    }
  }
  ```
- **Joins (Aggregations)**: If the API's `meta.joins` is configured, the backend automatically constructs a MongoDB Aggregation Pipeline:
  - `$match`: Applies the filter.
  - `$lookup` / `$unwind`: Dynamically built from `meta.joins` to perform Left Joins.
  - `$project`: Ensures only the permitted `columns` are returned.
  - `$sort` / `$skip` / `$limit`: Applies pagination.

#### 2. POST (Creating Documents)
- Expects a single object or an array of objects in `req.body.payload`.
- Automatically assigns `_id` and timestamp fields (`createdAt`, `updatedAt`).
- Executes `insertMany` securely against the configured collection.

#### 3. PUT (Updating Documents)
- Expects a payload containing the data to update.
- **Match Mechanism**: Uses `meta.matchField` (defaults to `_id`) to identify the document(s) to update. 
- **Security Check**: Only fields defined in the Saved API's `columns` array are allowed to be updated. It actively filters out restricted fields.
- Executes iterative `updateOne` operations to ensure data integrity.

#### 4. DELETE (Removing Documents)
- Similar to PUT, it uses the `meta.matchField` or fallback standard IDs (`_id`, `id`) to locate the documents.
- Maps over the payload array to delete matching documents sequentially via `deleteMany`, safely returning the removed documents' signatures.

### Why is this powerful?
- **No Code Required**: Frontend developers or data analysts can expose new data points simply via UI configuration.
- **Secure**: Field projection, match-field overrides, and encrypted database connections keep the data safe.
- **Dynamic Aggregation**: Relational `JOIN` logic in MongoDB is handled directly via configuration objects.

---

## 📂 Project Structure

```
product/
├── backend/
│   ├── src/
│   │   ├── config/          # Database configuration
│   │   ├── controllers/     # Route controllers (savedApi.controller.js)
│   │   ├── middleware/      # Auth, security, and rate-limiting
│   │   ├── models/          # Mongoose models
│   │   ├── routes/          # API routes (savedApi.routes.js, etc.)
│   │   ├── services/        # Query execution and connection services
│   │   └── workers/         # Background job workers (BullMQ)
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # BiBuilder, App Viewer, Dashboard
│   │   ├── services/        # API service layer
│   │   ├── store/           # Redux Toolkit store configurations
│   │   └── utils/           # Utility functions
│   └── package.json
└── README.md
```

## License

ISC
