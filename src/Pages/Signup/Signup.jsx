import { useState } from "react";
import { useNavigate } from "react-router-dom";
import getUser from "../../Zustand/User";
import toast from "react-hot-toast";

export default function Signup({ closePopup }) {
  const navigate = useNavigate();

  const { setUser } = getUser();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleTermsChange = (e) => {
    setTermsAccepted(e.target.checked);
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^\d{10}$/.test(form.phone))
      newErrors.phone = "Phone must be 10 digits";

    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Invalid email format";

    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!form.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (!termsAccepted) {
      toast.error("You must accept the Terms and Conditions to proceed.");
      return;
    }

    setErrors({});

    const payload = {
      Name: form.name,
      Phone: form.phone,
      Email: form.email,
      Password: form.password,
    };

    const toastId = toast.loading("Registering...");
    console.log("Submitting registration:", payload);

    try {
      const res = await fetch(
        "https://edenaqua-production.up.railway.app/user/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const responseData = await res.json();

      localStorage.setItem("name", responseData.data.user.Name);
      localStorage.setItem("phone", responseData.data.user.Phone);
      localStorage.setItem("email", responseData.data.user.Email);
      setUser(responseData.data.user);

      if (!responseData.success) {
        throw new Error(
          responseData.message || "Registration failed. Try again."
        );
      }

      // const responseData = await res.json();
      toast.success("Registration successful!", { id: toastId });

      if (responseData.accessToken) {
        localStorage.setItem("accessToken", responseData.accessToken);
      }

      toast.success("Registration successful!", { id: toastId });

      // Clear form (optional)
      setForm({
        name: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setTermsAccepted(false);

      closePopup?.();
      navigate("/");
    } catch (err) {
      console.error("Registration error:", err.message);
      toast.error(err.message, { id: toastId });
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-2 z-50"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>

      <div className="relative bg-white bg-opacity-90 rounded-xl shadow-xl max-w-[90%] w-full p-2 px-6 sm:p-12 z-10 mx-2 sm:mx-6 md:mx-auto">
        <h2 className="text-lg sm:text-3xl font-bold mb-1 text-center text-[var(--primary-color)]">
          Create Account
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-2 sm:grid-cols-2"
          noValidate
        >
          {/* Name */}
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-1 font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className={`px-4 py-3 border rounded-md focus:ring-2 focus:outline-none focus:ring-[var(--primary-color)] ${
                errors.name ? "border-red-500" : ""
              }`}
              placeholder="Your full name"
              aria-invalid={!!errors.name}
              aria-describedby="error-name"
            />
            {errors.name && (
              <p id="error-name" className="text-red-500 text-sm mt-1">
                {errors.name}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <label htmlFor="phone" className="mb-1 font-medium text-gray-700">
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className={`px-4 py-3 border rounded-md focus:ring-2 focus:outline-none focus:ring-[var(--primary-color)] ${
                errors.phone ? "border-red-500" : ""
              }`}
              placeholder="10-digit phone number"
              maxLength={10}
              aria-invalid={!!errors.phone}
              aria-describedby="error-phone"
            />
            {errors.phone && (
              <p id="error-phone" className="text-red-500 text-sm mt-1">
                {errors.phone}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={`px-4 py-3 border rounded-md focus:ring-2 focus:outline-none focus:ring-[var(--primary-color)] ${
                errors.email ? "border-red-500" : ""
              }`}
              placeholder="example@mail.com"
              aria-invalid={!!errors.email}
              aria-describedby="error-email"
            />
            {errors.email && (
              <p id="error-email" className="text-red-500 text-sm mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="mb-1 font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              autoComplete="true"
              value={form.password}
              onChange={handleChange}
              className={`px-4 py-3 border rounded-md focus:ring-2 focus:outline-none focus:ring-[var(--primary-color)] ${
                errors.password ? "border-red-500" : ""
              }`}
              placeholder="At least 6 characters"
              aria-invalid={!!errors.password}
              aria-describedby="error-password"
            />
            {errors.password && (
              <p id="error-password" className="text-red-500 text-sm mt-1">
                {errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col">
            <label
              htmlFor="confirmPassword"
              className="mb-1 font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              autoComplete="true"
              value={form.confirmPassword}
              onChange={handleChange}
              className={`px-4 py-3 border rounded-md focus:ring-2 focus:outline-none focus:ring-[var(--primary-color)] ${
                errors.confirmPassword ? "border-red-500" : ""
              }`}
              placeholder="Re-enter your password"
              aria-invalid={!!errors.confirmPassword}
              aria-describedby="error-confirmPassword"
            />
            {errors.confirmPassword && (
              <p
                id="error-confirmPassword"
                className="text-red-500 text-sm mt-1"
              >
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-center gap-3 sm:col-span-2">
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={handleTermsChange}
              className="w-5 h-5 accent-[var(--primary-color)] cursor-pointer"
              aria-describedby="error-terms"
            />
            <label
              htmlFor="terms"
              className="text-gray-700 select-none cursor-pointer"
            >
              I accept the{" "}
              <a
                href="/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-[var(--primary-color)]"
              >
                Terms and Conditions
              </a>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!termsAccepted}
            className={`sm:col-span-2 mt-4 py-3 rounded-md font-semibold text-white transition
              ${
                termsAccepted
                  ? "bg-[var(--primary-color)] hover:bg-[var(--fifth-color)] cursor-pointer"
                  : "bg-gray-400 cursor-not-allowed"
              }
            `}
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 flex flex-col items-center gap-3 text-sm">
          <button
            onClick={() => navigate("/")}
            className="text-[var(--primary-color)] font-medium hover:underline focus:outline-none"
          >
            Back to Home
          </button>
          <p className="text-gray-600">
            Already have an account?{" "}
            <span
              className="text-[var(--primary-color)] font-medium cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => {
                if (e.key === "Enter") navigate("/login");
              }}
            >
              Log In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
