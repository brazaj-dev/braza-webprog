import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

const stats = [
  { value: "8", label: "New Reports" },
  { value: "22", label: "Published Articles" },
  { value: "3", label: "Pending Reviews" },
  { value: "99%", label: "Uptime" },
];

function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="flex w-full flex-col gap-10">
      <section className="mx-auto max-w-7xl rounded-3xl border border-slate-200 bg-white px-6 py-10 shadow-sm sm:px-8 lg:px-10">
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
            Dashboard Overview
          </p>
          <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
            Welcome back.
          </h1>
          <p className="mt-5 text-base leading-8 text-slate-600">
            This is your dashboard hub for reports and article management.
            Choose a quick action or review your latest metrics.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button to="/dashboard/reports" variant="primary">
              Reports
            </Button>
            <Button to="/dashboard/articles">Articles</Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl rounded-3xl border border-slate-200 bg-slate-50 px-6 py-10 shadow-sm sm:px-8 lg:px-10">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
            Status
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900">
            Today's activity at a glance
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-3xl border border-slate-200 bg-white p-6 text-center"
            >
              <p className="text-3xl font-bold text-slate-900">{item.value}</p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl rounded-3xl border border-slate-200 bg-slate-50 px-6 py-10 shadow-sm sm:px-8 lg:px-10">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
            Actions
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900">
            Quick links for dashboard work
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">
              Open Reports
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Review the latest reports, analytics, and export options
              available.
            </p>
            <div className="mt-6">
              <Button to="/dashboard/reports" variant="primary">
                Go to Reports
              </Button>
            </div>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">
              Manage Articles
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Access article listings, add new content, and keep everything
              organized.
            </p>
            <div className="mt-6">
              <Button to="/dashboard/articles">Go to Articles</Button>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;
