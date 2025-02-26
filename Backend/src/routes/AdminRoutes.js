import { Router } from "express";
import { contactUs, userStats } from "../controllers/Admin.controller.js";
import { isLoggedIn, authorizedRoles } from "../middlewares/auth.middleware.js";

const router = Router();

// {{URL}}/api/v1/
router.route("/contact").post(contactUs);
router.route("/admin/stats/users").get(isLoggedIn, authorizedRoles("ADMIN"), userStats);

export default router;