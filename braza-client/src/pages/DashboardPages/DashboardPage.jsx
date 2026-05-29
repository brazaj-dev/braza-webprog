import React from "react";
import Button from "../../components/Button";

const stats = [
  { value: "8", label: "New Reports" },
  { value: "22", label: "Published Articles" },
  { value: "3", label: "Pending Reviews" },
  { value: "99%", label: "Uptime" },
];

function DashboardPage() {
  const userType = localStorage.getItem("type") || "viewer";

  return (
    <div className="mx-auto min-h-[calc(100vh-4rem)] w-full max-w-6xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <section className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-sky-600 via-cyan-500 to-indigo-600 px-6 py-10 text-white shadow-[0_30px_60px_-30px_rgba(15,23,42,0.7)] sm:px-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200/80">
              Animal Hub
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Your Animal Hub information center.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-cyan-100/90">
              Explore animal reports, article content, and user activity in one
              calm hub built for animal lovers and caretakers.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              to="/dashboard/reports"
              variant="primary"
              className="rounded-full px-6 py-3 text-sm"
            >
              Animal Reports
            </Button>
            <Button
              to="/dashboard/articles"
              className="rounded-full px-6 py-3 text-sm"
            >
              Animal Articles
            </Button>
            {userType === "admin" && (
              <Button
                to="/dashboard/users"
                className="rounded-full border-white/30 bg-white/10 px-6 py-3 text-sm text-white backdrop-blur-sm hover:bg-white/15"
              >
                Animal Users
              </Button>
            )}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white px-6 py-8 shadow-sm transition hover:-translate-y-0.5 sm:px-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                Animal Hub insights
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-900">
                Animal activity
              </h2>
            </div>
            <span className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm">
              {userType === "admin" ? "Admin" : "Editor"}
            </span>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {stats.map((item) => (
              <div
                key={item.label}
                className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5 shadow-sm"
              >
                <p className="text-3xl font-semibold text-slate-900">
                  {item.value}
                </p>
                <p className="mt-2 text-sm uppercase tracking-[0.24em] text-slate-500">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 px-6 py-8 shadow-sm transition hover:-translate-y-0.5 sm:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
            Quick Actions
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900">
            Take action fast
          </h2>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Access the most important dashboard pages with a single click. Keep
            your work moving without clutter.
          </p>

          <div className="mt-8 grid gap-4">
            <Button
              to="/dashboard/reports"
              variant="primary"
              className="w-full px-6 py-3 text-sm"
            >
              View Animal Reports
            </Button>
            <Button
              to="/dashboard/articles"
              className="w-full rounded-full border border-slate-200 bg-white px-6 py-3 text-sm text-slate-900 hover:bg-slate-100"
            >
              View Animal Articles
            </Button>
            {userType === "admin" && (
              <Button
                to="/dashboard/users"
                variant="secondary"
                className="w-full rounded-full px-6 py-3 text-sm"
              >
                Manage Animal Users
              </Button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;
