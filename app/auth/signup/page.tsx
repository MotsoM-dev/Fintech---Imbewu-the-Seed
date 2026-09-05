// app/auth/signup/page.tsx
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type UserRole = "entrepreneur" | "funder";

export default function SignUp() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  // Entrepreneur fields
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [industry, setIndustry] = useState("");
  const [yearsInOperation, setYearsInOperation] = useState("");
  const [employeeCount, setEmployeeCount] = useState("");
  const [monthlyRevenue, setMonthlyRevenue] = useState("");
  const [businessLocation, setBusinessLocation] = useState("");

  // Funder fields
  const [organizationName, setOrganizationName] = useState("");
  const [organizationType, setOrganizationType] = useState("");
  const [investmentFocus, setInvestmentFocus] = useState("");
  const [investmentRange, setInvestmentRange] = useState("");

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setStep(2);
  };

  const validateStep2 = () => {
    if (!name || !email || !password || !confirmPassword || !phone) {
      setError("Please fill in all required fields");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    if (!agreeToTerms) {
      setError("Please agree to the Terms of Service");
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    if (role === "entrepreneur") {
      if (!businessName || !businessType || !industry || !yearsInOperation || !employeeCount || !monthlyRevenue || !businessLocation) {
        setError("Please fill in all business details");
        return false;
      }
    } else {
      if (!organizationName || !organizationType || !investmentFocus || !investmentRange) {
        setError("Please fill in all organization details");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 2) {
      if (!validateStep2()) return;
      setStep(3);
      setError("");
      return;
    }

    if (step === 3) {
      if (!validateStep3()) return;
    }

    setLoading(true);
    setError("");

    try {
      const credentials: any = {
        email,
        password,
        name,
        phone,
        role,
        action: "signup",
      };

      if (role === "entrepreneur") {
        credentials.businessName = businessName;
        credentials.businessType = businessType;
        credentials.industry = industry;
        credentials.yearsInOperation = yearsInOperation;
        credentials.employeeCount = employeeCount;
        credentials.monthlyRevenue = monthlyRevenue;
        credentials.businessLocation = businessLocation;
      } else {
        credentials.organizationName = organizationName;
        credentials.organizationType = organizationType;
        credentials.investmentFocus = investmentFocus;
        credentials.investmentRange = investmentRange;
      }

      const result = await signIn("credentials", {
        ...credentials,
        redirect: false,
      });

      if (result?.error) {
        if (result.error === "User already exists") {
          setError("An account with this email already exists. Please sign in.");
        } else {
          setError(`Registration failed: ${result.error}`);
        }
      } else {
        // Store in localStorage for persistence
        const newUser = {
          id: Date.now().toString(),
          email,
          name,
          phone,
          role,
          password,
          ...(role === "entrepreneur" ? {
            businessName,
            businessType,
            industry,
            yearsInOperation,
            employeeCount,
            monthlyRevenue,
            businessLocation,
          } : {
            organizationName,
            organizationType,
            investmentFocus,
            investmentRange,
          })
        };

        const existingUsers = JSON.parse(localStorage.getItem('imbewu_users') || '[]');
        existingUsers.push(newUser);
        localStorage.setItem('imbewu_users', JSON.stringify(existingUsers));

        setSuccess(true);
        setLoading(false);
        setTimeout(() => {
          router.push(`/auth/signin?registered=true&role=${role}`);
        }, 1500);
      }
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      if (!success) setLoading(false);
    }
  };

  const handleBack = () => {
    if (step === 3) setStep(2);
    else if (step === 2) { setStep(1); setRole(null); }
    setError("");
  };

  const industries = [
    "Agriculture", "Retail", "Food & Beverage", "Technology",
    "Manufacturing", "Construction", "Transport & Logistics",
    "Healthcare", "Education", "Financial Services",
    "Tourism & Hospitality", "Media & Communications",
    "Creative Arts", "Professional Services", "Other"
  ];

  const businessTypes = [
    "Sole Proprietorship", "Partnership", "Private Company (Pty) Ltd",
    "Public Company", "Non-Profit Organization", "Co-operative",
    "Informal Business", "Other"
  ];

  const organizationTypes = [
    "Venture Capital", "Private Equity", "Angel Investor",
    "Impact Investor", "Bank", "Microfinance Institution",
    "Government Agency", "Development Finance Institution",
    "Corporate", "Family Office", "Other"
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
                <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <h2 className="mt-4 text-3xl font-bold text-gray-900">Create your Imbewu account</h2>
            <p className="mt-2 text-gray-600">
              {step === 1 && "How will you use Imbewu?"}
              {step === 2 && "Create your account"}
              {step === 3 && role === "entrepreneur" ? "Tell us about your business" : "Tell us about your organization"}
            </p>
          </div>

          {step > 1 && (
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center gap-3">
                <div className={`h-2 w-12 rounded-full ${step >= 2 ? "bg-emerald-500" : "bg-gray-200"}`} />
                <div className={`h-2 w-12 rounded-full ${step === 3 ? "bg-emerald-500" : "bg-gray-200"}`} />
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-700">✅ Account created successfully! Redirecting to login...</p>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => handleRoleSelect("entrepreneur")}
                    className="p-6 border-2 border-gray-200 rounded-xl hover:border-emerald-500 transition text-left group"
                  >
                    <div className="text-4xl mb-3">🚀</div>
                    <h3 className="text-xl font-semibold text-gray-900">Entrepreneur</h3>
                    <p className="text-gray-500 text-sm mt-1">Grow my business and find funding</p>
                    <div className="mt-4 text-emerald-600 font-medium group-hover:underline">Continue →</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRoleSelect("funder")}
                    className="p-6 border-2 border-gray-200 rounded-xl hover:border-emerald-500 transition text-left group"
                  >
                    <div className="text-4xl mb-3">💰</div>
                    <h3 className="text-xl font-semibold text-gray-900">Funder</h3>
                    <p className="text-gray-500 text-sm mt-1">Discover and fund businesses</p>
                    <div className="mt-4 text-emerald-600 font-medium group-hover:underline">Continue →</div>
                  </button>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link href="/auth/signin" className="font-medium text-emerald-600 hover:text-emerald-500">Sign in</Link>
                  </p>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent" placeholder="Enter your full name" disabled={loading || success} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address <span className="text-red-500">*</span></label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent" placeholder="you@example.com" disabled={loading || success} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number <span className="text-red-500">*</span></label>
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent" placeholder="+27 82 123 4567" disabled={loading || success} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password <span className="text-red-500">*</span></label>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent" placeholder="Min 6 characters" minLength={6} disabled={loading || success} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password <span className="text-red-500">*</span></label>
                  <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent" placeholder="Confirm your password" disabled={loading || success} />
                </div>
                <div className="flex items-start gap-2">
                  <input id="terms" type="checkbox" checked={agreeToTerms} onChange={(e) => setAgreeToTerms(e.target.checked)} className="mt-1 h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded" disabled={loading || success} />
                  <label htmlFor="terms" className="text-sm text-gray-600">I agree to the <a href="#" className="text-emerald-600 hover:text-emerald-700 font-medium">Terms of Service</a> and <a href="#" className="text-emerald-600 hover:text-emerald-700 font-medium">Privacy Policy</a></label>
                </div>
              </div>
            )}

            {step === 3 && role === "entrepreneur" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business Name <span className="text-red-500">*</span></label>
                  <input type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent" placeholder="Your business name" disabled={loading || success} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business Type <span className="text-red-500">*</span></label>
                  <select value={businessType} onChange={(e) => setBusinessType(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent" disabled={loading || success}>
                    <option value="">Select business type</option>
                    {businessTypes.map((type) => (<option key={type} value={type}>{type}</option>))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Industry <span className="text-red-500">*</span></label>
                  <select value={industry} onChange={(e) => setIndustry(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent" disabled={loading || success}>
                    <option value="">Select your industry</option>
                    {industries.map((ind) => (<option key={ind} value={ind}>{ind}</option>))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Years in Operation <span className="text-red-500">*</span></label>
                    <select value={yearsInOperation} onChange={(e) => setYearsInOperation(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent" disabled={loading || success}>
                      <option value="">Select</option>
                      <option value="<1">Less than 1 year</option>
                      <option value="1-2">1-2 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="6-10">6-10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Employees <span className="text-red-500">*</span></label>
                    <select value={employeeCount} onChange={(e) => setEmployeeCount(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent" disabled={loading || success}>
                      <option value="">Select</option>
                      <option value="1">1 (Sole proprietor)</option>
                      <option value="2-5">2-5</option>
                      <option value="6-10">6-10</option>
                      <option value="11-50">11-50</option>
                      <option value="50+">50+</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Revenue <span className="text-red-500">*</span></label>
                    <select value={monthlyRevenue} onChange={(e) => setMonthlyRevenue(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent" disabled={loading || success}>
                      <option value="">Select range</option>
                      <option value="<R5,000">Less than R5,000</option>
                      <option value="R5,000-R10,000">R5,000 - R10,000</option>
                      <option value="R10,000-R25,000">R10,000 - R25,000</option>
                      <option value="R25,000-R50,000">R25,000 - R50,000</option>
                      <option value="R50,000-R100,000">R50,000 - R100,000</option>
                      <option value="R100,000+">R100,000+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location <span className="text-red-500">*</span></label>
                    <input type="text" value={businessLocation} onChange={(e) => setBusinessLocation(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent" placeholder="City, Province" disabled={loading || success} />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && role === "funder" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Organization Name <span className="text-red-500">*</span></label>
                  <input type="text" value={organizationName} onChange={(e) => setOrganizationName(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent" placeholder="Your organization name" disabled={loading || success} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Organization Type <span className="text-red-500">*</span></label>
                  <select value={organizationType} onChange={(e) => setOrganizationType(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent" disabled={loading || success}>
                    <option value="">Select organization type</option>
                    {organizationTypes.map((type) => (<option key={type} value={type}>{type}</option>))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Investment Focus <span className="text-red-500">*</span></label>
                    <select value={investmentFocus} onChange={(e) => setInvestmentFocus(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent" disabled={loading || success}>
                      <option value="">Select focus</option>
                      <option value="Early Stage">Early Stage</option>
                      <option value="Growth Stage">Growth Stage</option>
                      <option value="Late Stage">Late Stage</option>
                      <option value="All Stages">All Stages</option>
                      <option value="Technology">Technology</option>
                      <option value="Social Impact">Social Impact</option>
                      <option value="Sustainable">Sustainable</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Investment Range <span className="text-red-500">*</span></label>
                    <select value={investmentRange} onChange={(e) => setInvestmentRange(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent" disabled={loading || success}>
                      <option value="">Select range</option>
                      <option value="R10,000-R50,000">R10,000 - R50,000</option>
                      <option value="R50,000-R100,000">R50,000 - R100,000</option>
                      <option value="R100,000-R500,000">R100,000 - R500,000</option>
                      <option value="R500,000-R1M">R500,000 - R1,000,000</option>
                      <option value="R1M+">R1,000,000+</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-4 mt-8">
              {step > 1 && (
                <button type="button" onClick={handleBack} className="flex-1 px-6 py-2.5 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition" disabled={loading || success}>
                  Back
                </button>
              )}
              <button type="submit" disabled={loading || success} className={`flex-1 px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-lg hover:opacity-90 transition ${loading || success ? "opacity-50 cursor-not-allowed" : ""}`}>
                {loading ? "Creating..." : success ? "Done! ✓" : step === 1 ? "Get Started" : "Create Account"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

