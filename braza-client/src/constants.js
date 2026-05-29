const DEFAULT_HOST = "http://localhost:8000/api";
const rawHost = import.meta.env.VITE_API_URL?.trim() || DEFAULT_HOST;
const HOST = rawHost.replace(/\/+$/g, "");

export default {
  HOST,
};
