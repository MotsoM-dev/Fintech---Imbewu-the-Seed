"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import s from "./landing.module.css";

type IconName = "arrow" | "leaf" | "chart" | "spark" | "shield" | "check" | "menu" | "moon" | "sun" | "store" | "file";
type PreviewKey = "profile" | "records" | "funding";
type SectionKey = "market" | "platform" | "journey" | "pricing";

function Icon({ name, className = "" }: { name: IconName; className?: string }) {
  const paths: Record<IconName, string> = {
    arrow: "M5 12h14m-6-6 6 6-6 6",
    leaf: "M12 21v-9M12 15C5 15 3 10 3 4c7 0 9 4 9 11Zm0-3c0-6 4-9 9-9 0 6-3 9-9 9Z",
    chart: "M4 4v16h16M8 15l4-5 4 2 4-7",
    spark: "m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z",
    shield: "m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Zm-4 9 3 3 5-6",
    check: "m5 12 4 4L19 6",
    menu: "M4 7h16M4 12h16M4 17h16",
    moon: "M21 14.5A8.5 8.5 0 0 1 9.5 3 7 7 0 1 0 21 14.5Z",
    sun: "M12 4V2m0 20v-2m8-8h2M2 12h2m14.1 6.1 1.4 1.4M4.5 4.5l1.4 1.4m0 12.2-1.4 1.4M19.5 4.5l-1.4 1.4M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z",
    store: "M4 10h16l-1-5H5l-1 5Zm2 0v9h12v-9M9 19v-5h6v5M4 10c0 2 3 2 4 0 1 2 5 2 6 0 1 2 4 2 6 0",
    file: "M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6Zm0 0v6h6M8 13h8M8 17h6",
  };

  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  );
}

const previews: Record<PreviewKey, { label: string; metric: string; value: string; change: string; bars: number[] }> = {
  profile: { label: "Digital identity forming", metric: "Profile strength", value: "76%", change: "4 records added this week", bars: [24, 31, 38, 44, 48, 56, 61, 67, 72, 76, 82, 88] },
  records: { label: "Cash activity becomes evidence", metric: "Recorded turnover", value: "R 24,850", change: "+18.6% this month", bars: [18, 28, 34, 42, 39, 58, 52, 71, 63, 82, 76, 100] },
  funding: { label: "Better prepared for review", metric: "Funding readiness", value: "82 / 100", change: "3 actions to strengthen trust", bars: [15, 23, 31, 37, 45, 49, 57, 64, 68, 74, 78, 82] },
};

const marketCards = [
  { icon: "store" as IconName, title: "Township traders", text: "For cash-first shops, food businesses, repairs and services that already move money but need clean proof of performance.", flip: "Capture sales, receipts and daily activity without turning the business upside down." },
  { icon: "leaf" as IconName, title: "Rural & agricultural businesses", text: "For growers, local suppliers and seasonal operators who need a digital record that travels further than paper.", flip: "Build a footprint over time, even when trading patterns change month to month." },
  { icon: "spark" as IconName, title: "Youth-owned ventures", text: "For emerging founders who sell through WhatsApp, pop-ups and word of mouth, and want to look funder-ready.", flip: "Turn scattered proof into a profile customers, partners and funders can understand." },
  { icon: "file" as IconName, title: "Micro businesses", text: "For businesses that are too active to stay invisible but not yet served well by formal finance tools.", flip: "Start with the records you have, then grow into stronger reports and funding readiness." },
];

const navItems: Array<{ id: SectionKey; label: string }> = [
  { id: "market", label: "Who we serve" },
  { id: "platform", label: "What it does" },
  { id: "journey", label: "How it works" },
  { id: "pricing", label: "Pricing" },
];

const impactStats = [
  { value: "65%", label: "of informal businesses in the Eastern Cape operate unregistered, according to the business-plan research." },
  { value: "1 layer", label: "brings profile, records, documents, insights and funding readiness into one business footprint." },
  { value: "3 moves", label: "digitise activity, build credibility, then connect to opportunity when the business is ready." },
];

const coreFeatures = [
  ["Digital profile", "A professional business identity with contact details, trading information and credibility signals."],
  ["Storefront", "A clearer way to present products and services to customers, partners and future funders."],
  ["Sales and expenses", "Daily cash activity becomes structured financial information the owner can understand."],
  ["Receipts and invoices", "Proof that used to live on paper or WhatsApp becomes organised and easier to retrieve."],
  ["Document storage", "Registration papers, invoices, receipts and business records sit in one secure place."],
  ["AI analysis", "Insights into business health, patterns, risks and funding readiness."],
  ["Open banking", "Consent-based banking data can strengthen the footprint when the business is ready."],
  ["Funding marketplace", "Eligible businesses can connect with lenders, investors and financial partners."],
];

