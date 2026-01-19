import { apiFetchJSON, apiFetchBlob } from "./apiClient";

// -------- PROFILE --------
export async function getPortfolioData() {
  const data = await apiFetchJSON("/auth/public/profile");
  return data.message;
}

// -------- RESUME --------
export async function downloadResume() {
  return apiFetchBlob("/resume/public/download");
}

// -------- CONTACT --------
export async function sendContactNotification(payload) {
  const data = await apiFetchJSON("/auth/notification", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return data;
}

// -------- PROJECTS --------
export async function getAllProjects() {
  const data = await apiFetchJSON("/project/all");
  return data.message;
}

export async function getProjectById(projectId) {
  const data = await apiFetchJSON("/project/read", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ projectId }),
  });

  return data.message;
}

// -------- BLOG --------
export async function getBlogById(blogId) {
  const data = await apiFetchJSON("/blog/public/read", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ blogId }),
  });

  return data.message;
}
