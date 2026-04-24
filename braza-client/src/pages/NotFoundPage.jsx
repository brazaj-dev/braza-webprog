import { Link } from "react-router-dom";
import Button from "../components/Button";

function NotFoundPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-zinc-50 px-4 py-16">
      <div className="w-full max-w-2xl rounded-3xl border-2 border-zinc-900 bg-white p-10 text-center shadow-xl">
        <p className="text-sm uppercase tracking-[0.28em] text-zinc-500">
          404 error
        </p>
        <h1 className="mt-4 text-4xl font-bold text-zinc-900">
          Page Not Found
        </h1>
        <p className="mt-4 text-sm leading-7 text-zinc-600">
          The page you are looking for doesn't exist or has moved. Use the
          buttons below to return home or explore the article library.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button to="/" variant="primary">
            Back Home
          </Button>
          <Link
            to="/articles"
            className="inline-flex items-center justify-center rounded-full border-2 border-zinc-900 px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-zinc-900 transition hover:bg-zinc-100"
          >
            Browse Articles
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
