import { index } from "./controller/admin/AdminController";
import views from "./routes/index";

/**
 * All application routes.
 */

export const ViewRoutes = [
  ...views,
  {
    path: "/actors",
    method: "get",
    action: index,
    meta: { requiresVisitor: false },
  },
];
