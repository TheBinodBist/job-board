import { PermissionsAndroid, Platform } from "react-native";

const localHost = Platform.OS === "android" ? "10.0.2.2" : "127.0.0.1";
export const baseURL =
  process.env.EXPO_PUBLIC_API_URL ?? `http://${localHost}:8000/api/v1`;

let accessToken = "";

export function setApiAccessToken(token: string) {
  accessToken = token;
}

function getErrorMessage(data: unknown): string | undefined {
  if (typeof data === "string") return data;
  if (Array.isArray(data)) {
    return data.map(getErrorMessage).filter(Boolean).join("; ") || undefined;
  }
  if (typeof data !== "object" || data === null) return undefined;

  const response = data as Record<string, unknown>;
  for (const key of ["error", "detail", "message"]) {
    if (typeof response[key] === "string") return response[key];
  }

  const messages = Object.entries(response).flatMap(([field, value]) => {
    const message = getErrorMessage(value);
    return message ? [`${field}: ${message}`] : [];
  });
  return messages.length ? messages.join("; ") : undefined;
}

async function ensureLocalNetworkPermission() {
  if (Platform.OS !== "android" || Number(Platform.Version) < 37) return;

  const permission = PermissionsAndroid.PERMISSIONS.ACCESS_LOCAL_NETWORK;
  const isGranted = await PermissionsAndroid.check(permission);

  if (isGranted) return;

  const result = await PermissionsAndroid.request(permission, {
    title: "Allow local network access",
    message: "JobBoard needs local network access to load jobs from your development server.",
    buttonPositive: "Allow",
    buttonNegative: "Don't allow",
  });

  if (result !== PermissionsAndroid.RESULTS.GRANTED) {
    throw new Error("Local network access is required to load jobs on this Android device.");
  }
}

async function request<T>(
  path: string,
  method: "GET" | "POST" | "DELETE",
  body?: Record<string, unknown>,
): Promise<T> {
  const url = `${baseURL.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
  await ensureLocalNetworkPermission();

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(url, {
      method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(accessToken ? { Authorization: "Bearer " + accessToken } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    const data = (await response.json().catch(() => null)) as T | null;

    if (!response.ok) {
      const message = getErrorMessage(data) ?? "Request failed";
      throw new Error(`Request failed with status ${response.status}: ${message}`);
    }

    return data as T;
  } finally {
    clearTimeout(timeout);
  }
}

export async function get<T>(path: string): Promise<T> {
  return request<T>(path, "GET");
}

export async function post<T>(path: string, body: Record<string, unknown>): Promise<T> {
  return request<T>(path, "POST", body);
}

export async function del<T>(path: string): Promise<T> {
  return request<T>(path, "DELETE");
}