import { config } from "@/config";

const API_URL = config.apiUrl;

function getHeaders() {
  const token = localStorage.getItem("framely_token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export interface ConnectionItem {
  id: string;
  name: string;
  type: string;
  host: string;
  port: number;
  username?: string;
  authDb?: string;
  ssl: boolean;
  createdAt: string;
}

export const connectionService = {
  /** List all connections */
  list: async (): Promise<ConnectionItem[]> => {
    const res = await fetch(`${API_URL}/connections`, { headers: getHeaders() });
    const json = await res.json();
    return json.data || [];
  },

  /** Create a new connection */
  create: async (input: {
    name: string;
    host: string;
    port?: number;
    username?: string;
    password?: string;
    authDb?: string;
    connectionString?: string;
    ssl?: boolean;
  }): Promise<ConnectionItem> => {
    const res = await fetch(`${API_URL}/connections`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(input),
    });
    const json = await res.json();
    return json.data;
  },

  /** Test a connection */
  test: async (id: string): Promise<boolean> => {
    const res = await fetch(`${API_URL}/connections/${id}/test`, {
      method: "POST",
      headers: getHeaders(),
    });
    const json = await res.json();
    return json.connected;
  },

  /** Get databases for connection */
  getDatabases: async (id: string): Promise<string[]> => {
    const res = await fetch(`${API_URL}/connections/${id}/databases`, { headers: getHeaders() });
    const json = await res.json();
    return json.databases || [];
  },

  /** Get collections for database */
  getCollections: async (id: string, dbName: string): Promise<string[]> => {
    const res = await fetch(`${API_URL}/connections/${id}/databases/${dbName}/collections`, { headers: getHeaders() });
    const json = await res.json();
    return json.collections || [];
  },

  /** Get columns for collection */
  getColumns: async (id: string, dbName: string, collectionName: string): Promise<string[]> => {
    const res = await fetch(`${API_URL}/connections/${id}/databases/${dbName}/collections/${collectionName}/columns`, { headers: getHeaders() });
    const json = await res.json();
    return json.columns || [];
  }
};

export default connectionService;
