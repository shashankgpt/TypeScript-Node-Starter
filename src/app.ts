import express from "express";
import dotenv from "dotenv";
import path from "path";
import * as mongooseFunction from "./config/mongoose";
import * as expressConfig from "./config/express";
import * as routeConfig from "./config/routes";

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: ".env.example" });

// API keys and Passport configuration

// Create Express server
const app = express();

// Connect to MongoDB

// Express configuration

mongooseFunction.mongooseInit(app);
expressConfig.initExpress(app);

app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

routeConfig.initRoutes(app);

app.use((req, res, next) => {
  // After successful login, redirect back to the intended page
  if (!req.user &&
    req.path !== "/login" &&
    req.path !== "/signup" &&
    !req.path.match(/^\/auth/) &&
    !req.path.match(/\./)) {
    req.session.returnTo = req.path;
  } else if (req.user &&
    req.path === "/account") {
    req.session.returnTo = req.path;
  }
  next();
});

app.use(
  express.static(path.join(__dirname, "public"), { maxAge: 31557600000 }),
);

export default app;
