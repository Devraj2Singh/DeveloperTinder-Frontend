const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:7000";

export async function apiGet(path) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    credentials: "include",
  });
  return res.json();
}

export async function apiPost(path, body) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  });
  return res.json();
}