const plans = [
  { name: "Seed", note: "Digitise the essentials.", price: "250", features: ["Digital business profile", "Digital receipts", "Sales and expense recording", "Document storage"] },
  { name: "Sprout", note: "Build insight and readiness.", price: "450", features: ["Everything in Seed", "Cash-flow tracking", "Financial reports", "Funding readiness insights"] },
  { name: "Harvest", note: "Prepare for bigger opportunities.", price: "950", features: ["Everything in Sprout", "Financial forecasting", "AI-powered analytics", "Priority funder matching"] },
];

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [paused, setPaused] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [tab, setTab] = useState<PreviewKey>("profile");
  const [activeSection, setActiveSection] = useState<SectionKey>("market");
  const root = useRef<HTMLDivElement>(null);
  const scene = useRef<HTMLDivElement>(null);
  const preview = previews[tab];

  useEffect(() => {
    const stored = window.localStorage.getItem("imbewu-theme");
    if (stored === "dark" || stored === "light") {
      setTheme(stored);
      return;
    }

    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    const sections = navItems.map(item => document.getElementById(item.id)).filter((section): section is HTMLElement => Boolean(section));
    if (!sections.length || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(entries => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible?.target.id) {
        setActiveSection(visible.target.id as SectionKey);
      }
    }, { rootMargin: "-35% 0px -45% 0px", threshold: [0.1, 0.25, 0.5] });

    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    window.localStorage.setItem("imbewu-theme", theme);
  }, [theme]);

  useEffect(() => {
    const elements = root.current?.querySelectorAll("[data-reveal]");
    if (!elements || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(s.visible);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [menuOpen]);

  const toggleTheme = () => setTheme(current => (current === "light" ? "dark" : "light"));

  return (
    <div ref={root} className={`${s.landing} ${s[theme]} ${paused ? s.paused : ""}`}>
      <a className={s.skip} href="#main">Skip to content</a>
      <header className={s.header}>
        <Link href="/" className={s.brand} aria-label="Imbewu home"><span className={s.brandIcon}><Icon name="leaf" /></span>imbewu<span className={s.brandDot}>.</span></Link>
        <nav className={s.desktopNav} aria-label="Main navigation">
          {navItems.map(item => (
            <a key={item.id} href={`#${item.id}`} className={activeSection === item.id ? s.activeNav : ""} aria-current={activeSection === item.id ? "true" : undefined}>{item.label}</a>
          ))}
        </nav>
        <div className={s.navActions}>
          <button className={s.themeToggle} onClick={toggleTheme} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`} aria-pressed={theme === "dark"}>
            <Icon name={theme === "light" ? "moon" : "sun"} />
          </button>
          <Link className={s.login} href="/auth/signin">Log in</Link>
          <Link className={s.navCta} href="/auth/signup">Start <Icon name="arrow" /></Link>
          <button className={s.menuButton} onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="mobile-navigation"><Icon name="menu" /></button>
        </div>
        {menuOpen && (
          <nav id="mobile-navigation" className={s.mobileNav} aria-label="Mobile navigation">
            {[...navItems.map(item => [`#${item.id}`, item.label]), ["/auth/signin", "Log in"]].map(([href, label]) => (
              <Link href={href} key={href} onClick={() => setMenuOpen(false)}>{label}<Icon name="arrow" /></Link>
            ))}
          </nav>
        )}
      </header>

      <main id="main">
        <section className={s.hero}>
          <div className={s.heroCopy}>
            <div className={s.eyebrow}><span className={s.liveDot} /> DIGITISE TODAY. BUILD YOUR FOOTPRINT.</div>
            <h1>Build the <span className={s.gradientText}>digital <span className={s.mobileLine}>proof</span></span> your business deserves.</h1>
            <p>Imbewu helps informal, micro and small businesses turn cash sales, receipts, documents and everyday trading into a trusted digital identity that opens the door to customers, partners and funding.</p>
            <div className={s.heroActions}>
              <Link className={s.primaryButton} href="/auth/signup">Create your footprint <Icon name="arrow" /></Link>
              <a className={s.textButton} href="#platform"><span className={s.playIcon}>+</span> See the platform</a>
            </div>
          </div>

          <div ref={scene} className={s.scene} onPointerMove={event => {
            if (paused || event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
            const bounds = event.currentTarget.getBoundingClientRect();
            scene.current?.style.setProperty("--rx", `${((event.clientY - bounds.top) / bounds.height - 0.5) * -7}deg`);
            scene.current?.style.setProperty("--ry", `${((event.clientX - bounds.left) / bounds.width - 0.5) * 9}deg`);
          }} onPointerLeave={() => {
            scene.current?.style.setProperty("--rx", "0deg");
            scene.current?.style.setProperty("--ry", "0deg");
          }}>
            <div className={s.sculpture} aria-hidden="true"><div className={s.orbit} /><div className={s.orbitTwo} /><div className={s.liquidOrb} /><div className={s.orbCore} /><span className={s.starOne}>+</span><span className={s.starTwo}>+</span></div>
            <div className={s.floatingBadge}><span className={s.badgeIcon}><Icon name="shield" /></span><div>Credibility layer<small>Records become trust signals.</small></div><span className={s.badgeCheck}>OK</span></div>
            <div className={s.dashboard}>
              <div className={s.dashTop}><span className={s.dashLogo}><Icon name="leaf" /> Business footprint</span><span className={s.demoBadge}>LIVE VIEW</span></div>
              <div className={s.tabs} role="tablist" aria-label="Business preview">
                {(Object.keys(previews) as PreviewKey[]).map((key, index, keys) => (
                  <button key={key} id={`tab-${key}`} role="tab" aria-selected={tab === key} aria-controls="business-preview" tabIndex={tab === key ? 0 : -1} className={tab === key ? s.activeTab : ""} onClick={() => setTab(key)} onKeyDown={event => {
                    let next: PreviewKey | undefined;
                    if (event.key === "ArrowRight") next = keys[(index + 1) % keys.length];
                    if (event.key === "ArrowLeft") next = keys[(index + keys.length - 1) % keys.length];
                    if (event.key === "Home") next = keys[0];
                    if (event.key === "End") next = keys[keys.length - 1];
                    if (next) {
                      event.preventDefault();
                      setTab(next);
                      document.getElementById(`tab-${next}`)?.focus();
                    }
                  }}>{key}</button>
                ))}
              </div>
              <div id="business-preview" role="tabpanel" aria-labelledby={`tab-${tab}`} tabIndex={0}>
                <p className={s.dashGreeting}>{preview.label}</p>
                <div className={s.metricLabel}>{preview.metric}<span>THIS MONTH</span></div>
                <div className={s.metricRow}><strong>{preview.value}</strong><span>{preview.change}</span></div>
                <div className={s.chart} aria-hidden="true">{preview.bars.map((height, i) => <div key={i} style={{ "--bar-height": `${height}%`, "--i": i } as CSSProperties} />)}</div>
                <div className={s.chartAxis}><span>Week 1</span><span>Week 2</span><span>Week 4</span></div>
              </div>
              <div className={s.dashBottom}><span><span className={s.liveDot} /> From scattered activity to structured proof.</span><Icon name="spark" /></div>
            </div>
            <div className={s.growthBadge}><span><Icon name="chart" /></span><div>Visible.<br /><strong>Trusted. Fundable.</strong></div></div>
          </div>
          <div className={s.heroBottom}><a href="#market">Scroll the idea</a><button onClick={() => setPaused(!paused)} aria-pressed={paused}>{paused ? "Enable motion" : "Pause motion"}</button><span>Eastern Cape pilot to national scale</span></div>
        </section>

        <div className={s.promiseStrip}>
          <span>THE BIG IDEA</span>
          <div><Icon name="store" /> Capture the hustle</div><i />
          <div><Icon name="file" /> Structure the evidence</div><i />
          <div><Icon name="shield" /> Unlock opportunity</div>
        </div>

        <section id="market" className={s.market}>
          <div className={s.sectionHeading} data-reveal>
            <div><span className={s.eyebrow}>WHO WE ARE FOR</span><h2>Built for businesses that are active, growing and still too invisible.</h2></div>
            <p>Many entrepreneurs have real sales and growth potential, but their proof lives in cash, notebooks, WhatsApp messages and scattered documents. Imbewu turns that reality into a credible digital footprint.</p>
          </div>
          <div className={s.statGrid} data-reveal>
            {impactStats.map(stat => (
              <article key={stat.value}>
                <strong>{stat.value}</strong>
                <p>{stat.label}</p>
              </article>
            ))}
          </div>
          <div className={s.flipGrid}>
            {marketCards.map(card => (
              <article className={s.flipCard} key={card.title} tabIndex={0} data-reveal>
                <div className={s.flipInner}>
                  <div className={s.flipFace}>
                    <span className={s.featureIcon}><Icon name={card.icon} /></span>
                    <h3>{card.title}</h3>
                    <p>{card.text}</p>
                  </div>
                  <div className={`${s.flipFace} ${s.flipBack}`}>
                    <span className={s.smallTag}>HOW IMBEWU HELPS</span>
                    <p>{card.flip}</p>
                    <Link href="/auth/signup">Start building <Icon name="arrow" /></Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="platform" className={s.platform}>
          <div className={s.platformCopy} data-reveal>
            <span className={s.eyebrow}>THE CREDIBILITY ENGINE</span>
            <h2>Not another funding shortcut. A path to becoming fundable.</h2>
            <p>Imbewu meets entrepreneurs where they are, then helps them formalise, record activity, organise documents, understand business health and prepare for the right funding opportunities at the right time.</p>
            <Link className={s.primaryButton} href="/auth/signup">Build your profile <Icon name="arrow" /></Link>
          </div>
          <div className={s.featureStack}>
            {[
              ["Digital profile & storefront", "Present your business clearly with contact details, trading activity, products and credibility signals."],
              ["Sales, expense & receipt tracking", "Transform daily activity into structured records that show how the business really operates."],
              ["AI readiness & funder matching", "Use business information to surface insights, risks and next steps toward finance readiness."],
            ].map(([title, text], index) => (
              <article style={{ "--delay": index } as CSSProperties} key={title} data-reveal>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><h3>{title}</h3><p>{text}</p></div>
              </article>
            ))}
          </div>
          <div className={s.coreFeatureGrid} data-reveal>
            {coreFeatures.map(([title, text]) => (
              <article key={title}>
                <Icon name={title === "Storefront" ? "store" : title === "Document storage" ? "file" : title === "Funding marketplace" ? "shield" : "check"} />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="journey" className={s.journey}>
          <div className={s.journeyIntro} data-reveal>
            <span className={s.eyebrow}>HOW GROWTH BEGINS</span>
            <h2>Digitise activity. Build identity. Earn trust.</h2>
            <p>Funding is not the first promise. The first promise is clarity: a cleaner way to show the value already moving through the business.</p>
          </div>
          <div className={s.steps}>
            {[
              ["01", "Set up your business profile.", "Start with the information customers and funders need to understand who you are."],
              ["02", "Record the daily proof.", "Capture sales, expenses, invoices, receipts and key documents as business happens."],
              ["03", "Grow a financial footprint.", "Let the platform organise your records into a stronger picture of performance."],
              ["04", "Connect to opportunity.", "When the footprint is ready, use readiness insights and marketplace pathways to move toward funding."],
            ].map(([num, title, description]) => (
              <article key={num} data-reveal><span className={s.stepNumber}>{num}</span><div><h3>{title}</h3><p>{description}</p></div><span className={s.stepArrow} aria-hidden="true">+</span></article>
            ))}
          </div>
        </section>

        <section id="pricing" className={s.pricing}>
          <div className={s.pricingHeading} data-reveal>
            <span className={s.eyebrow}>ROOM FOR EVERY STAGE</span>
            <h2>Start where you are. Grow into the next layer.</h2>
            <p>Monthly plans in South African rand, based on the business model in the Imbewu plan.</p>
          </div>
          <div className={s.plans}>
            {plans.map((plan, i) => (
              <article key={plan.name} className={`${s.plan} ${i === 1 ? s.recommended : ""}`} data-reveal>
                {i === 1 && <span className={s.recommendedLabel}>POPULAR GROWTH LAYER</span>}
                <span className={s.planSymbol} aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <h3>{plan.name}</h3>
                <p>{plan.note}</p>
                <div className={s.price}><span>R</span>{plan.price}<small>/ month</small></div>
                <Link href="/auth/signup" className={i === 1 ? s.primaryButton : s.planButton}>Choose {plan.name} <Icon name="arrow" /></Link>
                <ul>{plan.features.map(feature => <li key={feature}><Icon name="check" />{feature}</li>)}</ul>
              </article>
            ))}
          </div>
          <p className={s.feeNote}>Business registration support starts from R300. Successful funding referrals use a 2% platform fee.</p>
        </section>

        <section className={s.finalCta} data-reveal>
          <span className={s.eyebrow}>IMBEWU MEANS SEED</span>
          <h2>Give your business a footprint that can travel.</h2>
          <p>From informal records to a trusted digital identity, Imbewu helps small businesses become visible, credible and ready for bigger opportunities.</p>
          <Link href="/auth/signup" className={s.whiteButton}>Plant your first seed <Icon name="arrow" /></Link>
          <span className={s.ctaWatermark} aria-hidden="true">imbewu.</span>
        </section>
      </main>

      <footer className={s.footer}>
        <Link href="/" className={s.brand}><span className={s.brandIcon}><Icon name="leaf" /></span>imbewu.</Link>
        <p>Digitise today. Build your footprint. Unlock opportunity.</p>
        <div><a href="#market">Market</a><a href="#platform">Platform</a><Link href="/auth/signin">Log in</Link></div>
        <span>(c) {new Date().getFullYear()} Imbewu</span>
      </footer>
    </div>
  );
}
