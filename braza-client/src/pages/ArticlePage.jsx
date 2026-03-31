import Button from "../components/Button";

import dogImg from "../assets/dog.avif";
import catImg from "../assets/cat.webp";
import birdImg from "../assets/bird.webp";
import monkeyImg from "../assets/MONKEY.webp";

const ArticlePage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
          Articles
        </p>
        <h1 className="max-w-xl mx-auto text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
          Featured Animal Articles
        </h1>
        <p className="mt-4 max-w-lg mx-auto text-sm  leading-7 text-zinc-600 lg:items-center sm:text-base">
          Different animals have different characteristics, habitats, and
          behaviors.
        </p>
        <div className="rounded-3xl border-2 border-dashed p-2">
          <div className="mx-auto h-30 w-30 items-center justify-center rounded-full bg-zinc-200">
            <img
              src="./src/assets/bleh.jpg"
              alt="Bleh"
              className="mx-auto h-40 w-40 object-cover rounded-full"
            />
          </div>
        </div>
        <div className="mt-6">
          <Button to="/">Back Home</Button>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Featured Animals
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            Article Card
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200">
              <div className="h-12 w-12 border-2 border-zinc-300 bg-zinc-100" />
              <img
                src={dogImg}
                alt="Dog"
                className="h-48 w-full object-cover"
              />
            </div>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Article 01
            </p>
            <h3 className="mt-2 text-lg font-semibold text-zinc-900">Dogs</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Explore the diverse world of canines, from loyal working breeds to
              beloved household companions, and learn about their unique social
              behaviors.
            </p>
            <Button to="https://en.wikipedia.org/wiki/Dog" variant="primary">
              Read more
            </Button>
          </article>

          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200">
              <div className="h-12 w-12 border-2 border-zinc-300 bg-zinc-100" />
              <img
                src={catImg}
                alt="Cat"
                className="h-48 w-full object-cover"
              />
            </div>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Article 02
            </p>
            <h3 className="mt-2 text-lg font-semibold text-zinc-900">Cats</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              An insightful look into feline independence and grace, covering
              various breeds and the mysterious history of how they became our
              domestic partners.
            </p>
            <Button to="https://en.wikipedia.org/wiki/Cat" variant="primary">
              Read more
            </Button>
          </article>

          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200">
              <div className="h-12 w-12 border-2 border-zinc-300 bg-zinc-100" />
              <img
                src={birdImg}
                alt="Bird"
                className="h-48 w-full object-cover"
              />
            </div>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Article 03
            </p>
            <h3 className="mt-2 text-lg font-semibold text-zinc-900">Birds</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Discover the fascinating mechanics of flight and the colorful
              variety of avian species found across different tropical and urban
              ecosystems.
            </p>
            <Button to="https://en.wikipedia.org/wiki/Bird" variant="primary">
              Read more
            </Button>
          </article>

          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200">
              <div className="h-12 w-12 border-2 border-zinc-300 bg-zinc-100" />
              <img
                src={monkeyImg}
                alt="Monkey"
                className="h-48 w-full object-cover"
              />
            </div>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Article 04
            </p>
            <h3 className="mt-2 text-lg font-semibold text-zinc-900">
              Monkeys
            </h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Dive into the complex social structures and high intelligence of
              primates, highlighting the similarities they share with human
              problem-solving
            </p>
            <Button to="https://en.wikipedia.org/wiki/Monkey" variant="primary">
              Read more
            </Button>
          </article>
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;
