"use client";

import { createContext, useContext, useMemo, useState } from "react";

export type Transaction = { id: string; date: string; description: string; amount: string; type: "sale" | "expense" };
export type DocumentRecord = { id: string; name: string; category: string; uploadedAt: string; verified: boolean };
export type Product = { id: string; name: string; description: string; price: string; category: string };
export type FundingApplication = { id: string; amount: string; purpose: string; submitted: string; status: "New" | "Reviewing" | "Under Review" | "Offer" | "Funded"; progress: number };

type AccountProfile = { ownerName: string; shortName: string; email: string };
type BusinessProfile = { name: string; category: string; industry: string; location: string; description: string; founded: string; employeeCount: string; yearsInOperation: string; registered: boolean | null };
type BusinessMetrics = { monthlyRevenue: string; monthlyExpenses: string; netProfit: string; readiness: number; profileStrength: number; documentScore: number; salesConsistency: number; storefrontScore: number; repeatCustomers: number; averageOrder: string; cashflowHealth: number; growthRate: string };
type Task = { title: string; completed: boolean; progress: number; metric: string };
type SalesMixItem = { label: string; value: number };

type BusinessState = {
  account: AccountProfile;
  business: BusinessProfile;
  metrics: BusinessMetrics;
  transactions: Transaction[];
  tasks: Task[];
  salesMix: SalesMixItem[];
  products: Product[];
  documents: DocumentRecord[];
  fundingApplications: FundingApplication[];
};

const initialBusinessState: BusinessState = {
  account: { ownerName: "Zanele Mbeki", shortName: "Zanele", email: "zanele@khayapantry.co.za" },
  business: {
    name: "Khaya Pantry & Fresh Produce",
    category: "Retail and sales",
    industry: "Food, grocery and fresh produce retail",
    location: "Mdantsane, Eastern Cape",
    description: "Khaya Pantry is a neighbourhood food and fresh produce business serving commuters, families and small catering buyers. The business combines daily grocery staples with locally sourced vegetables and weekend meal packs.",
    founded: "2023",
    employeeCount: "4",
    yearsInOperation: "3 years",
    registered: null,
  },
  metrics: {
    monthlyRevenue: "R24,500",
    monthlyExpenses: "R8,200",
    netProfit: "R16,300",
    readiness: 82,
    profileStrength: 88,
    documentScore: 74,
    salesConsistency: 69,
    storefrontScore: 91,
    repeatCustomers: 46,
    averageOrder: "R86",
    cashflowHealth: 78,
    growthRate: "+18%",
  },
  transactions: [
    { id: "tx-1", date: "05 Sep", description: "Morning grocery sales", amount: "+R1,860", type: "sale" },
    { id: "tx-2", date: "04 Sep", description: "Vegetable stock refill", amount: "-R720", type: "expense" },
    { id: "tx-3", date: "03 Sep", description: "Weekend meal pack orders", amount: "+R2,450", type: "sale" },
    { id: "tx-4", date: "02 Sep", description: "Packaging and labels", amount: "-R310", type: "expense" },
  ],
  tasks: [
    { title: "Business profile", completed: true, progress: 100, metric: "Core identity complete" },
    { title: "Registration and ID documents", completed: true, progress: 100, metric: "Verified proof uploaded" },
    { title: "Record 30 days of sales", completed: false, progress: 73, metric: "22 of 30 days captured" },
    { title: "Upload latest bank statement", completed: false, progress: 40, metric: "August uploaded, September due" },
  ],
  salesMix: [
    { label: "Grocery staples", value: 42 },
    { label: "Fresh produce", value: 31 },
    { label: "Meal packs", value: 18 },
    { label: "Delivery orders", value: 9 },
  ],
  products: [
    { id: "p-1", name: "Family grocery basket", price: "R185", description: "Staples bundle for weekly household needs", category: "Grocery staples" },
    { id: "p-2", name: "Fresh produce crate", price: "R120", description: "Locally sourced vegetables for families and caterers", category: "Fresh produce" },
    { id: "p-3", name: "Weekend meal packs", price: "R65", description: "Prepared packs for commuters and shift workers", category: "Meal packs" },
  ],
  documents: [
    { id: "d-1", name: "Bank Statement - August.pdf", category: "Bank Statements", uploadedAt: "03 September 2026", verified: true },
    { id: "d-2", name: "Business Registration.pdf", category: "Registration", uploadedAt: "02 September 2026", verified: true },
    { id: "d-3", name: "Tax Return - 2025.pdf", category: "Tax", uploadedAt: "01 September 2026", verified: false },
  ],
  fundingApplications: [
    { id: "IMB-2048", amount: "R50,000", purpose: "Cold storage and delivery equipment", submitted: "2 Sep 2026", status: "Under Review", progress: 3 },
    { id: "IMB-2035", amount: "R25,000", purpose: "High-demand grocery inventory", submitted: "28 Aug 2026", status: "Reviewing", progress: 2 },
  ],
};

type BusinessStateContextValue = BusinessState & {
  setRegistrationStatus: (registered: boolean) => void;
  updateAccountProfile: (entry: Partial<AccountProfile>) => void;
  updateBusinessProfile: (entry: Partial<Omit<BusinessProfile, "registered">>) => void;
  addTransaction: (entry: Omit<Transaction, "id" | "date">) => void;
  addDocument: (entry: Pick<DocumentRecord, "name" | "category">) => void;
  addProduct: (entry: Omit<Product, "id">) => void;
  addFundingApplication: (entry: Pick<FundingApplication, "amount" | "purpose">) => void;
};

const BusinessStateContext = createContext<BusinessStateContextValue | null>(null);

function todayShort() { return new Date().toLocaleDateString("en-ZA", { day: "2-digit", month: "short" }); }
function todayLong() { return new Date().toLocaleDateString("en-ZA", { day: "2-digit", month: "long", year: "numeric" }); }

export function BusinessStateProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<BusinessState>(initialBusinessState);

  const value = useMemo<BusinessStateContextValue>(() => ({
    ...state,
    setRegistrationStatus: (registered) => setState((current) => ({ ...current, business: { ...current.business, registered } })),
    updateAccountProfile: (entry) => setState((current) => ({ ...current, account: { ...current.account, ...entry } })),
    updateBusinessProfile: (entry) => setState((current) => ({ ...current, business: { ...current.business, ...entry } })),
    addTransaction: (entry) => setState((current) => ({ ...current, transactions: [{ ...entry, id: `tx-${Date.now()}`, date: todayShort() }, ...current.transactions] })),
    addDocument: (entry) => setState((current) => ({ ...current, documents: [{ id: `d-${Date.now()}`, name: entry.name, category: entry.category, uploadedAt: todayLong(), verified: false }, ...current.documents] })),
    addProduct: (entry) => setState((current) => ({ ...current, products: [{ ...entry, id: `p-${Date.now()}` }, ...current.products] })),
    addFundingApplication: (entry) => setState((current) => ({ ...current, fundingApplications: [{ id: `IMB-${Math.floor(1000 + Math.random() * 9000)}`, amount: entry.amount, purpose: entry.purpose, submitted: todayShort(), status: "New", progress: 1 }, ...current.fundingApplications] })),
  }), [state]);

  return <BusinessStateContext.Provider value={value}>{children}</BusinessStateContext.Provider>;
}

export function useBusinessState() {
  const context = useContext(BusinessStateContext);
  if (!context) throw new Error("useBusinessState must be used inside BusinessStateProvider");
  return context;
}
