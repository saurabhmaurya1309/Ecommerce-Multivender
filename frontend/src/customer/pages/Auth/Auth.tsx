import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ForgotPasswordForm from "./ForgotPasswordForm";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  return (
    <div className="h-[90vh] overflow-hidden flex items-center justify-center bg-[#EAF0F1] px-4">
      <div className="w-full max-w-4xl  h-[520px] bg-white rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* Banner */}
        <div className="hidden md:block">
          <img
            src="/banner.png"
            alt="Marketplace"
            className="h-full w-full object-fit"
          />
        </div>

        {/* Form */}
        <div className="p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            {showForgotPassword
              ? "Forgot Password 🔑"
              : isLogin
                ? "Welcome Back 👋"
                : "Create Your Account 🚀"}
          </h2>

          <p className="text-sm text-center text-gray-500 mt-2 mb-6">
            {showForgotPassword
              ? "Enter your email to reset password"
              : isLogin
                ? "Login to continue shopping"
                : "Register to start shopping"}
          </p>

          {
            showForgotPassword ? (
              <ForgotPasswordForm
                switchToLogin={() => {
                  setShowForgotPassword(false);
                  setIsLogin(true);
                }}
              />
            ) : isLogin ? (
              <LoginForm
                openForgotPassword={() =>
                  setShowForgotPassword(true)
                }
              />
            ) : (
              <RegisterForm
                switchToLogin={() =>
                  setIsLogin(true)
                }
              />
            )
          }
          {!showForgotPassword &&
            <div className="text-center mt-6">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm font-medium text-[#00927c] hover:underline"
              >
                {isLogin
                  ? "Don’t have an account? Register"
                  : "Already have an account? Login"}
              </button>
            </div>

          }

        </div>
      </div>
    </div>
  );
};

export default Auth;
