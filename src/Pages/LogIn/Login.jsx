import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import getUser from "../../Zustand/User";

export default function Login() {
  const { setUser } = getUser();

  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "https://edenaqua-production.up.railway.app/user/login",
        {
          Email: form.email,
          Password: form.password,
        }
      );

      console.log("res", res);

      if (res.data.success && res.data.accessToken) {
        localStorage.setItem("name", res.data.user.Name);
        localStorage.setItem("phone", res.data.user.Phone);
        localStorage.setItem("email", res.data.user.Email);

        setUser(res.data.user);

        toast.success("Login successful!");
        localStorage.setItem("authToken", res.data.accessToken);

        window.dispatchEvent(new Event("storage"));

        navigate("/");
      } else {
        toast.error(res.data.message || "Invalid credentials!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-70">
      <div className="bg-white p-8 rounded-lg w-[90%] max-w-md relative shadow-xl">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-2 right-3 px-2 cursor-pointer underline text-gray-600 text-xl hover:text-red-500"
        >
          back
        </button>

        <h2 className="text-2xl font-bold text-center mb-6 text-[var(--primary-color)]">
          Login
        </h2>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border px-4 py-2 rounded-md focus:ring-2 focus:outline-none focus:ring-[var(--primary-color)]"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            autoComplete="true"
            onChange={handleChange}
            className="border px-4 py-2 rounded-md focus:ring-2 focus:outline-none focus:ring-[var(--primary-color)]"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-[var(--primary-color)] cursor-pointer text-white py-2 rounded-md font-semibold hover:bg-[var(--fifth-color)] transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-4 flex justify-between text-sm text-[var(--primary-color)]">
          <button
            onClick={() => navigate("/forget-password")}
            className="hover:underline"
          >
            Forgot Password?
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="hover:underline"
          >
            New User? Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
