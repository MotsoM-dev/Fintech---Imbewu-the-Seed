// app/entrepreneur/onboarding/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type Step = 1 | 2 | 3 | 4 | 5 | 6;

interface OnboardingData {
  // Step 1: Account
  fullName: string;
  email: string;
  phone: string;
  
  // Step 2: Business
  businessName: string;
  businessDescription: string;
  sector: string;
  location: string;
  
  // Step 3: Trading
  tradingHistory: string;
  businessStage: string;
  monthlyRevenue: string;
  employeeCount: string;
  
  // Step 4: Documents
  registrationDoc: File | null;
  idDoc: File | null;
  
  // Step 5: Goals
  fundingGoals: string;
  fundingAmount: string;
}

export default function EntrepreneurOnboarding() {
  const router = useRouter();
  const { data: session } = useSession();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState<OnboardingData>({
    fullName: session?.user?.name || "",
    email: session?.user?.email || "",
    phone: "",
    businessName: "",
    businessDescription: "",
    sector: "",
    location: "",
    tradingHistory: "",
    businessStage: "",
    monthlyRevenue: "",
    employeeCount: "",
    registrationDoc: null,
    idDoc: null,
    fundingGoals: "",
    fundingAmount: "",
  });

  const sectors = [
    "Agriculture",
    "Retail",
    "Food & Beverage",
    "Technology",
    "Manufacturing",
    "Construction",
    "Transport & Logistics",
    "Healthcare",
    "Education",
    "Financial Services",
    "Tourism & Hospitality",
    "Media & Communications",
    "Creative Arts",
    "Professional Services",
    "Other"
  ];

  const businessStages = [
    "Ideation",
    "Startup",
    "Early Growth",
    "Established",
    "Expanding"
  ];

  const revenueRanges = [
    "Less than R5,000",
    "R5,000 - R10,000",
    "R10,000 - R25,000",
    "R25,000 - R50,000",
    "R50,000 - R100,000",
    "R100,000+"
  ];

  const handleChange = (field: keyof OnboardingData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = (step: Step): boolean => {
    switch (step) {
      case 1:
        if (!formData.fullName || !formData.email || !formData.phone) {
          setError("Please fill in all required fields");
          return false;
        }
        break;
      case 2:
        if (!formData.businessName || !formData.businessDescription || !formData.sector || !formData.location) {
          setError("Please fill in all business details");
          return false;
        }
        break;
      case 3:
        if (!formData.tradingHistory || !formData.businessStage || !formData.monthlyRevenue || !formData.employeeCount) {
          setError("Please fill in all trading details");
          return false;
        }
        break;
      case 5:
        if (!formData.fundingGoals || !formData.fundingAmount) {
          setError("Please fill in your funding goals");
          return false;
        }
        break;
    }
    setError("");
    return true;
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) return;
    if (currentStep < 6) {
      setCurrentStep((currentStep + 1) as Step);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as Step);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;
    
    setLoading(true);
    setError("");

    try {
      // Save onboarding data to localStorage
      const onboardingData = {
        ...formData,
        registrationDoc: formData.registrationDoc ? {
          name: formData.registrationDoc.name,
          size: formData.registrationDoc.size,
          type: formData.registrationDoc.type,
        } : null,
        idDoc: formData.idDoc ? {
          name: formData.idDoc.name,
          size: formData.idDoc.size,
          type: formData.idDoc.type,
        } : null,
        completedAt: new Date().toISOString(),
        profileComplete: true,
      };

      localStorage.setItem('entrepreneur_onboarding', JSON.stringify(onboardingData));

      // Update user profile in localStorage
      const userData = {
        ...session?.user,
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        businessName: formData.businessName,
        businessDescription: formData.businessDescription,
        sector: formData.sector,
        location: formData.location,
        tradingHistory: formData.tradingHistory,
        businessStage: formData.businessStage,
        monthlyRevenue: formData.monthlyRevenue,
        employeeCount: formData.employeeCount,
        fundingGoals: formData.fundingGoals,
        fundingAmount: formData.fundingAmount,
        onboardingComplete: true,
      };
      localStorage.setItem('imbewu_user', JSON.stringify(userData));

      // Save to dashboard data
      const dashboardData = {
        revenue: "R0",
        expenses: "R0",
        profit: "R0",
        readiness: 25,
        businessName: formData.businessName,
        sector: formData.sector,
        location: formData.location,
      };
      localStorage.setItem('entrepreneur_dashboard', JSON.stringify(dashboardData));

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Redirect to dashboard
      router.push("/entrepreneur/dashboard");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="+27 82 123 4567"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.businessName}
                onChange={(e) => handleChange("businessName", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="Your business name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.businessDescription}
                onChange={(e) => handleChange("businessDescription", e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="What does your business do?"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sector <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.sector}
                onChange={(e) => handleChange("sector", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="">Select your sector</option>
                {sectors.map((sector) => (
                  <option key={sector} value={sector}>{sector}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="City, Province"
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Trading History <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.tradingHistory}
                onChange={(e) => handleChange("tradingHistory", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="">How long have you been trading?</option>
                <option value="Less than 3 months">Less than 3 months</option>
                <option value="3-6 months">3-6 months</option>
                <option value="6-12 months">6-12 months</option>
                <option value="1-2 years">1-2 years</option>
                <option value="2-5 years">2-5 years</option>
                <option value="5+ years">5+ years</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Stage <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.businessStage}
                onChange={(e) => handleChange("businessStage", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="">Select your business stage</option>
                {businessStages.map((stage) => (
                  <option key={stage} value={stage}>{stage}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Monthly Revenue Estimate <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.monthlyRevenue}
                onChange={(e) => handleChange("monthlyRevenue", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="">Select revenue range</option>
                {revenueRanges.map((range) => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Employees <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.employeeCount}
                onChange={(e) => handleChange("employeeCount", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="">How many employees?</option>
                <option value="1">1 (Sole proprietor)</option>
                <option value="2-5">2-5</option>
                <option value="6-10">6-10</option>
                <option value="11-50">11-50</option>
                <option value="50+">50+</option>
              </select>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Registration Document
              </label>
              <input
                type="file"
                onChange={(e) => handleChange("registrationDoc", e.target.files?.[0] || null)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                accept=".pdf,.doc,.docx,.jpg,.png"
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.registrationDoc ? `✅ ${formData.registrationDoc.name}` : "Upload your business registration certificate (Optional)"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ID Document
              </label>
              <input
                type="file"
                onChange={(e) => handleChange("idDoc", e.target.files?.[0] || null)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                accept=".pdf,.doc,.docx,.jpg,.png"
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.idDoc ? `✅ ${formData.idDoc.name}` : "Upload your ID or passport (Optional)"}
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-700">
                💡 These documents help verify your identity and build trust with funders.
              </p>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                What are your funding goals? <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.fundingGoals}
                onChange={(e) => handleChange("fundingGoals", e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="What do you need funding for? (e.g., Inventory, Equipment, Expansion)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                How much funding are you seeking? <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.fundingAmount}
                onChange={(e) => handleChange("fundingAmount", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="">Select funding amount</option>
                <option value="R10,000 - R50,000">R10,000 - R50,000</option>
                <option value="R50,000 - R100,000">R50,000 - R100,000</option>
                <option value="R100,000 - R500,000">R100,000 - R500,000</option>
                <option value="R500,000 - R1,000,000">R500,000 - R1,000,000</option>
                <option value="R1,000,000+">R1,000,000+</option>
              </select>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">You're all set!</h3>
            <p className="text-gray-600 mb-6">
              Your business profile is ready. Start tracking your sales, expenses, and build your funding readiness.
            </p>
            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200 text-left">
              <h4 className="font-semibold text-emerald-800 mb-2">Next Steps:</h4>
              <ul className="space-y-2 text-sm text-emerald-700">
                <li className="flex items-center gap-2">
                  <span>✓</span> Record your first sale
                </li>
                <li className="flex items-center gap-2">
                  <span>✓</span> Track your expenses
                </li>
                <li className="flex items-center gap-2">
                  <span>✓</span> Build your funding readiness score
                </li>
                <li className="flex items-center gap-2">
                  <span>✓</span> Start applying for funding
                </li>
              </ul>
            </div>
            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
          </div>
        );
    }
  };

  const steps = [
    { number: 1, label: "Account" },
    { number: 2, label: "Business" },
    { number: 3, label: "Trading" },
    { number: 4, label: "Documents" },
    { number: 5, label: "Goals" },
    { number: 6, label: "Complete" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
                <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Set Up Your Business</h1>
            <p className="text-gray-600">Complete your profile to unlock funding opportunities</p>
          </div>

          {/* Stepper */}
          <div className="flex justify-between mb-8">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= step.number ? "bg-emerald-500 text-white" : "bg-gray-200 text-gray-400"
                }`}>
                  {currentStep > step.number ? "✓" : step.number}
                </div>
                <span className={`text-xs mt-1 ${
                  currentStep >= step.number ? "text-emerald-600 font-medium" : "text-gray-400"
                }`}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>

          <form onSubmit={(e) => e.preventDefault()}>
            {renderStep()}

            <div className="flex gap-4 mt-8">
              {currentStep > 1 && currentStep < 6 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex-1 px-6 py-2.5 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
                >
                  Back
                </button>
              )}
              {currentStep < 6 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-lg hover:opacity-90 transition"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-lg hover:opacity-90 transition disabled:opacity-50"
                >
                  {loading ? "Completing..." : "Complete Setup"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}