"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import s from "./auth.module.css";
import { useTheme } from "../useTheme";

const slides = [
  {
    src: "/auth/auth-food-entrepreneur.png",
    alt: "Food entrepreneur preparing meals and organising sales records",
    title: "Every sale can become proof.",
    text: "Turn daily trading, receipts and documents into a business footprint that travels.",
  },
  {
    src: "/auth/auth-spaza-owner.png",
    alt: "Spaza shop owner reviewing business records",
    title: "From cash activity to clean records.",
    text: "Imbewu helps active businesses become visible, organised and trusted.",
  },
  {
    src: "/auth/auth-agri-business.png",
    alt: "Agricultural business owner recording produce sales",
    title: "Built for real businesses in motion.",
    text: "Township, rural, youth-owned and micro businesses can build credibility at their own pace.",
  },
  {
    src: "/auth/auth-repair-services.png",
    alt: "Repair business owner recording work activity on a phone",
    title: "Your hustle deserves structure.",
    text: "Capture the work already happening and shape it into a stronger financial story.",
  },
  {
    src: "/auth/auth-youth-founder.png",
    alt: "Young founder checking orders at a pop-up shop",
    title: "Start simple. Grow into readiness.",
    text: "Profile, records, documents and insights come together in one trusted space.",
  },
  {
    src: "/auth/auth-funder-review.png",
    alt: "Funding analyst reviewing small business profiles",
    title: "Give funders a clearer picture.",
    text: "Verified information helps opportunity meet businesses with real potential.",
  },
];

function LeafIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 21v-9M12 15C5 15 3 10 3 4c7 0 9 4 9 11Zm0-3c0-6 4-9 9-9 0 6-3 9-9 9Z" />
    </svg>
  );
}

export function AuthShell({ children, mode }: { children: ReactNode; mode: "signin" | "signup" }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide(current => (current + 1) % slides.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, []);

  const currentSlide = slides[activeSlide];

  return (
    <main className={`${s.authPage} ${s[theme]}`}>
      <div className={s.ambientField} aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className={s.waveField} aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <Link href="/" className={s.homeLink} aria-label="Back to Imbewu home">
        <span><LeafIcon /></span>imbewu<b>.</b>
      </Link>
      <button className={s.themeToggle} type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}>
        {theme === "light" ? "Dark" : "Light"}
      </button>

      <section className={`${s.authFrame} ${mode === "signup" ? s.visualRight : s.visualLeft}`}>
        <div className={s.visualPanel} aria-label="Imbewu business stories">
          <div className={s.imageStack}>
            {slides.map((slide, index) => (
              <Image
                key={slide.src}
                src={slide.src}
                alt={slide.alt}
                fill
                priority={index === 0}
                sizes="(max-width: 900px) 100vw, 48vw"
                className={index === activeSlide ? s.activeImage : ""}
              />
            ))}
          </div>

          <div className={s.visualGlass}>
            <span>{mode === "signin" ? "Welcome back" : "Start your footprint"}</span>
            <h2>{currentSlide.title}</h2>
            <p>{currentSlide.text}</p>
          </div>

          <div className={s.slideDots} aria-label="Auth image carousel">
            {slides.map((slide, index) => (
              <button key={slide.src} type="button" aria-label={`Show image ${index + 1}`} aria-pressed={index === activeSlide} onClick={() => setActiveSlide(index)} />
            ))}
          </div>
        </div>

        <div className={s.formPanel}>
          {children}
        </div>
      </section>
    </main>
  );
}

export function AuthLogo() {
  return (
    <div className={s.logoMark} aria-hidden="true">
      <LeafIcon />
    </div>
  );
}
