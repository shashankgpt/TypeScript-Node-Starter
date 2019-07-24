
import { router as userRoutes } from "../app/routes/user-routes";
import { router as publicRoutes } from "../app/routes/public-routes";

export function initRestRoutes(app: any) {
  app.use("/user", userRoutes);
  app.use("/public", publicRoutes);
}
