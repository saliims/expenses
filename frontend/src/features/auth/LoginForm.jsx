import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./authReducer";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const onSubmit = async (data) => {
    const resultAction = await dispatch(login(data));
    if (login.fulfilled.match(resultAction)) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex items-center justify-center p-4 text-gray-900 dark:text-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 border-2 p-6 sm:p-8 md:p-12 border-blue-900 rounded-3xl w-full max-w-md"
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
          <label htmlFor="username" className="text-sm font-medium sm:w-1/3">
            Username
          </label>
          <div className="flex flex-col w-full sm:w-2/3">
            <div className="relative">
              <input
                id="username"
                className="border-2 rounded px-2 py-1 w-full
                           transition-all duration-300 ease-in-out
                           focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-zinc-700"
                {...register("username", { required: "Username is required" })}
              />
            </div>
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">
                {errors.username.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
          <label htmlFor="password" className="text-sm font-medium sm:w-1/3">
            Password
          </label>
          <div className="flex flex-col w-full sm:w-2/3">
            <div className="relative">
              <input
                type="password"
                id="password"
                className="border-2 rounded px-2 py-1 w-full
                           transition-all duration-300 ease-in-out
                           focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-zinc-700"
                {...register("password", {
                  required: "Password is required",
                })}
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300 disabled:bg-blue-400 mt-4"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
        {error && (
          <p className="text-red-500 uppercase text-md text-center mt-4">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}
