import { execSync } from "child_process";
import fs from "fs";
import path from "path";

try {
  console.log("=== Starting Monorepo Build ===");

  console.log("\n1. Installing frontend dependencies in braza-client...");
  execSync("npm install", {
    cwd: path.resolve("braza-client"),
    stdio: "inherit",
  });

  console.log("\n2. Building frontend in braza-client...");
  execSync("npm run build", {
    cwd: path.resolve("braza-client"),
    env: { ...process.env, VITE_API_URL: "/api" },
    stdio: "inherit",
  });

  console.log("\n3. Moving build output to root...");
  const srcDist = path.resolve("braza-client", "dist");
  const destDist = path.resolve("dist");

  if (fs.existsSync(destDist)) {
    console.log("Removing existing root dist directory...");
    fs.rmSync(destDist, { recursive: true, force: true });
  }

  fs.renameSync(srcDist, destDist);
  console.log("Successfully moved build output to root dist directory!");

  console.log("\n=== Monorepo Build Completed Successfully! ===");
} catch (error) {
  console.error("\n❌ Build failed:", error.message);
  process.exit(1);
}
