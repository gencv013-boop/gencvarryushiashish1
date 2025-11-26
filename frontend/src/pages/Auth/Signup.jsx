import React from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full p-3 border rounded mb-3"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded mb-3"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded mb-3"
        />

        <button className="w-full bg-green-600 text-white p-3 rounded-lg">
          Sign Up
        </button>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
