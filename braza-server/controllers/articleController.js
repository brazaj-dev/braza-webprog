import Article from "../models/Article.js";

const getArticles = async (req, res) => {
  try {
    const articles = await Article.find({});
    res.json({ articles });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createArticle = async (req, res) => {
  try {
    const { name, title, cardDescription, description } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Article name is required" });
    }
    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Article title is required" });
    }
    if (!cardDescription || !cardDescription.trim()) {
      return res.status(400).json({ message: "Card description is required" });
    }
    if (!description || !description.trim()) {
      return res.status(400).json({ message: "Description is required" });
    }

    const existing = await Article.findOne({ name: req.body.name });
    if (existing) {
      return res.status(400).json({ message: "Article name already exists" });
    }

    const article = await Article.create(req.body);
    res.status(201).json({ article });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json({ article });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json({ message: "Article deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getArticleByName = async (req, res) => {
  try {
    const article = await Article.findOne({ name: req.params.name });
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json({ article });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  getArticleByName,
};
