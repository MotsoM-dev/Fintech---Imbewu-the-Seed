"use client";

import { useMemo, useState } from "react";
import { GlassCard, PageHero, StatCard } from "../FunderUI";

const fundedBusinesses = [
  { id: "1", name: "Khula Foods", owner: "Ayanda Mbeki", sector: "Agriculture", account: "Linked FNB Business **** 4821", funded: 50000, outstanding: 35000, performance: 86, revenueGrowth: "+18%", repayment: "On track", nextMilestone: "Cold storage installed", coverImage: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80" },
  { id: "2", name: "Sisonke Repair Co-op", owner: "Mandla Jali", sector: "Services", account: "Linked TymeBank Business **** 1934", funded: 18000, outstanding: 12600, performance: 74, revenueGrowth: "+11%", repayment: "Watch", nextMilestone: "Tools bought and logged", coverImage: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80" },
  { id: "4", name: "Green Energy Solutions", owner: "Thabo Molefe", sector: "Technology", account: "Linked Nedbank Business **** 7092", funded: 200000, outstanding: 148000, performance: 91, revenueGrowth: "+22%", repayment: "On track", nextMilestone: "Technician training complete", coverImage: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=900&q=80" },
];

function feeRateFor(amount: number) {
  if (amount < 20000) return 0.04;
  if (amount < 100000) return 0.03;
  return 0.02;
}

export default function PortfolioPage() {
  const [selectedBusinessId, setSelectedBusinessId] = useState(fundedBusinesses[0].id);
  const [amount, setAmount] = useState("5000");
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const selectedBusiness = fundedBusinesses.find((business) => business.id === selectedBusinessId) || fundedBusinesses[0];
  const numericAmount = Number(amount) || 0;
  const feeRate = feeRateFor(numericAmount);
  const transactionFee = numericAmount * feeRate;
  const totalDebit = numericAmount + transactionFee;
  const totals = useMemo(() => fundedBusinesses.reduce((sum, business) => sum + business.funded, 0), []);

  const submitDeposit = () => {
    setPaymentOpen(false);
    setNotice(`Deposit queued: R${numericAmount.toLocaleString("en-ZA")} to ${selectedBusiness.name}. Fee: R${transactionFee.toFixed(2)}.`);
    window.setTimeout(() => setNotice(""), 4500);
  };

  return (
    <>
      <PageHero eyebrow="Portfolio" title="Funded businesses, performance, and deposits." description="Track approved businesses you have already funded, monitor performance analytics, and send capital into each linked business account through the Imbewu payment gateway." />
      {notice ? <div className="funder-toast funder-toast-secondary"><strong>Payment gateway update</strong><span>{notice}</span></div> : null}
      <div className="funder-grid funder-grid-4">
        <StatCard label="Total deployed" value={`R${totals.toLocaleString("en-ZA")}`} note="Approved capital sent" tone="green" />
        <StatCard label="Funded businesses" value={String(fundedBusinesses.length)} note="Approved portfolio accounts" tone="blue" />
        <StatCard label="Average performance" value="84%" note="Revenue, milestones, repayments" tone="gold" />
        <StatCard label="Fee range" value="2-4%" note="Based on deposit amount" tone="purple" />
      </div>
      <div className="funder-portfolio-layout">
        <section className="funder-funded-grid">
          {fundedBusinesses.map((business) => (
            <article className="funder-funded-card" key={business.id}>
              <div className="funder-funded-cover"><img src={business.coverImage} alt={`${business.name} funded business`} /><span>{business.repayment}</span></div>
              <div className="funder-funded-body">
                <div><h2>{business.name}</h2><p>{business.owner} | {business.sector}</p></div>
                <div className="funder-funded-analytics">
                  <div><span>Funded</span><strong>R{business.funded.toLocaleString("en-ZA")}</strong></div>
                  <div><span>Outstanding</span><strong>R{business.outstanding.toLocaleString("en-ZA")}</strong></div>
                  <div><span>Growth</span><strong>{business.revenueGrowth}</strong></div>
                </div>
                <div><div className="funder-funded-score"><span>Performance</span><strong>{business.performance}%</strong></div><div className="funder-progress"><span style={{ width: `${business.performance}%` }} /></div></div>
                <p><strong>Next milestone:</strong> {business.nextMilestone}</p>
                <button className="funder-button" onClick={() => { setSelectedBusinessId(business.id); setPaymentOpen(true); }}>Deposit funds</button>
              </div>
            </article>
          ))}
        </section>
        <GlassCard className="funder-gateway-card">
          <span className="funder-section-kicker">Linked payment gateway</span>
          <h2>Deposit to business account</h2>
          <p>Funds are routed to the approved business account on file. Imbewu calculates a transparent transaction fee between 2% and 4% based on the deposit range.</p>
          <label><span className="funder-label">Approved business</span><select className="funder-input" value={selectedBusinessId} onChange={(event) => setSelectedBusinessId(event.target.value)}>{fundedBusinesses.map((business) => <option key={business.id} value={business.id}>{business.name}</option>)}</select></label>
          <label><span className="funder-label">Deposit amount</span><input className="funder-input" value={amount} onChange={(event) => setAmount(event.target.value)} inputMode="numeric" /></label>
          <div className="funder-fee-box">
            <div><span>Linked account</span><strong>{selectedBusiness.account}</strong></div>
            <div><span>Gateway fee</span><strong>{(feeRate * 100).toFixed(0)}% | R{transactionFee.toFixed(2)}</strong></div>
            <div><span>Total debit</span><strong>R{totalDebit.toFixed(2)}</strong></div>
          </div>
          <button className="funder-button" onClick={() => setPaymentOpen(true)}>Continue payment</button>
        </GlassCard>
      </div>
      {paymentOpen ? (
        <div className="funder-modal-backdrop">
          <div className="funder-modal-card funder-payment-modal">
            <div className="funder-modal-header"><div><span className="funder-section-kicker">Secure gateway</span><h2>Confirm deposit</h2></div><button className="funder-button-secondary" onClick={() => setPaymentOpen(false)}>Close</button></div>
            <div className="funder-fee-box">
              <div><span>Business</span><strong>{selectedBusiness.name}</strong></div>
              <div><span>Deposit</span><strong>R{numericAmount.toFixed(2)}</strong></div>
              <div><span>Transaction fee</span><strong>{(feeRate * 100).toFixed(0)}% | R{transactionFee.toFixed(2)}</strong></div>
              <div><span>Destination</span><strong>{selectedBusiness.account}</strong></div>
            </div>
            <button className="funder-button" onClick={submitDeposit}>Confirm and send R{totalDebit.toFixed(2)}</button>
          </div>
        </div>
      ) : null}
    </>
  );
}
