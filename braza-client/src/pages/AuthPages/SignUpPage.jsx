import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { useState } from "react";
import { createUser } from "../../services/UserService";

const inputClasses =
  "mt-2 w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:bg-white";

const actionButtonClassName =
  "w-full rounded-xl py-3 text-[11px] tracking-[0.2em]";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    contactNumber: "",
    address: "",
    username: "",
    role: "viewer",
    isActive: true,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) return "First name is required";
    if (!formData.lastName.trim()) return "Last name is required";
    if (!formData.email.trim()) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      return "Invalid email format";
    if (!formData.password) return "Password is required";
    if (formData.password.length < 8)
      return "Password must be at least 8 characters";
    if (formData.password !== formData.confirmPassword)
      return "Passwords do not match";
    if (!formData.username.trim()) return "Username is required";
    if (formData.username.includes(" "))
      return "Username cannot contain spaces";

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      // Create the payload, excluding confirmPassword
      const { confirmPassword: _, ...payload } = formData;
      payload.type = "viewer"; // Set default type as viewer for signups

      const { data } = await createUser(payload);
      console.log("Sign up successful:", data);

      // Show success message and redirect to sign in
      alert(
        "Account created successfully! Please log in with your credentials.",
      );
      navigate("/auth/signin");
    } catch (err) {
      console.error(
        "Sign up failed:",
        err.response?.data?.message || err.message,
      );
      setError(
        err.response?.data?.message || "Sign up failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white/95 p-8 shadow-2xl backdrop-blur-sm">
      <div className="mb-8 space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-sky-500">
          Create account
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Sign up to Animal Hub!
        </h1>
        <p className="text-sm leading-6 text-slate-600">
          Create your account to save favorite articles, get recommendations,
          and continue exploring curated animal stories.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-800">
          {error}
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="first-name"
              className="text-sm font-medium text-slate-700"
            >
              First Name
            </label>
            <input
              id="first-name"
              type="text"
              placeholder="First name"
              autoComplete="given-name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className={inputClasses}
            />
          </div>
          <div>
            <label
              htmlFor="last-name"
              className="text-sm font-medium text-slate-700"
            >
              Last Name
            </label>
            <input
              id="last-name"
              type="text"
              placeholder="Last name"
              autoComplete="family-name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className={inputClasses}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="signup-email"
            className="text-sm font-medium text-slate-700"
          >
            Email
          </label>
          <input
            id="signup-email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={inputClasses}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="age" className="text-sm font-medium text-slate-700">
              Age (Optional)
            </label>
            <input
              id="age"
              type="number"
              placeholder="Age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className={inputClasses}
            />
          </div>
          <div>
            <label
              htmlFor="gender"
              className="text-sm font-medium text-slate-700"
            >
              Gender (Optional)
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={inputClasses}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="contact"
            className="text-sm font-medium text-slate-700"
          >
            Contact Number (Optional)
          </label>
          <input
            id="contact"
            type="tel"
            placeholder="Contact number"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>

        <div>
          <label
            htmlFor="address"
            className="text-sm font-medium text-slate-700"
          >
            Address (Optional)
          </label>
          <input
            id="address"
            type="text"
            placeholder="Your address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>

        <div>
          <label
            htmlFor="username"
            className="text-sm font-medium text-slate-700"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="Choose a username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className={inputClasses}
          />
          <p className="mt-2 text-xs leading-5 text-slate-500">
            No spaces allowed in username.
          </p>
        </div>

        <div>
          <label
            htmlFor="signup-password"
            className="text-sm font-medium text-slate-700"
          >
            Password
          </label>
          <input
            id="signup-password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a password"
            autoComplete="new-password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className={inputClasses}
          />
          <p className="mt-2 text-xs leading-5 text-slate-500">
            Use a secure password with letters, numbers, and symbols (minimum 8
            characters).
          </p>
        </div>

        <div>
          <label
            htmlFor="confirm-password"
            className="text-sm font-medium text-slate-700"
          >
            Confirm Password
          </label>
          <input
            id="confirm-password"
            type={showPassword ? "text" : "password"}
            placeholder="Confirm your password"
            autoComplete="new-password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className={inputClasses}
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={(e) => setShowPassword(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 accent-sky-500"
          />
          Show password
        </label>

        <Button
          type="submit"
          variant="primary"
          className={actionButtonClassName}
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </Button>

        <div className="grid gap-3 pt-2 sm:grid-cols-2">
          <Button
            type="button"
            variant="secondary"
            className={actionButtonClassName}
            disabled={loading}
          >
            Sign Up with Google
          </Button>
          <Button
            type="button"
            variant="secondary"
            className={actionButtonClassName}
            disabled={loading}
          >
            Sign Up with Apple
          </Button>
        </div>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600">
        Already have an account?{" "}
        <Link
          to="/auth/signin"
          className="font-semibold text-slate-900 transition hover:text-slate-600"
        >
          Log In
        </Link>
      </p>
    </div>
  );
};

export default SignUpPage;
