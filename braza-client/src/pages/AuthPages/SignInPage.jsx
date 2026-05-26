import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Button from "../../components/Button";
import { loginUser } from "../../services/UserService";

const SignInPage = () => {
  const [credentials, setCredentials] = useState({
    identifier: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleLogin = async (payload) => {
    setLoading(true);
    setError("");

    try {
      const { data } = await loginUser(payload);
      localStorage.setItem("token", data.token);
      localStorage.setItem("type", data.type);
      localStorage.setItem("firstName", data.firstName);
      localStorage.setItem("lastName", data.lastName);
      localStorage.setItem("email", data.email);
      localStorage.setItem("userId", data.userId);

      const from = location.state?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });
    } catch (err) {
      const message =
        err.response?.data?.message || "Unable to sign in. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!credentials.identifier.trim() || !credentials.password) {
      setError("Please enter your email/username and password.");
      return;
    }

    const payload = {
      password: credentials.password,
    };

    if (credentials.identifier.includes("@")) {
      payload.email = credentials.identifier.trim();
    } else {
      payload.username = credentials.identifier.trim();
    }

    await handleLogin(payload);
  };

  const handleQuickLogin = async (identifier, password) => {
    setCredentials({ identifier, password });
    const payload = {
      password,
    };

    if (identifier.includes("@")) {
      payload.email = identifier.trim();
    } else {
      payload.username = identifier.trim();
    }

    await handleLogin(payload);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-slate-200 bg-white/95 p-8 shadow-2xl backdrop-blur-sm">
        <div className="mb-8 space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-sky-500">
            Log In
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Welcome back!
          </h1>
          <p className="text-sm leading-6 text-slate-600">
            Sign in with your account credentials to access your dashboard.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-800">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="signin-identifier"
              className="text-sm font-medium text-slate-700"
            >
              Email or Username
            </label>
            <input
              id="signin-identifier"
              type="text"
              placeholder="Email or username"
              name="identifier"
              value={credentials.identifier}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:bg-white"
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
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:bg-white"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full rounded-xl py-3 text-[11px] tracking-[0.2em]"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
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

      <div className="rounded-[2rem] border border-slate-200 bg-white/95 p-8 shadow-2xl backdrop-blur-sm">
        <div className="mb-8 space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-sky-500">
            Quick Access
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Admin Login
          </h2>
          <p className="text-sm leading-6 text-slate-600">
            Quick access for administrators to explore and manage the dashboard.
          </p>
        </div>

        <Link
          to="/auth/admin-signin"
          className="block w-full rounded-xl border-2 border-sky-400 bg-gradient-to-br from-sky-500 to-sky-600 px-6 py-3 text-center font-semibold text-white transition hover:border-sky-500 hover:shadow-lg"
        >
          Login as Administrator
        </Link>
      </div>
    </div>
  );
};

export default SignInPage;
