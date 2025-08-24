let tokenProvider = null;

// Stores function ref to get a token when needed
export function setAuthTokenProvider(fn) {
  tokenProvider = fn;
}

export async function makeRequest(endpoint, options = {}) {
  // Create URL
  const base = import.meta.env.VITE_API_URL || "/api";
  const url = endpoint.startsWith("http") ? endpoint : `${base}/${endpoint}`;

  // Setup Headers and Content-type
  const headers = new Headers(options.headers || {});
  if (!headers.has("Content-Type"))
    headers.set("Content-Type", "application/json");

  // Get token if needed
  let token = null;
  if (typeof tokenProvider === "function") {
    try {
      token = await tokenProvider();
    } catch {
      token = null;
    }
  }

  // Add token to header
  if (typeof token === "string" && token.length > 0) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  // Make API request
  const response = await fetch(url, { ...options, headers });
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
      errorData?.detail || `${response.status} ${response.statusText}`
    );
  }

  // Return response
  const contentType = response.headers.get("content-type") || "";
  return contentType.includes("application/json")
    ? response.json()
    : response.text();
}
