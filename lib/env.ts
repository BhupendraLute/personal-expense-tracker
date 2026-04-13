const requiredEnv = (key: string, fallback?: string) => {
  const value = process.env[key] ?? fallback;

  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }

  return value;
};

export const env = {
  appUrl: requiredEnv("APP_URL", "http://localhost:3000"),
  mongodbUri: requiredEnv(
    "MONGODB_URI",
    "mongodb://127.0.0.1:27017/personal-expense-tracker"
  ),
  authSecret: process.env.AUTH_SECRET ?? process.env.JWT_SECRET ?? "development-only-secret-change-me",
  googleClientId: process.env.AUTH_GOOGLE_ID ?? process.env.GOOGLE_CLIENT_ID ?? "",
  googleClientSecret: process.env.AUTH_GOOGLE_SECRET ?? process.env.GOOGLE_CLIENT_SECRET ?? "",
};
