export interface Config {
  apiUrl: string;
  environment: "development" | "production";
  isLocalDev: boolean;
  supabase: {
    url: string;
    anonKey: string;
    mockMode: boolean;
  };
  features: {
    enableMockAuth: boolean;
    enableConsoleLogging: boolean;
    debugMode: boolean;
  };
}