// Production Configuration
export const config = {
  apiUrl: "/api", // Relative path for production deployment
  environment: "production",
  isLocalDev: false,
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL || "https://your-supabase-url.supabase.co",
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || "your-supabase-anon-key",
    mockMode: false, // Use actual Supabase in production
  },
  features: {
    enableMockAuth: false, // Use real authentication in production
    enableConsoleLogging: false,
    debugMode: false,
  },
};

export default config;