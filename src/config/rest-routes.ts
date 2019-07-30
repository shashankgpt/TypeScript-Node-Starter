
import { router as userRoutes } from "../app/routes/user-routes";
import { router as publicRoutes } from "../app/routes/public-routes";
import { router as logRoutes } from "../app/routes/log-routes";

export function initRestRoutes(app: any) {
  app.use("/user", userRoutes);
  app.use("/public", publicRoutes);
  app.use("/log", logRoutes);
}
