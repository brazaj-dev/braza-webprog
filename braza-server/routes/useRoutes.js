  import express from "express";

  import {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    loginUser,
  } from "../controllers/userController.js";
  import { verifyToken, verifyAdmin } from "../middleware/auth.js";

  const router = express.Router();

  router.post("/login", loginUser);
  router.post("/", createUser);

  router.get("/", verifyToken, getUsers); 
  router.put("/:id", verifyToken, updateUser);
  router.delete("/:id", verifyAdmin, deleteUser); 

  export default router;
