"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";

export type FunderType = "Individual" | "Company" | "Organization" | "Community Group";

export type FunderProfile = {
  name: string;
  email: string;
  funderType: FunderType;
  accountName: string;
  role: string;
  mandate: string;
  ticketSize: string;
  province: string;
};

type FunderStateContextValue = {
  profile: FunderProfile;
  updateProfile: (entry: Partial<FunderProfile>) => void;
};

const fallbackProfile: FunderProfile = {
  name: "Sipho Dlamini",
  email: "sipho.dlamini@example.com",
  funderType: "Individual",
  accountName: "Sipho Dlamini",
  role: "Community investor",
  mandate: "I want to back reliable small businesses in my neighbourhood with patient, practical funding.",
  ticketSize: "R5,000 - R25,000",
  province: "Eastern Cape",
};

const FunderStateContext = createContext<FunderStateContextValue | null>(null);

function normalizeFunderType(value: unknown): FunderType {
  if (value === "Company" || value === "Organization" || value === "Community Group") return value;
  return "Individual";
}

export function FunderStateProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const user = session?.user as any;
  const [profile, setProfile] = useState<FunderProfile>(fallbackProfile);

  useEffect(() => {
    const stored = window.localStorage.getItem("imbewu_funder_profile");
    if (stored) {
      const parsed = JSON.parse(stored) as Partial<FunderProfile>;
      setProfile({ ...fallbackProfile, ...parsed, funderType: normalizeFunderType(parsed.funderType) });
      return;
    }

    setProfile({
      ...fallbackProfile,
      name: user?.name || fallbackProfile.name,
      email: user?.email || fallbackProfile.email,
      funderType: normalizeFunderType(user?.funderType),
      accountName: user?.organizationName || user?.name || fallbackProfile.accountName,
    });
  }, [user?.email, user?.funderType, user?.name, user?.organizationName]);

  const value = useMemo<FunderStateContextValue>(() => ({
    profile,
    updateProfile: (entry) => {
      setProfile((current) => {
        const next = { ...current, ...entry, funderType: normalizeFunderType(entry.funderType || current.funderType) };
        window.localStorage.setItem("imbewu_funder_profile", JSON.stringify(next));
        return next;
      });
    },
  }), [profile]);

  return <FunderStateContext.Provider value={value}>{children}</FunderStateContext.Provider>;
}

export function useFunderState() {
  const context = useContext(FunderStateContext);
  if (!context) throw new Error("useFunderState must be used inside FunderStateProvider");
  return context;
}
