import { Router } from "express";
import { createCommentController, getCommentByParentIdController, getCommentByProductIdController, getParentCommentByProductIdController } from "../controllers/comments";

const router = Router();

router.post("/:userId", createCommentController);
router.get("/:productId", getCommentByProductIdController);
router.get("/parentcomments/:productId", getParentCommentByProductIdController)
router.get("/childcomments/:parentId", getCommentByParentIdController)
export default router;