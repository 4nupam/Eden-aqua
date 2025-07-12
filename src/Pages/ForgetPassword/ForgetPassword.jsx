import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (!validateEmail(e.target.value)) {
      setError("Please enter a valid email address");
    } else {
      setError("");
    }
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");

    fetch("https://edenaqua-production.up.railway.app/user/forgotpassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Email: email }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
      });

    setTimeout(() => {
      navigate("/login");
    }, 3000);
    
    setSubmitted(true);
  };

  return (
    <div className=" fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-70">

    <div className="">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-extrabold text-center text-[var(--primary-color)] mb-6">
          Forgot Your Password?
        </h2>

        {submitted ? (
          <p className="text-green-600 text-center">
            If an account with the email <strong>{email}</strong> exists, a
            password reset link has been sent.
          </p>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Enter your email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] ${
                error ? "border-red-500" : "border-gray-300"
              }`}
              required
              aria-describedby="email-error"
            />
            {error && (
              <p id="email-error" className="text-red-500 text-sm mt-1">
                {error}
              </p>
            )}

            {/* Remember Me Checkbox */}
            <div className="mt-4 flex items-center">
              <input
                id="rememberMe"
                type="checkbox"
                checked={rememberMe}
                onChange={handleRememberMeChange}
                className="w-4 h-4 text-[var(--primary-color)] border-gray-300 rounded focus:ring-[var(--primary-color)]"
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 block text-sm text-gray-700 select-none cursor-pointer"
              >
                Remember your credentials? Back to{" "}
                <span
                  onClick={() => navigate("/login")}
                  className="text-[var(--primary-color)] font-semibold cursor-pointer hover:underline"
                >
                  Login
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={!email || !!error}
              className={`mt-6 w-full py-3 rounded-md text-white font-semibold transition ${
                !email || error
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[var(--primary-color)] hover:bg-[var(--fifth-color)] cursor-pointer"
              }`}
            >
              Send Reset Link
            </button>
          </form>
        )}
      </div>
    </div>
    </div>
  );
}
