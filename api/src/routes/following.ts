import { Router } from "express";
import { createFollwingController, getUserFollowersController, getUserFollowingsController } from "../controllers/following";

const router = Router();

router.post("/:userId", createFollwingController)
router.get("/followings/:userId", getUserFollowingsController)
router.get("/followers/:userId", getUserFollowersController)
export default router;