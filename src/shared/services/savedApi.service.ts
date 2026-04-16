import { config } from "@/config";

const API_URL = config.apiUrl;

function getHeaders() {
  const token = localStorage.getItem("framely_token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export interface SavedApiItem {
  id: string;
  apiName: string;
  description?: string;
  method: string;
  dbName?: string;
  collectionName?: string;
  columns: string[];
  meta?: any;
  connectionId: string;
  connection?: { id: string; name: string; type: string };
  createdAt: string;
}

export interface SavedApiCreateInput {
  apiName: string;
  method: string;
  connectionId: string;
  dbName?: string;
  collectionName?: string;
  columns?: string[];
  description?: string;
  meta?: any;
  payloadSample?: any;
}

export const savedApiService = {
  /** List all saved APIs */
  list: async (): Promise<SavedApiItem[]> => {
    const res = await fetch(`${API_URL}/saved-apis`, { headers: getHeaders() });
    const json = await res.json();
    return json.data || [];
  },

  /** Create a new saved API */
  create: async (input: SavedApiCreateInput): Promise<SavedApiItem> => {
    const res = await fetch(`${API_URL}/saved-apis`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(input),
    });
    const json = await res.json();
    return json.data;
  },

  /** Execute a saved API */
  execute: async (id: string, payload?: any): Promise<any> => {
    const res = await fetch(`${API_URL}/saved-apis/${id}/execute`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ payload }),
    });
    return res.json();
  },
};

export default savedApiService;
