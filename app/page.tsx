// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// ========== INTERFACES ==========
interface Feature {
  icon: string;
  title: string;
  description: string;
  user: string;
}

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  features: string[];
  buttonText: string;
  recommended: boolean;
  tag?: string;
}

interface Step {
  number: string;
  title: string;
  description: string;
}

interface ProblemItem {
  icon: string;
  title: string;
  description: string;
}

interface ImpactMetric {
  label: string;
  value: string;
  description: string;
}

// ========== LANDING PAGE CONTENT ==========
export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ========== DATA ==========
  const problems: ProblemItem[] = [
    {
      icon: "📋",
      title: "No Digital Records",
      description: "Entrepreneurs lack formal digital records, collateral, credit history, and organised financial documents."
    },
    {
      icon: "🏦",
      title: "Bank Exclusion",
      description: "Banks and lenders rely on requirements that exclude many promising early-stage businesses."
    },
    {
      icon: "🔍",
      title: "Verification Gap",
      description: "Investors struggle to verify business performance and monitor risk after funding."
    },
    {
      icon: "💔",
      title: "Missed Opportunities",
      description: "Available capital and viable SMEs remain disconnected, limiting economic growth."
    }
  ];

  const features: Feature[] = [
    {
      icon: "👤",
      title: "Business Profile",
      description: "Digital storefront with products, services, location, and trading history.",
      user: "Entrepreneurs"
    },
    {
      icon: "📊",
      title: "Sales & Expense Tracker",
      description: "Record daily sales, expenses, stock activity, receipts, and invoices.",
      user: "Entrepreneurs"
    },
    {
      icon: "💰",
      title: "Funding Dashboard",
      description: "View verified business insights, risk indicators, and funding matches.",
      user: "Investors & Lenders"
    },
    {
      icon: "🤖",
      title: "AI Business Builder",
      description: "Generate business plans, funding readiness scores, and growth recommendations.",
      user: "Entrepreneurs"
    },
    {
      icon: "📈",
      title: "Portfolio Management",
      description: "Track milestones, approvals, reporting, and impact metrics in one place.",
      user: "Investors"
    },
    {
      icon: "🔒",
      title: "Verification & Compliance",
      description: "Identity verification, fraud detection, and platform governance tools.",
      user: "Administrators"
    }
  ];

  const steps: Step[] = [
    {
      number: "01",
      title: "Register & Profile",
      description: "Create a simple business profile with products, services, location, sector, and growth goals."
    },
    {
      number: "02",
      title: "Record & Track",
      description: "Record daily sales, expenses, stock activity, receipts, invoices, and supporting documents."
    },
    {
      number: "03",
      title: "Verify & Connect",
      description: "Give consent for Open Banking access to verify transaction history and cash flow securely."
    },
    {
      number: "04",
      title: "Build Identity",
      description: "AI generates funding readiness scores, business health insights, and matching recommendations."
    },
    {
      number: "05",
      title: "Match & Fund",
      description: "Funders review trusted business insights and make suitable offers for your business."
    },
    {
      number: "06",
      title: "Grow & Report",
      description: "Submit milestones, receive reporting support, and scale your business with ongoing support."
    }
  ];

  const pricingPlans: PricingPlan[] = [
    {
      name: "Seed",
      price: "R150",
      period: "/month",
      features: [
        "Business profile",
        "One active funding application",
        "Basic dashboard",
        "AI funding readiness assessment",
        "Document storage"
      ],
      buttonText: "Start Seed",
      recommended: false
    },
    {
      name: "Sprout",
      price: "R499",
      period: "/month",
      features: [
        "Unlimited funding applications",
        "Enhanced analytics",
        "Priority document storage",
        "Priority matching",
        "Marketing profile",
        "Business verification"
      ],
      buttonText: "Start Sprout",
      recommended: true,
      tag: "Most Popular"
    },
    {
      name: "Harvest",
      price: "R1,299",
      period: "/month",
      features: [
        "Premium visibility",
        "Financial reporting",
        "Performance tracking",
        "Dedicated business support",
        "Campaign support packages",
        "API access"
      ],
      buttonText: "Start Harvest",
      recommended: false
    }
  ];

  const impactMetrics: ImpactMetric[] = [
    {
      label: "Digital Inclusion",
      value: "118+",
      description: "Informal and micro-businesses with active digital profiles"
    },
    {
      label: "Access to Finance",
      value: "R37K+",
      description: "Monthly revenue generated through the platform"
    },
    {
      label: "Market Access",
      value: "183",
      description: "Total users including entrepreneurs and investors"
    },
    {
      label: "Business Growth",
      value: "R20K+",
      description: "Monthly profit from subscriptions and services"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        .gradient-text {
          background: linear-gradient(135deg, #059669 0%, #0D9488 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-gradient {
          background: linear-gradient(135deg, #0A1A1A 0%, #064E3B 50%, #0D9488 100%);
        }
        .card-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px -12px rgba(5, 150, 105, 0.25);
        }
        .pulse-dot {
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        .float-animation {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .step-connector {
          position: relative;
        }
        .step-connector::after {
          content: '';
          position: absolute;
          top: 50%;
          right: -20px;
          width: 40px;
          height: 2px;
          background: linear-gradient(90deg, #059669, #0D9488);
          opacity: 0.3;
        }
        .step-connector:last-child::after {
          display: none;
        }
        @media (max-width: 768px) {
          .step-connector::after {
            display: none;
          }
        }
        .nav-link {
          position: relative;
          font-weight: 500;
          transition: color 0.2s;
        }
        .nav-link:hover {
          color: #059669;
        }
        .pricing-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .pricing-card:hover {
          transform: translateY(-4px);
        }
        .pricing-card.recommended {
          border: 2px solid #059669;
          transform: scale(1.02);
        }
        .pricing-card.recommended:hover {
          transform: scale(1.02) translateY(-4px);
        }
        .testimonial-card {
          transition: all 0.3s ease;
        }
        .testimonial-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px -8px rgba(0, 0, 0, 0.08);
        }
        .floating-shape {
          position: absolute;
          border-radius: 50%;
          opacity: 0.05;
          background: #059669;
        }
        .section-divider {
          background: linear-gradient(90deg, transparent, #059669, transparent);
          height: 1px;
          opacity: 0.1;
        }
        .badge-pulse {
          animation: badgePulse 2s ease-in-out infinite;
        }
        @keyframes badgePulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        .stat-number {
          background: linear-gradient(135deg, #059669, #0D9488);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>

      {/* ========== NAVBAR ========== */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100" : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-sm">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <span className={`text-xl font-bold ${scrolled ? "text-gray-800" : "text-white"}`}>Imbewu</span>
                <span className={`ml-2 text-xs font-medium px-2 py-0.5 rounded-full ${
                  scrolled ? "bg-emerald-100 text-emerald-700" : "bg-white/20 text-white"
                }`}>
                  🌱 Seed
                </span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#problem" className={`nav-link ${scrolled ? "text-gray-600" : "text-white/90"}`}>Problem</a>
              <a href="#solution" className={`nav-link ${scrolled ? "text-gray-600" : "text-white/90"}`}>Solution</a>
              <a href="#how-it-works" className={`nav-link ${scrolled ? "text-gray-600" : "text-white/90"}`}>How It Works</a>
              <a href="#pricing" className={`nav-link ${scrolled ? "text-gray-600" : "text-white/90"}`}>Pricing</a>
              
              {/* Get Started → ALWAYS goes to login */}
              <Link
                href="/auth/signin"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  scrolled 
                    ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm" 
                    : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
                }`}
              >
                Get Started
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition ${scrolled ? "text-gray-600 hover:bg-gray-100" : "text-white hover:bg-white/10"}`}
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className={`md:hidden py-4 border-t ${scrolled ? "border-gray-100" : "border-white/10"}`}>
              <div className="flex flex-col space-y-3">
                <a href="#problem" className={`px-3 py-2 ${scrolled ? "text-gray-600" : "text-white/90"}`}>Problem</a>
                <a href="#solution" className={`px-3 py-2 ${scrolled ? "text-gray-600" : "text-white/90"}`}>Solution</a>
                <a href="#how-it-works" className={`px-3 py-2 ${scrolled ? "text-gray-600" : "text-white/90"}`}>How It Works</a>
                <a href="#pricing" className={`px-3 py-2 ${scrolled ? "text-gray-600" : "text-white/90"}`}>Pricing</a>
                
                {/* Get Started → ALWAYS goes to login */}
                <Link 
                  href="/auth/signin" 
                  className="bg-emerald-600 text-white px-3 py-2 rounded-lg text-center"
                >
                  Get Started
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* ========== HERO SECTION ========== */}
      <section className="hero-gradient min-h-screen flex items-center relative overflow-hidden pt-16">
        <div className="floating-shape w-96 h-96 top-20 -right-20"></div>
        <div className="floating-shape w-64 h-64 bottom-20 -left-20"></div>
        <div className="floating-shape w-48 h-48 top-1/2 left-1/2 -translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white/90 text-sm mb-6">
                <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-emerald-400"></span>
                Digital Inclusion Challenge
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                From Cash Trader to{' '}
                <span className="gradient-text">Fundable Digital Business</span>
              </h1>
              <p className="text-2xl text-emerald-300 font-medium mb-4">Invest today. Grow tomorrow.</p>
              <p className="text-lg text-white/80 mb-8 max-w-lg">
                Imbewu helps informal, micro, and small businesses become visible, trusted, 
                and fundable through verified digital records and AI-powered insights.
              </p>
              <div className="flex flex-wrap gap-4">
                {/* Get Started → ALWAYS goes to login */}
                <Link
                  href="/auth/signin"
                  className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:opacity-90 transition shadow-lg shadow-emerald-500/25"
                >
                  Get Started
                </Link>
                <a
                  href="#how-it-works"
                  className="px-8 py-3 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition"
                >
                  Learn More
                </a>
              </div>
              <div className="flex items-center gap-8 mt-8 pt-8 border-t border-white/10">
                <div>
                  <p className="text-2xl font-bold text-white">118+</p>
                  <p className="text-sm text-white/60">SMEs Onboarded</p>
                </div>
                <div className="h-10 w-px bg-white/10"></div>
                <div>
                  <p className="text-2xl font-bold text-emerald-400">R37K+</p>
                  <p className="text-sm text-white/60">Monthly Revenue</p>
                </div>
                <div className="h-10 w-px bg-white/10"></div>
                <div>
                  <p className="text-2xl font-bold text-white">65+</p>
                  <p className="text-sm text-white/60">Investors</p>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 float-animation">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-400"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                    <div className="h-3 w-3 rounded-full bg-green-400"></div>
                  </div>
                  <span className="text-white/60 text-sm ml-2">Business Profile</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
                    <span className="text-2xl">🏪</span>
                    <div>
                      <p className="text-white font-medium">Zanele's Spaza Shop</p>
                      <p className="text-emerald-400 text-sm">• 98% Trust Score</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
                    <span className="text-2xl">💰</span>
                    <div>
                      <p className="text-white font-medium">Revenue</p>
                      <p className="text-white/70 text-sm">R12,450 this month</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
                    <span className="text-2xl">📈</span>
                    <div>
                      <p className="text-white font-medium">Growth</p>
                      <p className="text-emerald-400 text-sm">+23% vs last month</p>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl text-center">
                    <span className="text-white font-semibold">✅ Funding Ready</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== PROBLEM SECTION ========== */}
      <section id="problem" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-4">
              The Problem
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Good businesses are <span className="gradient-text">invisible to finance</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Many township, rural, youth-owned, and informal enterprises operate in cash 
              with fragmented records, making it impossible to prove business performance.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {problems.map((problem) => (
              <div key={problem.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 card-hover">
                <div className="text-4xl mb-3">{problem.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{problem.title}</h3>
                <p className="text-gray-600 text-sm">{problem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SOLUTION SECTION ========== */}
      <section id="solution" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-4">
              Our Solution
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Your Digital <span className="gradient-text">Business Identity</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Imbewu turns everyday trading activity into a verified, trusted, and fundable business profile.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 card-hover">
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{feature.description}</p>
                <span className="inline-block text-xs font-medium bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full">
                  {feature.user}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-4">
              How It Works
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              From Cash to <span className="gradient-text">Credibility</span> in 6 Steps
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step) => (
              <div key={step.number} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative step-connector">
                <div className="text-4xl font-bold text-emerald-100 absolute top-3 right-4">
                  {step.number}
                </div>
                <div className="relative z-10">
                  <div className="text-3xl mb-3">📌</div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== PRICING SECTION ========== */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-4">
              Pricing
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Choose Your <span className="gradient-text">Growth Plan</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Start at a low cost and scale with advanced features as your business grows.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingPlans.map((plan) => (
              <div key={plan.name} className={`pricing-card bg-gray-50 rounded-2xl p-6 border ${plan.recommended ? 'recommended border-emerald-500' : 'border-gray-200'}`}>
                {plan.tag && (
                  <div className="bg-emerald-500 text-white text-xs font-semibold px-3 py-1 rounded-full inline-block mb-3">
                    {plan.tag}
                  </div>
                )}
                <h3 className="text-xl font-bold text-gray-800">{plan.name}</h3>
                <div className="mt-2 mb-4">
                  <span className="text-4xl font-bold text-emerald-600">{plan.price}</span>
                  <span className="text-gray-500">{plan.period}</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-emerald-500 mt-0.5">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/auth/signup"
                  className={`block text-center px-6 py-2.5 rounded-xl font-semibold transition ${
                    plan.recommended
                      ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:opacity-90 shadow-lg shadow-emerald-500/25"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {plan.buttonText}
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <div className="inline-block bg-gray-50 rounded-xl px-6 py-3 border border-gray-200">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Transaction fees:</span> 2–4% on funding value • 
                <span className="font-semibold ml-2">Verification:</span> R600 • 
                <span className="font-semibold ml-2">Marketing packages:</span> Custom pricing
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== IMPACT SECTION ========== */}
      <section className="py-20 hero-gradient relative overflow-hidden">
        <div className="floating-shape w-96 h-96 top-0 right-0"></div>
        <div className="floating-shape w-64 h-64 bottom-0 left-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-white/10 text-emerald-300 rounded-full text-sm font-semibold mb-4 backdrop-blur-sm">
              Impact
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Measuring <span className="gradient-text">What Matters</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactMetrics.map((metric) => (
              <div key={metric.label} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center">
                <p className="text-4xl font-bold text-emerald-400 mb-2">{metric.value}</p>
                <h3 className="text-white font-semibold mb-1">{metric.label}</h3>
                <p className="text-white/60 text-sm">{metric.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-white">183</p>
                <p className="text-white/60 text-sm">Total Users</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-emerald-400">R37K+</p>
                <p className="text-white/60 text-sm">Monthly Revenue</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">R20K+</p>
                <p className="text-white/60 text-sm">Monthly Profit</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-emerald-400">65+</p>
                <p className="text-white/60 text-sm">Active Investors</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CTA SECTION ========== */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Ready to turn your cash business into a <span className="gradient-text">fundable digital business</span>?
          </h2>
          <p className="text-gray-600 mb-8">
            Join Imbewu today and start building your digital business identity.
          </p>
          <Link
            href="/auth/signup"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:opacity-90 transition shadow-lg shadow-emerald-500/25"
          >
            Get Started Now
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="bg-gray-900 text-white/70 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                  <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <span className="text-xl font-bold text-white">Imbewu</span>
              </div>
              <p className="text-sm">From Cash Trader to Fundable Digital Business</p>
              <div className="flex gap-4 mt-4">
                <a href="#" className="text-white/50 hover:text-white transition">📱</a>
                <a href="#" className="text-white/50 hover:text-white transition">🐦</a>
                <a href="#" className="text-white/50 hover:text-white transition">📸</a>
                <a href="#" className="text-white/50 hover:text-white transition">💼</a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#problem" className="hover:text-white transition">Problem</a></li>
                <li><a href="#solution" className="hover:text-white transition">Solution</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition">How It Works</a></li>
                <li><a href="#pricing" className="hover:text-white transition">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Data Protection</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm">
            <p>© 2026 Imbewu. All rights reserved. Built for the Digital Inclusion Challenge.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}