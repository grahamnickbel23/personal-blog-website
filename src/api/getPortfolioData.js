import ApiClient from "./apiClient";

// profile
export async function getPortfolioData() {
  const data = await ApiClient.requestJSON("/auth/public/profile");
  return data.message;
}

// resume
export async function downloadResume() {
  return ApiClient.requestBlob("/resume/public/download");
}

// contac
export async function sendContactNotification(payload) {
  return ApiClient.requestJSON("/auth/notification", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}

// projects
export async function getAllProjects() {
  const data = await ApiClient.requestJSON("/project/all");
  return data.message;
}

export async function getProjectById(projectId) {
  const data = await ApiClient.requestJSON("/project/read", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ projectId }),
  });

  return data.message;
}

// blog
export async function getBlogById(blogId) {
  const data = await ApiClient.requestJSON("/blog/public/read", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ blogId }),
  });

  return data.message;
}
