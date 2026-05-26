import axios from "axios";
import constants from "../constants";

const API = axios.create({
  baseURL: `${constants.HOST.replace(/\/+$/g, "")}/articles`,
});

export const fetchArticles = () => API.get("/");
export const fetchArticleByName = (name) =>
  API.get(`/name/${encodeURIComponent(name)}`);
export const createArticle = (article) => API.post("/", article);
export const updateArticle = (id, article) => API.put(`/${id}`, article);
export const deleteArticle = (id) => API.delete(`/${id}`);
