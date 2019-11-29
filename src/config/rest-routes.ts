
import { router as userRoutes } from "../app/routes/user-routes";
import { router as publicRoutes } from "../app/routes/public-routes";
import { router as logRoutes } from "../app/routes/log-routes";
import { router as emailTemplateRoutes } from "../app/routes/email.template-routes";
import { router as AdminRoutes } from "../app/routes/admin-routes";
import { router as BlogRoutes } from "../app/routes/blog-routes";

export function initRestRoutes(app: any) {
  app.use("/user", userRoutes);
  app.use("/public", publicRoutes);
  app.use("/log", logRoutes);
  app.use("/template", emailTemplateRoutes);
  app.use("/admin", AdminRoutes);
  app.use("/blog", BlogRoutes);
}
