import { Link } from "react-router-dom";

const variantClasses = {
  primary: "bg-sky-500 text-white hover:bg-sky-600",
  secondary: "bg-white text-slate-900 hover:bg-slate-100",
};

const Button = ({
  children,
  to,
  type = "button",
  variant = "secondary",
  className = "",
}) => {
  const classes = [
    "inline-flex items-center justify-center rounded-full border-2 border-slate-200 px-4 py-2 text-[10px] font-semibold font-black uppercase tracking-[0.24em] transition shadow-sm",
    variantClasses[variant] ?? variantClasses["secondary"],
    className,
  ]
    .join(" ")
    .trim();

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} className={classes}>
      {children}
    </button>
  );
};

export default Button;
