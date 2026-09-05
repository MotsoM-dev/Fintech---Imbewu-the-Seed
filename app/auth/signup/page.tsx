"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AuthLogo, AuthShell } from "../AuthShell";
import s from "../auth.module.css";

type UserRole = "entrepreneur" | "funder";
type AuthResult = { error?: string | null } | undefined;

const industries = [
  "Agriculture", "Retail", "Food & Beverage", "Technology",
  "Manufacturing", "Construction", "Transport & Logistics",
  "Healthcare", "Education", "Financial Services",
  "Tourism & Hospitality", "Media & Communications",
  "Creative Arts", "Professional Services", "Other",
];

const businessTypes = [
  "Sole Proprietorship", "Partnership", "Private Company (Pty) Ltd",
  "Public Company", "Non-Profit Organization", "Co-operative",
  "Informal Business", "Other",
];

const funderTypes = [
  "Individual",
  "Company",
  "Organization",
  "Community Group",
];

const organizationTypes = [
  "Community Investor", "Neighbourhood Savings Group", "Angel Investor",
  "Impact Investor", "Small Business", "Non-Profit Organization",
  "Co-operative", "Faith-Based Organization", "Corporate", "Family Office", "Other",
];

export default function SignUp() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [industry, setIndustry] = useState("");
  const [yearsInOperation, setYearsInOperation] = useState("");
  const [employeeCount, setEmployeeCount] = useState("");
  const [monthlyRevenue, setMonthlyRevenue] = useState("");
  const [businessLocation, setBusinessLocation] = useState("");

  const [organizationName, setOrganizationName] = useState("");
  const [funderType, setFunderType] = useState("");
  const [organizationType, setOrganizationType] = useState("");
  const [investmentFocus, setInvestmentFocus] = useState("");
  const [investmentRange, setInvestmentRange] = useState("");

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setStep(2);
    setError("");
  };

  const validateAccountStep = () => {
    if (!name || !email || !password || !confirmPassword || !phone) {
      setError("Please fill in all required account details.");
      return false;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }

    if (!agreeToTerms) {
      setError("Please agree to the Terms of Service.");
      return false;
    }

    return true;
  };

  const validateProfileStep = () => {
    if (role === "entrepreneur" && (!businessName || !businessType || !industry || !yearsInOperation || !employeeCount || !monthlyRevenue || !businessLocation)) {
      setError("Please fill in all business details.");
      return false;
    }

    if (role === "funder" && (!funderType || !organizationName || !organizationType || !investmentFocus || !investmentRange)) {
      setError("Please fill in all funder details.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!role) {
      setError("Please choose how you want to use Imbewu.");
      return;
    }

    if (step === 2) {
      if (!validateAccountStep()) return;
      setStep(3);
      setError("");
      return;
    }

    if (!validateProfileStep()) return;

    setLoading(true);
    setError("");

    try {
      const credentials: Record<string, string> = {
        email,
        password,
        name,
        phone,
        role,
        action: "signup",
      };

      if (role === "entrepreneur") {
        Object.assign(credentials, {
          businessName,
          businessType,
          industry,
          yearsInOperation,
          employeeCount,
          monthlyRevenue,
          businessLocation,
        });
      } else {
        Object.assign(credentials, {
          organizationName,
          funderType,
          organizationType,
          investmentFocus,
          investmentRange,
        });
      }

      const result = await signIn("credentials", {
        ...credentials,
        redirect: false,
      }) as AuthResult;

      const authError = result?.error;

      if (authError) {
        setError(authError === "User already exists" ? "An account with this email already exists. Please sign in." : `Registration failed: ${authError}`);
        return;
      }

      const savedUser = {
        id: Date.now().toString(),
        email,
        name,
        phone,
        role,
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
          funderType,
          organizationType,
          investmentFocus,
          investmentRange,
        }),
      };

      const existingUsers = JSON.parse(localStorage.getItem("imbewu_users") || "[]");
      existingUsers.push(savedUser);
      localStorage.setItem("imbewu_users", JSON.stringify(existingUsers));

      setSuccess(true);
      window.setTimeout(() => {
        router.push(`/auth/signin?registered=true&role=${role}`);
      }, 1300);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (step === 3) setStep(2);
    if (step === 2) {
      setStep(1);
      setRole(null);
    }
    setError("");
  };

  return (
    <AuthShell mode="signup">
      <div className={s.formInner}>
        <AuthLogo />
        <span className={s.kicker}>Create your footprint</span>
        <h1 className={s.title}>{step === 1 ? "Choose your growth path." : step === 2 ? "Set up your account." : role === "entrepreneur" ? "Tell us about the business." : "Tell us how you want to fund."}</h1>
        <p className={s.subtitle}>{step === 1 ? "Imbewu supports entrepreneurs building credibility and funders looking for clearer business evidence." : "A few details help us shape the right digital credibility journey."}</p>

        {step > 1 && (
          <div className={s.stepTrack} aria-label={`Step ${step} of 3`}>
            <span className={s.stepActive} />
            <span className={step >= 2 ? s.stepActive : ""} />
            <span className={step === 3 ? s.stepActive : ""} />
          </div>
        )}

        {step === 1 ? (
          <div>
            {error && <div className={`${s.message} ${s.error}`}>{error}</div>}
            <div className={s.roleGrid}>
              <button className={s.roleButton} type="button" onClick={() => handleRoleSelect("entrepreneur")}>
                <span className={s.roleIcon}>01</span>
                <strong>Entrepreneur</strong>
                <span>Digitise records, build a trusted profile, and prepare for growth opportunities.</span>
              </button>
              <button className={s.roleButton} type="button" onClick={() => handleRoleSelect("funder")}>
                <span className={s.roleIcon}>02</span>
                <strong>Funder</strong>
                <span>Discover businesses with clearer records, stronger context, and verified signals.</span>
              </button>
            </div>
            <p className={s.switchText}>Already have an account? <Link href="/auth/signin">Sign in</Link></p>
          </div>
        ) : (
          <form className={s.form} onSubmit={handleSubmit}>
            {error && <div className={`${s.message} ${s.error}`}>{error}</div>}
            {success && <div className={`${s.message} ${s.success}`}>Account created successfully. Redirecting to sign in...</div>}

            {step === 2 && (
              <>
                <div className={s.field}>
                  <label htmlFor="name">Full name</label>
                  <input id="name" type="text" value={name} onChange={event => setName(event.target.value)} placeholder="Enter your full name" disabled={loading || success} />
                </div>
                <div className={s.fieldGrid}>
                  <div className={s.field}>
                    <label htmlFor="email">Email address</label>
                    <input id="email" type="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="you@example.com" disabled={loading || success} />
                  </div>
                  <div className={s.field}>
                    <label htmlFor="phone">Phone number</label>
                    <input id="phone" type="tel" value={phone} onChange={event => setPhone(event.target.value)} placeholder="+27 82 123 4567" disabled={loading || success} />
                  </div>
                </div>
                <div className={s.fieldGrid}>
                  <div className={s.field}>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" value={password} onChange={event => setPassword(event.target.value)} placeholder="Min 6 characters" minLength={6} disabled={loading || success} />
                  </div>
                  <div className={s.field}>
                    <label htmlFor="confirmPassword">Confirm password</label>
                    <input id="confirmPassword" type="password" value={confirmPassword} onChange={event => setConfirmPassword(event.target.value)} placeholder="Confirm your password" disabled={loading || success} />
                  </div>
                </div>
                <div className={s.checkRow}>
                  <input id="terms" type="checkbox" checked={agreeToTerms} onChange={event => setAgreeToTerms(event.target.checked)} disabled={loading || success} />
                  <label className={s.checkLabel} htmlFor="terms">I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.</label>
                </div>
              </>
            )}

            {step === 3 && role === "entrepreneur" && (
              <>
                <div className={s.field}>
                  <label htmlFor="businessName">Business name</label>
                  <input id="businessName" type="text" value={businessName} onChange={event => setBusinessName(event.target.value)} placeholder="Your business name" disabled={loading || success} />
                </div>
                <div className={s.fieldGrid}>
                  <div className={s.field}>
                    <label htmlFor="businessType">Business type</label>
                    <select id="businessType" value={businessType} onChange={event => setBusinessType(event.target.value)} disabled={loading || success}>
                      <option value="">Select business type</option>
                      {businessTypes.map(type => <option key={type} value={type}>{type}</option>)}
                    </select>
                  </div>
                  <div className={s.field}>
                    <label htmlFor="industry">Industry</label>
                    <select id="industry" value={industry} onChange={event => setIndustry(event.target.value)} disabled={loading || success}>
                      <option value="">Select your industry</option>
                      {industries.map(item => <option key={item} value={item}>{item}</option>)}
                    </select>
                  </div>
                </div>
                <div className={s.fieldGrid}>
                  <div className={s.field}>
                    <label htmlFor="yearsInOperation">Years in operation</label>
                    <select id="yearsInOperation" value={yearsInOperation} onChange={event => setYearsInOperation(event.target.value)} disabled={loading || success}>
                      <option value="">Select</option>
                      <option value="<1">Less than 1 year</option>
                      <option value="1-2">1-2 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="6-10">6-10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                  </div>
                  <div className={s.field}>
                    <label htmlFor="employeeCount">Employees</label>
                    <select id="employeeCount" value={employeeCount} onChange={event => setEmployeeCount(event.target.value)} disabled={loading || success}>
                      <option value="">Select</option>
                      <option value="1">1</option>
                      <option value="2-5">2-5</option>
                      <option value="6-10">6-10</option>
                      <option value="11-50">11-50</option>
                      <option value="50+">50+</option>
                    </select>
                  </div>
                </div>
                <div className={s.fieldGrid}>
                  <div className={s.field}>
                    <label htmlFor="monthlyRevenue">Monthly revenue</label>
                    <select id="monthlyRevenue" value={monthlyRevenue} onChange={event => setMonthlyRevenue(event.target.value)} disabled={loading || success}>
                      <option value="">Select range</option>
                      <option value="<R5,000">Less than R5,000</option>
                      <option value="R5,000-R10,000">R5,000 - R10,000</option>
                      <option value="R10,000-R25,000">R10,000 - R25,000</option>
                      <option value="R25,000-R50,000">R25,000 - R50,000</option>
                      <option value="R50,000-R100,000">R50,000 - R100,000</option>
                      <option value="R100,000+">R100,000+</option>
                    </select>
                  </div>
                  <div className={s.field}>
                    <label htmlFor="businessLocation">Location</label>
                    <input id="businessLocation" type="text" value={businessLocation} onChange={event => setBusinessLocation(event.target.value)} placeholder="City, Province" disabled={loading || success} />
                  </div>
                </div>
              </>
            )}

            {step === 3 && role === "funder" && (
              <>
                <div className={s.field}>
                  <label htmlFor="funderType">What kind of funder are you?</label>
                  <select id="funderType" value={funderType} onChange={event => setFunderType(event.target.value)} disabled={loading || success}>
                    <option value="">Select funder type</option>
                    {funderTypes.map(type => <option key={type} value={type}>{type}</option>)}
                  </select>
                </div>
                <div className={s.field}>
                  <label htmlFor="organizationName">{funderType === "Individual" || !funderType ? "Account name" : "Company / organization name"}</label>
                  <input id="organizationName" type="text" value={organizationName} onChange={event => setOrganizationName(event.target.value)} placeholder={funderType === "Individual" || !funderType ? "e.g. Sipho Dlamini" : "e.g. Masakhane Community Fund"} disabled={loading || success} />
                </div>
                <div className={s.field}>
                  <label htmlFor="organizationType">Funding style</label>
                  <select id="organizationType" value={organizationType} onChange={event => setOrganizationType(event.target.value)} disabled={loading || success}>
                    <option value="">Select funding style</option>
                    {organizationTypes.map(type => <option key={type} value={type}>{type}</option>)}
                  </select>
                </div>
                <div className={s.fieldGrid}>
                  <div className={s.field}>
                    <label htmlFor="investmentFocus">Investment focus</label>
                    <select id="investmentFocus" value={investmentFocus} onChange={event => setInvestmentFocus(event.target.value)} disabled={loading || success}>
                      <option value="">Select focus</option>
                      <option value="Local township businesses">Local township businesses</option>
                      <option value="Women-owned businesses">Women-owned businesses</option>
                      <option value="Youth-owned businesses">Youth-owned businesses</option>
                      <option value="Food and agriculture">Food and agriculture</option>
                      <option value="Community services">Community services</option>
                      <option value="Social impact">Social impact</option>
                    </select>
                  </div>
                  <div className={s.field}>
                    <label htmlFor="investmentRange">Investment range</label>
                    <select id="investmentRange" value={investmentRange} onChange={event => setInvestmentRange(event.target.value)} disabled={loading || success}>
                      <option value="">Select range</option>
                      <option value="R1,000-R5,000">R1,000 - R5,000</option>
                      <option value="R5,000-R25,000">R5,000 - R25,000</option>
                      <option value="R10,000-R50,000">R10,000 - R50,000</option>
                      <option value="R50,000-R100,000">R50,000 - R100,000</option>
                      <option value="R100,000-R500,000">R100,000 - R500,000</option>
                      <option value="R500,000-R1M">R500,000 - R1,000,000</option>
                      <option value="R1M+">R1,000,000+</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            <div className={s.buttonRow}>
              <button className={s.secondaryButton} type="button" onClick={handleBack} disabled={loading || success}>Back</button>
              <button className={s.submitButton} type="submit" disabled={loading || success}>
                {loading ? "Creating..." : success ? "Done" : step === 2 ? "Continue" : "Create account"}
              </button>
            </div>
          </form>
        )}
      </div>
    </AuthShell>
  );
}
