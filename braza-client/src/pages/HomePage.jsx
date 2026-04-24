import Button from "../components/Button";

import dogImg from "../assets/dog.avif"; // Use the full name from your explorer
import catImg from "../assets/cat.webp";
import birdImg from "../assets/bird.webp";
import blehImg from "../assets/bleh.jpg";

const HomePage = () => {
  return (
    <div className="flex w-full flex-col gap-10">
      <section className="mx-auto max-w-7xl rounded-3xl border border-slate-200 bg-sky-50/70 px-6 py-10 shadow-sm sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
              Welcome
            </p>
            <h1 className="max-w-2xl text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
              Discover animal stories, guides, and featured articles.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
              Explore a clean, organized space for the latest animal articles,
              from dogs and cats to birds, monkeys, and fish.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button to="/articles" variant="primary">
                Browse Articles
              </Button>
              <Button to="/about">About Me</Button>
            </div>
          </div>

          <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
            <img
              src={blehImg}
              alt="Wildlife illustration"
              className="h-[420px] w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl rounded-3xl border border-slate-200 bg-slate-50 px-6 py-10 shadow-sm sm:px-8 lg:px-10">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
            Overview
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900">
            Quick highlights
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center">
            <p className="text-3xl font-bold text-slate-900">12</p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Articles
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center">
            <p className="text-3xl font-bold text-slate-900">04</p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Categories
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center">
            <p className="text-3xl font-bold text-slate-900">24</p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Cards
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center">
            <p className="text-3xl font-bold text-slate-900">100%</p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Clean design
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl rounded-3xl border border-slate-200 bg-slate-50 px-6 py-10 shadow-sm sm:px-8 lg:px-10">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
            Featured animals
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900">
            Popular animal cards
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <article className="rounded-3xl border border-slate-200 bg-white p-5">
            <div className="overflow-hidden rounded-[1.25rem] bg-slate-50 shadow-sm">
              <img
                src={dogImg}
                alt="Dog"
                className="h-48 w-full object-cover object-center"
              />
            </div>
            <h3 className="mt-5 text-lg font-semibold text-slate-900">Dogs</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Loyal and playful friends, perfect for families and active
              lifestyles.
            </p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-5">
            <div className="overflow-hidden rounded-[1.25rem] bg-slate-50 shadow-sm">
              <img
                src={birdImg}
                alt="Bird"
                className="h-48 w-full object-cover object-center"
              />
            </div>
            <h3 className="mt-5 text-lg font-semibold text-slate-900">Birds</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Colorful and curious, birds bring motion and melody to every
              scene.
            </p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-5">
            <div className="overflow-hidden rounded-[1.25rem] bg-slate-50 shadow-sm">
              <img
                src={catImg}
                alt="Cat"
                className="h-48 w-full object-cover object-center"
              />
            </div>
            <h3 className="mt-5 text-lg font-semibold text-slate-900">Cats</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Graceful and independent, cats add calm personality to every page.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
