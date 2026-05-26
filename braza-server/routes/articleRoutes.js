import express from "express";
import {
  createArticle,
  deleteArticle,
  getArticles,
  getArticleByName,
  updateArticle,
} from "../controllers/articleController.js";

const router = express.Router();

router.route("/").get(getArticles).post(createArticle);
router.route("/name/:name").get(getArticleByName);
router.route("/:id").put(updateArticle).delete(deleteArticle);

export default router;
