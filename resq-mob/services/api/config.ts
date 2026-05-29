import { Platform } from "react-native";
import Constants from "expo-constants";

const DEFAULT_API_PORT = "8000";
const DEFAULT_API_PATH = "/api";
const DEFAULT_ANDROID_EMULATOR_HOST = "10.0.2.2";

const normalizeUrl = (value: string) => value.replace(/\/+$/, "");

const getExpoHost = () => {
  const fromExpoConfig = Constants.expoConfig?.hostUri;
  const fromExpoGoConfig = Constants.expoGoConfig?.debuggerHost;
  const hostUri = fromExpoConfig || fromExpoGoConfig;

  if (!hostUri) {
    return null;
  }

  return hostUri.split(":")[0];
};

export const getApiBaseUrl = () => {
  const explicitUrl = process.env.EXPO_PUBLIC_API_URL;
  if (explicitUrl && explicitUrl.trim().length > 0) {
    return normalizeUrl(explicitUrl.trim());
  }

  const expoHost = getExpoHost();
  if (expoHost) {
    return `http://${expoHost}:${DEFAULT_API_PORT}${DEFAULT_API_PATH}`;
  }

  if (Platform.OS === "android") {
    return `http://${DEFAULT_ANDROID_EMULATOR_HOST}:${DEFAULT_API_PORT}${DEFAULT_API_PATH}`;
  }

  return `http://127.0.0.1:${DEFAULT_API_PORT}${DEFAULT_API_PATH}`;
};

export const API_BASE_URL = getApiBaseUrl();
