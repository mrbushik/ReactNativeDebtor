const apiUrl = process.env.EXPO_PUBLIC_API_URL?.trim() ?? "";

export const env = {
  apiUrl,
};

export const ensureApiUrl = () => {
  if (!env.apiUrl) {
    throw new Error("Set EXPO_PUBLIC_API_URL in your .env file.");
  }

  return env.apiUrl;
};
