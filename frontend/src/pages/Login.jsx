import React, { useState } from "react";
import LoginForm from "../features/auth/LoginForm";
import RegisterForm from "../features/auth/RegisterForm";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);

  const handleRegisterSuccess = () => {
    setIsLogin(true);
  };

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <div className="h-screen bg-zinc-200 dark:bg-zinc-800 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center">
        {isLogin ? (
          <LoginForm />
        ) : (
          <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
        )}
        <button
          onClick={toggleForm}
          className="mt-4 text-blue-700 hover:underline"
        >
          {isLogin
            ? "Don't have an account? Sign up now!"
            : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
}
