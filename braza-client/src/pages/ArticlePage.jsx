import { useParams } from "react-router-dom";
import Button from "../components/Button";
import articles from "../assets/article-content.js";

function ArticlePage() {
  const { name } = useParams();
  const article = articles.find((article) => article.name === name);

  if (!article) {
    return (
      <div className="flex w-full flex-col gap-6">
        <section className="border border-slate-200 bg-slate-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold text-slate-900">
              Article not found
            </h1>
            <Button to="/articles" className="mt-6">
              Back to Articles
            </Button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-10">
      <section className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-slate-50 px-6 py-8 shadow-sm sm:px-8 lg:px-10">
        <div className="mb-6">
          <Button to="/articles">← Back to Articles</Button>
        </div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
          Article
        </p>
        <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
          {article.title}
        </h1>
        <p className="mt-3 text-sm text-slate-500">
          {article.name
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </p>
        <div className="mt-6 rounded-3xl border border-slate-200 bg-white px-4 py-4 text-sm text-slate-700 shadow-sm">
          <p className="font-semibold text-slate-900">
            Types of animals in this article:
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {article.types?.map((type) => (
              <span
                key={type}
                className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-slate-50 px-6 py-8 shadow-sm sm:px-8 lg:px-10">
        <div className="overflow-hidden rounded-[1.5rem] bg-slate-100 mb-8">
          <img
            src={article.image}
            alt={article.cardTitle || article.title}
            className="h-80 w-full object-cover object-center"
          />
        </div>

        <div className="prose prose-sm max-w-none space-y-4 text-slate-700">
          {article.content.map((paragraph, index) => (
            <p key={index} className="text-base leading-7 whitespace-pre-wrap">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6">
          <Button to="/articles">Back to Articles</Button>
        </div>
      </section>
    </div>
  );
}

export default ArticlePage;
