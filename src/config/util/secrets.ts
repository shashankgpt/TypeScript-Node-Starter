import logger from "./logger";
import dotenv from "dotenv";
import fs from "fs";

if (fs.existsSync(".env")) {
  logger.debug("Using .env file to supply config environment variables");
  dotenv.config({ path: ".env" });
} else {
  logger.debug("Using .env.example file to supply config environment variables");
  // you can delete this after you create your own .env file!
  dotenv.config({ path: ".env.example" });
}
export const ENVIRONMENT = process.env.NODE_ENV;
const prod = ENVIRONMENT === "production"; // Anything else is treated as 'dev'

export const SESSION_SECRET = process.env["SESSION_SECRET"];
export const MONGODB_URI = prod ? process.env["MONGODB_URI"] : process.env["MONGODB_URI_LOCAL"];

export const EMAIL_USERNAME = process.env["EMAIL_USERNAME"];
export const EMAIL_PASSWORD = process.env["EMAIL_PASSWORD"];

export const EMAIL_SERVICE = "gmail";
if (!SESSION_SECRET) {
  logger.error("No client secret. Set SESSION_SECRET environment variable.");
  process.exit(1);
}

if (!MONGODB_URI) {
  logger.error("No mongo connection string. Set MONGODB_URI environment variable.");
  process.exit(1);
}

if (!EMAIL_USERNAME) {
  logger.error("No username of gmail. Set EMAIL_USERNAME environment variable.");
  process.exit(1);
}

if (!EMAIL_PASSWORD) {
  logger.error("No password of gmail. Set EMAIL_PASSWORD environment variable.");
  process.exit(1);
}
