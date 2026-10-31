import { PermissionsAndroid, Platform } from "react-native";

const localHost = Platform.OS === "android" ? "10.0.2.2" : "127.0.0.1";
export const baseURL =
  process.env.EXPO_PUBLIC_API_URL ?? `http://${localHost}:8000/api/v1`;

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

export async function get<T>(path: string): Promise<T> {
  const url = `${baseURL.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
  await ensureLocalNetworkPermission();

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`GET ${url} failed with status ${response.status}`);
    }

    return (await response.json()) as T;
  } finally {
    clearTimeout(timeout);
  }
}