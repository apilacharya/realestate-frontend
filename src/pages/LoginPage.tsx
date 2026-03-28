import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

const LoginPage: React.FC = () => {
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    await login.mutateAsync(data);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-outfit">
      <div className="mb-8">
        <Link to="/" className="text-3xl font-bold tracking-tight">
          <span className="text-blue-600">RealEstate</span>
          <span className="text-gray-900">Hub</span>
        </Link>
      </div>

      <div className="max-w-xl w-full space-y-10 bg-white p-10 sm:p-12 border border-gray-100 rounded-3xl shadow-xl shadow-gray-200/50">
        <div>
          <h2 className="text-center text-4xl font-bold text-gray-900 tracking-tight leading-none mb-4">
            Welcome Back
          </h2>
          <p className="text-center text-sm font-bold text-gray-400 uppercase tracking-widest">
            Sign in to continue
          </p>
        </div>

        <form className="mt-8 space-y-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Email address
              </label>
              <input
                {...register("email")}
                type="email"
                autoComplete="email"
                className={`w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-gray-900 ${errors.email ? "border-red-500 focus:ring-red-500/10 focus:border-red-500" : ""}`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-2 text-xs text-red-600 font-bold">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Password
              </label>
              <input
                {...register("password")}
                type="password"
                autoComplete="current-password"
                className={`w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-gray-900 ${errors.password ? "border-red-500 focus:ring-red-500/10 focus:border-red-500" : ""}`}
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="mt-2 text-xs text-red-600 font-bold">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={login.isPending}
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-2xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:opacity-50 transition-all shadow-xl shadow-blue-200/50 hover:shadow-blue-300/50"
            >
              {login.isPending ? "Signing in..." : "Sign in"}
            </button>
          </div>
          
          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
