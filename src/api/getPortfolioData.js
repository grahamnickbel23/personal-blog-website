export async function getPortfolioData() {
  const API_KEY = "032363d4bdf4188e4e5f62fb72e001632a9f8bb674685c6e2908af0936510814";
  const BASE = "https://cyqmbtmb4c.execute-api.ap-south-1.amazonaws.com";

  const res = await fetch(`${BASE}/auth/public/profile`, {
    headers: { "x-api-key": API_KEY }
  });

  const data = await res.json();
  return data.message;
}

export async function downloadResume() {
  const API_KEY = import.meta.env.VITE_PUBLIC_API_KEY;
  const BASE = import.meta.env.VITE_API_BASE;

  const res = await fetch(`${BASE}/resume/public/download`, {
    headers: { "x-api-key": API_KEY }
  });

  if (!res.ok) {
    throw new Error('Failed to download resume');
  }

  return res.blob();
}

export async function sendContactNotification(data) {
  const API_KEY = import.meta.env.VITE_PUBLIC_API_KEY;
  const BASE = import.meta.env.VITE_API_BASE;

  const res = await fetch(`${BASE}/auth/notification`, {
    method: 'POST',
    headers: {
      "x-api-key": API_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    throw new Error('Failed to send message');
  }

  return res.json();
}

export async function getAllProjects() {
  const API_KEY = import.meta.env.VITE_PUBLIC_API_KEY;
  const BASE = import.meta.env.VITE_API_BASE;

  const res = await fetch(`${BASE}/project/all`, {
    headers: { "x-api-key": API_KEY }
  });

  const data = await res.json();
  return data.message;
}

export async function getProjectById(projectId) {
  const API_KEY = import.meta.env.VITE_PUBLIC_API_KEY;
  const BASE = import.meta.env.VITE_API_BASE;

  const res = await fetch(`${BASE}/project/read`, {
    method: 'POST',
    headers: {
      "x-api-key": API_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ projectId })
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Failed to fetch project');
  }

  return data.message;
}

export async function getBlogById(blogId) {
  const API_KEY = import.meta.env.VITE_PUBLIC_API_KEY;
  const BASE = import.meta.env.VITE_API_BASE;

  const res = await fetch(`${BASE}/blog/public/read`, {
    method: 'POST',
    headers: {
      "x-api-key": API_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ blogId })
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Failed to fetch blog');
  }

  return data.message;
}
