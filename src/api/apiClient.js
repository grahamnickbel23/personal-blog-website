const API_KEY = "032363d4bdf4188e4e5f62fb72e001632a9f8bb674685c6e2908af0936510814";
const BASE = "https://cyqmbtmb4c.execute-api.ap-south-1.amazonaws.com";

/**
 * Core request helper
 */
async function apiFetch(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      "x-api-key": API_KEY,
      ...(options.headers || {}),
    },
  });

  return res;
}

/**
 * JSON helper
 */
async function apiFetchJSON(path, options = {}) {
  const res = await apiFetch(path, options);

  const data = await res.json();

  if (!res.ok || data?.success === false) {
    throw new Error(data?.message || "API request failed");
  }

  return data;
}

/**
 * Blob helper (for files)
 */
async function apiFetchBlob(path, options = {}) {
  const res = await apiFetch(path, options);

  if (!res.ok) {
    throw new Error("Failed to download file");
  }

  return res.blob();
}

export { apiFetch, apiFetchJSON, apiFetchBlob };
