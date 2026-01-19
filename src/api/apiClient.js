class ApiClient {
  static API_KEY = "032363d4bdf4188e4e5f62fb72e001632a9f8bb674685c6e2908af0936510814";
  static BASE = "https://cyqmbtmb4c.execute-api.ap-south-1.amazonaws.com";

  static async request(path, options = {}) {
    const res = await fetch(`${ApiClient.BASE}${path}`, {
      ...options,
      headers: {
        "x-api-key": ApiClient.API_KEY,
        ...(options.headers || {}),
      },
    });

    return res;
  }

  static async requestJSON(path, options = {}) {
    const res = await ApiClient.request(path, options);
    const data = await res.json();

    if (!res.ok || data?.success === false) {
      throw new Error(data?.message || "API request failed");
    }

    return data;
  }

  static async requestBlob(path, options = {}) {
    const res = await ApiClient.request(path, options);

    if (!res.ok) {
      throw new Error("Failed to download file");
    }

    return res.blob();
  }
}

export default ApiClient;
