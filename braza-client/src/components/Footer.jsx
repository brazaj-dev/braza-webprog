import { Link } from "react-router-dom";
import logoImg from "../assets/logo.jpg";

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 text-slate-700">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] items-start">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 overflow-hidden rounded-full border border-slate-300 bg-white">
                <img
                  src={logoImg}
                  alt="Site logo"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Shuae's Website
                </p>
                <p className="text-xl font-semibold text-slate-900">
                  Animal Article hub
                </p>
              </div>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-500">
              Explore the latest articles, learn about animal types, and use the
              footer links to jump straight to content.
            </p>
          </div>

          <div className="flex flex-col items-start justify-between gap-8 sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                Follow us
              </p>
              <div className="mt-4 flex gap-3">
                <a
                  href="https://www.facebook.com/jshbzz/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition hover:bg-slate-100"
                  aria-label="Facebook"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-6 w-6"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.2 1.8.2v2h-1c-1 0-1.3.6-1.3 1.3V12h2.3l-.4 3h-1.9v7A10 10 0 0022 12z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/_jshbrz/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition hover:bg-slate-100"
                  aria-label="Instagram"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-6 w-6"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M7.8 2h8.4A5.8 5.8 0 0122 7.8v8.4A5.8 5.8 0 0116.2 22H7.8A5.8 5.8 0 012 16.2V7.8A5.8 5.8 0 017.8 2zm0 1.5A4.3 4.3 0 003.5 7.8v8.4A4.3 4.3 0 007.8 20.5h8.4a4.3 4.3 0 004.3-4.3V7.8a4.3 4.3 0 00-4.3-4.3H7.8zm8.7 2.1a1.1 1.1 0 110 2.2 1.1 1.1 0 010-2.2zM12 7.2a4.8 4.8 0 110 9.6 4.8 4.8 0 010-9.6zm0 1.5a3.3 3.3 0 100 6.6 3.3 3.3 0 000-6.6z" />
                  </svg>
                </a>
                <a
                  href="https://github.com/brazaj-dev"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition hover:bg-slate-100"
                  aria-label="GitHub"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-6 w-6"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.16 6.84 9.49.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.61-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.93 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.57 9.57 0 0112 6.8c.85.004 1.71.11 2.51.32 1.9-1.3 2.74-1.02 2.74-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.83-2.34 4.68-4.57 4.92.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .26.18.57.69.47A10 10 0 0022 12c0-5.52-4.48-10-10-10z" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white px-4 py-4 text-sm text-slate-600">
              <p className="font-semibold text-slate-900">Need help?</p>
              <p className="mt-2">
                Visit the homepage, explore articles, or reach out through our
                social profiles.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-500 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Braza WebProg. Built with React.</p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/"
              className="text-slate-600 transition hover:text-slate-900"
            >
              Home
            </Link>
            <Link
              to="/articles"
              className="text-slate-600 transition hover:text-slate-900"
            >
              Articles
            </Link>
            <Link
              to="/about"
              className="text-slate-600 transition hover:text-slate-900"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
