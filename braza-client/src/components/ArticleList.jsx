import { Link } from "react-router-dom";
import Button from "./Button";

const ArticleList = ({ articles }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {articles.map((article, index) => (
        <article
          key={article.name}
          className="rounded-3xl border border-slate-200 bg-slate-50 p-4"
        >
          <div className="overflow-hidden rounded-[1.25rem] border border-slate-200 bg-white">
            <img
              src={article.image}
              alt={article.cardTitle || article.title}
              className="h-48 w-full object-cover object-center"
            />
          </div>
          <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
            Article {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-slate-900">
            {article.cardTitle || article.title}
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            {article.cardDescription || article.content[0].substring(0, 150)}
          </p>
          <Link to={`/articles/${article.name}`}>
            <Button className="mt-4">Read More</Button>
          </Link>
        </article>
      ))}
    </div>
  );
};

export default ArticleList;
