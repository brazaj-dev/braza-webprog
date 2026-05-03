import { Outlet } from "react-router-dom";
import brandLogo from "../assets/signinLOGO.jpg";

const AuthLayout = () => {
  return (
    <section className="min-h-screen bg-slate-100 text-slate-900">
      <div className="grid min-h-screen gap-0 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="flex items-center justify-center bg-slate-100 px-6 py-10 sm:px-10">
          <div className="w-full max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 shadow-2xl">
            <div className="flex h-32 items-center justify-center rounded-[1.75rem] bg-slate-100 shadow-inner shadow-slate-200">
              <img
                src={brandLogo}
                alt="Sign in logo"
                className="h-20 w-20 rounded-[1.5rem] object-cover"
              />
            </div>
            <div className="mt-8 space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-sky-500">
                Welcome to Animal Hub!
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Animal stories built for readers.
              </h2>
              <p className="text-sm leading-6 text-slate-600">
                Sign in or sign up to save favorites, explore curated content,
                and keep track of the latest featured articles.
              </p>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden bg-slate-950 px-6 py-10 sm:px-10">
          <div className="absolute inset-0 opacity-30">
            <div className="h-full w-full bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.2),_transparent_25%),linear-gradient(180deg,rgba(15,23,42,0.9),rgba(15,23,42,0.95))]" />
          </div>
          <div className="relative mx-auto w-full max-w-md">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;
