"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthLogo, AuthShell } from "../AuthShell";
import s from "../auth.module.css";

type SessionUser = {
  role?: "entrepreneur" | "funder";
};

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchParams.get("registered") === "true") {
      const role = searchParams.get("role");
      const roleName = role === "entrepreneur" ? "Entrepreneur" : "Funder";
      setSuccess(`${roleName} account created successfully. Please sign in.`);
    }
  }, [searchParams]);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      const user = session.user as SessionUser;
      router.push(user.role === "funder" ? "/funder/dashboard" : "/entrepreneur/dashboard");
    }
  }, [status, session, router]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        action: "signin",
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password. Please try again.");
      } else {
        setSuccess("Signing in...");
        router.refresh();
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (role: "entrepreneur" | "funder") => {
    setEmail(role === "entrepreneur" ? "entrepreneur@imbewu.com" : "funder@imbewu.com");
    setPassword("password");
  };

  return (
    <AuthShell mode="signin">
      <div className={`${s.formInner} ${s.signinInner}`}>
        <AuthLogo />
        <span className={s.kicker}>Welcome back</span>
        <h1 className={s.title}>Log in to your growth space.</h1>
        <p className={s.subtitle}>Continue building your business footprint, tracking your records, and preparing for the opportunities ahead.</p>

        <form className={s.form} onSubmit={handleSubmit}>
          {error && <div className={`${s.message} ${s.error}`}>{error}</div>}
          {success && <div className={`${s.message} ${s.success}`}>{success}</div>}

          <div className={s.field}>
            <label htmlFor="email">Email address</label>
            <input id="email" type="email" required value={email} onChange={event => setEmail(event.target.value)} placeholder="you@example.com" disabled={loading} />
          </div>

          <div className={s.field}>
            <label htmlFor="password">Password</label>
            <input id="password" type="password" required value={password} onChange={event => setPassword(event.target.value)} placeholder="Enter your password" disabled={loading} />
          </div>

          <button className={s.submitButton} type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className={s.demoBlock}>
          <p className={s.demoTitle}>Quick demo login</p>
          <div className={s.demoGrid}>
            <button className={s.demoButton} type="button" onClick={() => fillDemo("entrepreneur")}>Entrepreneur</button>
            <button className={s.demoButton} type="button" onClick={() => fillDemo("funder")}>Funder</button>
          </div>
          <p className={s.hint}>Password: <strong>password</strong></p>
        </div>

        <p className={s.switchText}>
          Don't have an account? <Link href="/auth/signup">Create one now</Link>
        </p>
      </div>
    </AuthShell>
  );
}

export default function SignIn() {
  return (
    <Suspense fallback={<div className={s.authPage} role="status">Loading sign in...</div>}>
      <SignInForm />
    </Suspense>
  );
}
