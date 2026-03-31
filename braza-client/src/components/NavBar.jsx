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
      ? "border-zinc-900 bg-zinc-900 text-zinc-50"
      : "border-transparent text-zinc-500 hover:border-zinc-900 hover:bg-zinc-50 hover:text-zinc-900",
  ].join(" ");

const Navbar = () => {
  return (
    <header className="border-b-2 border-zinc-900 bg-pink-200">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-10 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="text-lg font-bold text-zinc-900">SHUAE'S WEBSITE</div>
          <img
            src="./src/assets/logo.jpg"
            alt="logo"
            className="h-10 w-10 object-cover rounded-full"
          />
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
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
