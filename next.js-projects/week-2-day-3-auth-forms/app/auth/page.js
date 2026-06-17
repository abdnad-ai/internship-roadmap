"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, registerSchema } from "./schemas";

export default function AuthPage() {
  const [mode, setMode] = useState("login");
  const [submitStatus, setSubmitStatus] = useState(null);
  const isLogin = mode === "login";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(isLogin ? loginSchema : registerSchema) });

  async function onSubmit(data) {
    setSubmitStatus(null);
    try {
      await new Promise((r) => setTimeout(r, 800));
      console.log(data);
      setSubmitStatus("success");
      reset();
    } catch (err) {
      setSubmitStatus("error");
    }
  }

  function switchMode(next) {
    setMode(next);
    setSubmitStatus(null);
    reset();
  }

  const inputClass =
    "w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30";

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-10">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />

      <div className="relative w-full max-w-md">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 font-bold text-slate-950">
            S
          </div>
          <span className="text-lg font-semibold tracking-tight text-white">
            SkillForge Studio
          </span>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-2xl backdrop-blur">
          <div className="mb-8 flex rounded-xl border border-slate-800 bg-slate-950 p-1">
            <button
              type="button"
              onClick={() => switchMode("login")}
              className={`flex-1 rounded-lg py-2 text-sm font-medium transition ${
                isLogin
                  ? "bg-gradient-to-r from-cyan-400 to-violet-500 text-slate-950"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={() => switchMode("register")}
              className={`flex-1 rounded-lg py-2 text-sm font-medium transition ${
                !isLogin
                  ? "bg-gradient-to-r from-cyan-400 to-violet-500 text-slate-950"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Register
            </button>
          </div>

          <h1 className="text-2xl font-bold text-white">
            {isLogin ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            {isLogin
              ? "Sign in to continue to your dashboard."
              : "Start building with SkillForge Studio."}
          </p>

          {submitStatus === "success" && (
            <div className="mt-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
              {isLogin ? "Signed in successfully." : "Account created successfully."}
            </div>
          )}
          {submitStatus === "error" && (
            <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              Something went wrong. Please try again.
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
            {!isLogin && (
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Full name
                </label>
                <input
                  type="text"
                  placeholder="Your full name"
                  {...register("name")}
                  className={inputClass}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
                )}
              </div>
            )}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                {...register("email")}
                className={inputClass}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Password
              </label>
              <input
                type="password"
                placeholder={isLogin ? "Enter your password" : "Create a password"}
                {...register("password")}
                className={inputClass}
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>
              )}
            </div>

            {!isLogin && (
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Confirm password
                </label>
                <input
                  type="password"
                  placeholder="Re-enter your password"
                  {...register("confirmPassword")}
                  className={inputClass}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-400">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:opacity-90 disabled:opacity-60"
            >
              {isSubmitting ? "Please wait..." : isLogin ? "Sign in" : "Create account"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
} 