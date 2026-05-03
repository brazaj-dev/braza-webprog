import { NavLink } from "react-router-dom";

import logoImg from "../assets/logo.jpg";
const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Articles", to: "/articles" },
];

const navLinkClassName = ({ isActive }) =>
  [
    "rounded-full border-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] transition",
    isActive
      ? "border-sky-500 bg-sky-500 text-white"
      : "border-transparent text-slate-600 hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900",
  ].join(" ");

const Navbar = () => {
  return (
    <header className="border-b border-slate-200 bg-slate-50 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 overflow-hidden rounded-full border border-slate-200 bg-slate-100">
            <img
              src={logoImg}
              alt="Site logo"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-900">
              Braza Animal Hub
            </p>
          </div>
        </div>

        <nav className="flex items-center gap-3">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={navLinkClassName}
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink
            to="/auth/signin"
            className="rounded-full bg-sky-500 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white transition shadow-sm hover:bg-sky-600"
          >
            Sign In
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
