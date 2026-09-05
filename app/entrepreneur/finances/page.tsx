"use client";

import { useMemo, useState } from "react";
import { GlassCard, PageHero, StatCard } from "../EntrepreneurUI";
import { useBusinessState } from "../BusinessState";

export default function FinancesPage() {
  const accountState = useBusinessState();
  const [form, setForm] = useState({ type: "sale", title: "", amount: "" });
  const [bankConnected, setBankConnected] = useState(false);
  const [filter, setFilter] = useState<"all" | "sale" | "expense">("all");
  const [search, setSearch] = useState("");
  const { metrics, transactions, addTransaction, business } = accountState;
  const filteredTransactions = useMemo(() => transactions.filter((entry) => (filter === "all" || entry.type === filter) && entry.description.toLowerCase().includes(search.toLowerCase())), [transactions, filter, search]);

  const addEntry = () => {
    if (!form.title || !form.amount) return alert("Add a title and amount first");
    addTransaction({ type: form.type as "sale" | "expense", description: form.title, amount: `${form.type === "sale" ? "+" : "-"}${form.amount.replace(/^[-+]/, "")}` });
    setForm({ type: "sale", title: "", amount: "" });
  };

  return (
    <>
      <PageHero eyebrow="Money signal" title={`Make every rand count for ${business.name}.`} description="Record retail sales, supplier costs and bank activity so the business can prove traction, margins and funding readiness." />
      <div className="entrepreneur-grid entrepreneur-grid-4"><StatCard label="Sales" value={metrics.monthlyRevenue} note="Captured revenue" /><StatCard label="Expenses" value={metrics.monthlyExpenses} note="Known operating costs" tone="red" /><StatCard label="Profit" value={metrics.netProfit} note="Trading surplus" tone="green" /><StatCard label="Runway" value="68 days" note="Estimated cash comfort" tone="gold" /></div>

      <div className="bank-connect-card">
        <div><span className="entrepreneur-pill">Bank connection</span><h2>{bankConnected ? "Bank feed connected" : "Connect your bank"}</h2><p>{bankConnected ? "Transactions can now be matched against sales, receipts and funding evidence." : "Link a business bank account to auto-match deposits, supplier payments and cashflow patterns. Prototype only — no real banking connection is made."}</p></div>
        <div className="bank-signal"><strong>{bankConnected ? "Synced" : "Secure link"}</strong><small>{bankConnected ? "Last sync: today" : "Read-only mock flow"}</small></div>
        <button className={bankConnected ? "entrepreneur-button-secondary" : "entrepreneur-button"} onClick={() => setBankConnected((value) => !value)}>{bankConnected ? "Disconnect" : "Connect bank"}</button>
      </div>

      <div className="entrepreneur-grid entrepreneur-grid-2" style={{ marginTop: "1rem" }}>
        <GlassCard><h2>Quick capture</h2><p>Drop in a sale or expense while the detail is still fresh.</p><div className="entrepreneur-grid" style={{ marginTop: "1rem" }}><select className="entrepreneur-select" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}><option value="sale">Sale</option><option value="expense">Expense</option></select><input className="entrepreneur-input" placeholder="What happened?" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /><input className="entrepreneur-input" placeholder="Amount e.g. R500" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} /><button className="entrepreneur-button" onClick={addEntry}>Add record</button></div></GlassCard>
        <GlassCard><h2>Finance filter</h2><p>Find the records that explain today’s cash movement.</p><div className="finance-filter-bar"><button className="finance-filter" data-active={filter === "all"} onClick={() => setFilter("all")}>All</button><button className="finance-filter" data-active={filter === "sale"} onClick={() => setFilter("sale")}>Sales</button><button className="finance-filter" data-active={filter === "expense"} onClick={() => setFilter("expense")}>Expenses</button></div><input className="entrepreneur-input" placeholder="Search records..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ marginTop: ".85rem" }} /></GlassCard>
      </div>

      <GlassCard className="finance-ledger"><h2>Filtered records</h2><div className="entrepreneur-list" style={{ marginTop: "1rem" }}>{filteredTransactions.map((entry) => <div className="entrepreneur-row finance-record" key={entry.id}><div><strong>{entry.description}</strong><p>{entry.date} • {entry.type === "sale" ? "Retail income" : "Operating cost"}</p></div><span className={`entrepreneur-pill ${entry.type === "sale" ? "positive" : "negative"}`}>{entry.amount}</span></div>)}</div></GlassCard>
    </>
  );
}
