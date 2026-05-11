import Button from "../../components/Button";
import ArticleList from "../../components/ArticleList";
import articles from "../../data/article-content.js";

const ArticleListPage = () => {
  return (
    <div className="flex w-full flex-col gap-10">
      <section className="mx-auto max-w-7xl rounded-3xl border border-slate-200 bg-slate-50 px-6 py-10 shadow-sm sm:px-8 lg:px-10">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
          Articles
        </p>
        <h1 className="max-w-3xl text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
          Featured Animal Articles
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
          Browse our curated animal article collection and learn more about each
          species.
        </p>
        <div className="mt-8">
          <Button to="/">Back Home</Button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl rounded-3xl border border-slate-200 bg-slate-50 px-6 py-10 shadow-sm sm:px-8 lg:px-10">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
            Featured Animal
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900">
            Article Card
          </h2>
        </div>

        <ArticleList articles={articles} />
      </section>
    </div>
  );
};

export default ArticleListPage;
