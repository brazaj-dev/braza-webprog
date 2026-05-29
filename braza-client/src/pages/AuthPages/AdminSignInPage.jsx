import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { loginUser } from "../../services/UserService";
import constants from "../../constants";

const AdminSignInPage = () => {
  const [credentials, setCredentials] = useState({
    identifier: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [connectionOk, setConnectionOk] = useState(null);
  const navigate = useNavigate();

  // Check server connection on mount
  useEffect(() => {
    const checkConnection = async () => {
      try {
        console.log("Checking server connection...");
        const healthUrl = `${constants.HOST.replace(/\/+$/g, "")}/health`;
        const response = await fetch(healthUrl);
        if (response.ok) {
          console.log("✅ Server is reachable");
          setConnectionOk(true);
        } else {
          console.warn("⚠️ Server returned error status:", response.status);
          setConnectionOk(false);
        }
      } catch (err) {
        console.error("❌ Cannot reach server:", err.message);
        setConnectionOk(false);
      }
    };

    checkConnection();
  }, []);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleLogin = async (payload) => {
    setLoading(true);
    setError("");

    try {
      console.log("Attempting login with:", payload);
      const { data } = await loginUser(payload);

      console.log("Login response:", data);

      // Verify admin access
      if (data.type !== "admin") {
        setError("Admin access required. Please use an administrator account.");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("type", data.type);
      localStorage.setItem("firstName", data.firstName);
      localStorage.setItem("lastName", data.lastName);
      localStorage.setItem("email", data.email);
      localStorage.setItem("userId", data.userId);

      console.log("✅ Login successful, redirecting to dashboard");
      // Navigate to dashboard
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error("Login error full details:", err);

      let message = "Unable to sign in. Please try again.";

      if (err.code === "ERR_NETWORK") {
        message = `Network Error: Cannot connect to server at ${constants.HOST}. Make sure the server is running.`;
      } else if (err.response?.data?.message) {
        message = err.response.data.message;
      } else if (err.message) {
        message = err.message;
      }

      console.error("Final error message:", message);
      setError(message);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!connectionOk) {
      setError(
        "Cannot connect to server. Make sure the server is running on port 8000.",
      );
      return;
    }

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

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white/95 p-8 shadow-2xl backdrop-blur-sm">
      <div className="mb-8 space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-sky-500">
          Administrator Sign In
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Admin Access
        </h1>
        <p className="text-sm leading-6 text-slate-600">
          Sign in with your administrator credentials to access the management
          dashboard.
        </p>
      </div>

      {connectionOk === false && (
        <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-800">
          <p className="font-semibold mb-1">⚠️ Server Connection Error</p>
          <p>Cannot reach the server at {constants.HOST}</p>
          <p className="mt-2 text-xs">Make sure:</p>
          <ul className="list-disc ml-5 mt-1 text-xs">
            <li>
              The server is running: <code>npm run dev</code> in braza-server
              folder
            </li>
            <li>Port 8000 is not blocked</li>
            <li>MongoDB is running</li>
          </ul>
        </div>
      )}

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-800">
          {error}
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="admin-signin-identifier"
            className="text-sm font-medium text-slate-700"
          >
            Email or Username
          </label>
          <input
            id="admin-signin-identifier"
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
            htmlFor="admin-signin-password"
            className="text-sm font-medium text-slate-700"
          >
            Password
          </label>
          <input
            id="admin-signin-password"
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
          disabled={loading || connectionOk === false}
        >
          {loading ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600">
        <Link
          to="/auth/signin"
          className="font-semibold text-slate-900 transition hover:text-slate-600"
        >
          Back to Sign In
        </Link>
      </p>
    </div>
  );
};

export default AdminSignInPage;
