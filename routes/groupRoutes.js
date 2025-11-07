import express from "express";
import {
  getAllGroups,
  getSingleGroup,
  getMyGroups,
  createGroup,
  updateGroup,
  deleteGroup,
} from "../controllers/groupController.js";

const router = express.Router();

router.get("/", getAllGroups);
router.get("/:id", getSingleGroup);
router.get("/my-groups/:email", getMyGroups);
router.post("/", createGroup);
router.put("/:id", updateGroup);
router.delete("/:id", deleteGroup);

export default router;
