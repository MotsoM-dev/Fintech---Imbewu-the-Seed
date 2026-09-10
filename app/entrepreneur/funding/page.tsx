"use client";

import { useState } from "react";
import { EmptyState, GlassCard, PageHero, StatCard } from "../EntrepreneurUI";
import { useBusinessState } from "../BusinessState";

export default function FundingPage() {
  const accountState = useBusinessState();
  const [activeTab, setActiveTab] = useState("opportunities");
  const [formData, setFormData] = useState({ amount: "", purpose: "", motivation: "" });
  const tabs = ["opportunities", "requests", "history"];
  const statuses = ["Submitted", "Verified", "Under Review", "Offer", "Funded"];
  const requestedFunds = accountState.fundingApplications.reduce((total, application) => total + Number(application.amount.replace(/[^0-9]/g, "")), 0);
  const formatFunds = (amount: number) => `R${amount.toLocaleString("en-ZA")}`;

  const submit = () => {
    if (!formData.amount || !formData.purpose || !formData.motivation) return alert("Please fill in the funding request");
    accountState.addFundingApplication({ amount: formData.amount, purpose: formData.purpose });
    setFormData({ amount: "", purpose: "", motivation: "" });
    setActiveTab("requests");
  };

  return (
    <>
      <PageHero eyebrow="Funding bridge" title={`Turn ${accountState.business.name}'s proof into opportunity.`} description="Imbewu packages sales consistency, documents and storefront credibility into a readiness story that funders can understand faster." />
      <section className="entrepreneur-funds-card">
        <div className="entrepreneur-funds-card-topline"><span>Imbewu capital desk</span><span className="entrepreneur-funds-live"><i /> Live pipeline</span></div>
        <div className="entrepreneur-funds-card-main">
          <div><p className="entrepreneur-funds-label">Capital in motion</p><strong>{formatFunds(requestedFunds)}</strong><p className="entrepreneur-funds-caption">Across {accountState.fundingApplications.length} active funding requests</p></div>
          <div className="entrepreneur-funds-chart" aria-label="Funding pipeline activity"><span style={{ height: "32%" }} /><span style={{ height: "48%" }} /><span style={{ height: "42%" }} /><span style={{ height: "68%" }} /><span style={{ height: "56%" }} /><span style={{ height: "82%" }} /><span style={{ height: "74%" }} /></div>
        </div>
        <div className="entrepreneur-funds-divider" />
        <div className="entrepreneur-funds-summary">
          <div><span>Matched pool</span><strong>R250k</strong><small>Available fit</small></div>
          <div><span>Readiness</span><strong>{accountState.metrics.readiness}%</strong><small>Broker signal</small></div>
          <div><span>Monthly turnover</span><strong>{accountState.metrics.monthlyRevenue}</strong><small>Latest reported</small></div>
          <div className="entrepreneur-funds-desk"><span>Desk note</span><strong>Profile is investable</strong><small>Evidence is moving with the request</small></div>
        </div>
      </section>
      <div className="entrepreneur-grid entrepreneur-grid-3"><StatCard label="Readiness" value={`${accountState.metrics.readiness}%`} note="Strong candidate signal" /><StatCard label="Matched pool" value="R250k" note="Retail stock and equipment fit" tone="green" /><StatCard label="Requests" value={String(accountState.fundingApplications.length)} note="Requests in motion" tone="purple" /></div>
      <div className="entrepreneur-tabs">{tabs.map((tab) => <button className="entrepreneur-tab" data-active={activeTab === tab} key={tab} onClick={() => setActiveTab(tab)}>{tab[0].toUpperCase() + tab.slice(1)}</button>)}</div>
      {activeTab === "opportunities" && <div className="entrepreneur-grid entrepreneur-grid-2"><GlassCard><h2>Stock working capital</h2><p>For grocery inventory, fresh produce turnover and packaging before peak trading days.</p><button className="entrepreneur-button" onClick={() => setActiveTab("requests")}>Start request</button></GlassCard><GlassCard><h2>Cold storage upgrade</h2><p>For reducing spoilage and supporting larger fresh produce orders from families and caterers.</p><button className="entrepreneur-button-secondary" onClick={() => setActiveTab("requests")}>Prepare profile</button></GlassCard></div>}
      {activeTab === "requests" && <div className="entrepreneur-grid entrepreneur-grid-2"><GlassCard><h2>{accountState.account.shortName}'s requests</h2><div className="entrepreneur-list" style={{ marginTop: "1rem" }}>{accountState.fundingApplications.map((app) => <div className="entrepreneur-row" key={app.id}><div><strong>{app.id} • {app.amount}</strong><p>{app.purpose} • {app.submitted}</p><div className="entrepreneur-progress"><span style={{ width: `${(app.progress / statuses.length) * 100}%` }} /></div></div><span className="entrepreneur-pill">{app.status}</span></div>)}</div></GlassCard><GlassCard><h2>New request</h2><div className="entrepreneur-grid" style={{ marginTop: "1rem" }}><input className="entrepreneur-input" placeholder="Amount e.g. R50,000" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} /><input className="entrepreneur-input" placeholder="Purpose e.g. Cold storage" value={formData.purpose} onChange={(e) => setFormData({ ...formData, purpose: e.target.value })} /><textarea className="entrepreneur-textarea" placeholder="How will this help sales, stock or customers?" rows={4} value={formData.motivation} onChange={(e) => setFormData({ ...formData, motivation: e.target.value })} /><button className="entrepreneur-button" onClick={submit}>Submit request</button></div></GlassCard></div>}
      {activeTab === "history" && <GlassCard><EmptyState icon="◎" title="Funding history will live here" text={`Funded offers and closed requests for ${accountState.business.name} will form part of the growth archive.`} /></GlassCard>}
    </>
  );
}
