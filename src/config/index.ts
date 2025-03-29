import developmentConfig from "./development";
import productionConfig from "./production";

// Determine which configuration to use based on environment
const isDevelopment = import.meta.env.DEV || import.meta.env.MODE === "development";

// Select the appropriate configuration
const config = isDevelopment ? developmentConfig : productionConfig;

// Add a visible indicator for development mode
if (isDevelopment && typeof window !== "undefined") {
  // Add a development badge to the page
  const devBadge = document.createElement("div");
  devBadge.style.position = "fixed";
  devBadge.style.bottom = "10px";
  devBadge.style.right = "10px";
  devBadge.style.backgroundColor = "#ff5722";
  devBadge.style.color = "white";
  devBadge.style.padding = "5px 10px";
  devBadge.style.borderRadius = "4px";
  devBadge.style.fontWeight = "bold";
  devBadge.style.zIndex = "9999";
  devBadge.textContent = "تطوير محلي";
  document.body.appendChild(devBadge);

  console.log("🔧 Running in development mode");
}

export default config;