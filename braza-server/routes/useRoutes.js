import express from "express";
// import functions
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
} from "../controllers/userController.js";
import { verifyToken, verifyAdmin } from "../middleware/auth.js";

const router = express.Router();

// Public endpoints
router.post("/login", loginUser);
router.post("/", createUser); // Allow public registration

// Protected endpoints (require token)
router.get("/", verifyToken, getUsers); // Only authenticated users can view all users
router.put("/:id", verifyToken, updateUser); // Only authenticated users can update users
router.delete("/:id", verifyAdmin, deleteUser); // Only admins can delete users

export default router;
