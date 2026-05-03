import { Link } from "react-router-dom";
import Button from "../../components/Button";

const inputClasses =
  "mt-2 w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:bg-white";

const actionButtonClassName =
  "w-full rounded-xl py-3 text-[11px] tracking-[0.2em]";

const SignInPage = () => {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white/95 p-8 shadow-2xl backdrop-blur-sm">
      <div className="mb-8 space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-sky-500">
          Log In
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Welcome back!
        </h1>
        <p className="text-sm leading-6 text-slate-600">
          Access your account to review saved stories, saved items, and continue
          exploring curated articles.
        </p>
      </div>

      <form className="space-y-6">
        <div>
          <label
            htmlFor="signin-email"
            className="text-sm font-medium text-slate-700"
          >
            Email Address
          </label>
          <input
            id="signin-email"
            type="email"
            placeholder="student@email.com"
            autoComplete="email"
            className={inputClasses}
          />
        </div>

        <div>
          <label
            htmlFor="signin-password"
            className="text-sm font-medium text-slate-700"
          >
            Password
          </label>
          <input
            id="signin-password"
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            className={inputClasses}
          />
          <p className="mt-2 text-xs leading-5 text-slate-500">
            It must be a combination of minimum 8 letters, numbers, and symbols.
          </p>
        </div>

        <div className="flex items-center justify-between gap-4 text-sm text-slate-600">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300 accent-sky-500"
            />
            Remember me
          </label>
          <button
            type="button"
            className="font-medium text-slate-700 transition hover:text-slate-900"
          >
            Forgot Password?
          </button>
        </div>

        <Button
          type="submit"
          variant="primary"
          className={actionButtonClassName}
        >
          Log In
        </Button>

        <div className="grid gap-3 pt-2 sm:grid-cols-2">
          <Button
            type="button"
            variant="secondary"
            className={actionButtonClassName}
          >
            Log In with Google
          </Button>
          <Button
            type="button"
            variant="secondary"
            className={actionButtonClassName}
          >
            Log In with Apple
          </Button>
        </div>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600">
        No account yet?{" "}
        <Link
          to="/auth/signup"
          className="font-semibold text-slate-900 transition hover:text-slate-600"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default SignInPage;
