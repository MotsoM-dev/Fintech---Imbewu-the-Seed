"use client";

import { useState } from "react";
import Link from "next/link";
import { GlassCard, PageHero, StatCard } from "../FunderUI";

const requests = [
  { id: "1", business: "Khula Foods", owner: "Ayanda Mbeki", requested: "R50,000", score: 82, status: "Reviewing", industry: "Agriculture", location: "East London", date: "2 Sep 2026", purpose: "Cold storage and delivery crates", signal: "Consistent demand from households and local food sellers.", coverImage: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80", accent: "green" },
  { id: "2", business: "Sisonke Repair Co-op", owner: "Mandla Jali", requested: "R18,000", score: 76, status: "New", industry: "Services", location: "Mdantsane", date: "1 Sep 2026", purpose: "Tools and spare parts inventory", signal: "Funding can cut repair wait times and support technician income.", coverImage: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80", accent: "blue" },
  { id: "3", business: "Nomsa School Uniforms", owner: "Nomsa Peyi", requested: "R12,000", score: 71, status: "Offer Sent", industry: "Retail", location: "East London", date: "30 Aug 2026", purpose: "Fabric, thread, and ready-made uniform stock", signal: "Seasonal demand is rising before the next school term.", coverImage: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=900&q=80", accent: "gold" },
  { id: "4", business: "Green Energy Solutions", owner: "Thabo Molefe", requested: "R200,000", score: 88, status: "Funded", industry: "Technology", location: "Johannesburg", date: "15 Aug 2026", purpose: "Installation stock and technician training", signal: "Recurring service revenue and strong outage-driven demand.", coverImage: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=900&q=80", accent: "green" },
];

export default function RequestsPage() {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "New", "Reviewing", "Offer Sent", "Funded", "Declined"];
  const filteredRequests = filter === "All" ? requests : requests.filter((request) => request.status === filter);
  const activeCapital = requests.filter((request) => request.status !== "Declined").length;

  return (
    <>
      <PageHero eyebrow="Requests" title="Review funding requests like an investor." description="A sharper request room for comparing readiness, purpose, traction, and community upside before you open a business account." />
      <div className="funder-grid funder-grid-4">
        <StatCard label="Active requests" value={String(activeCapital)} note="Businesses asking for capital" tone="green" />
        <StatCard label="Highest readiness" value="88%" note="Green Energy Solutions" tone="blue" />
        <StatCard label="Capital requested" value="R280k" note="Across visible requests" tone="purple" />
        <StatCard label="Offers moving" value="2" note="Reviewing or sent" tone="gold" />
      </div>
      <GlassCard className="funder-request-filter-card">
        <div>
          <span className="funder-section-kicker">Request filters</span>
          <h2>Choose the deal stage</h2>
        </div>
        <div className="funder-request-filter-tabs">
          {filters.map((item) => <button key={item} onClick={() => setFilter(item)} data-active={filter === item} className="funder-tab">{item}</button>)}
        </div>
      </GlassCard>
      <section className="funder-request-room">
        <div className="funder-request-room-head">
          <div><span className="funder-section-kicker">Live request board</span><h2>{filter === "All" ? "All funding requests" : `${filter} requests`}</h2><p>{filteredRequests.length} business{filteredRequests.length === 1 ? "" : "es"} match this stage.</p></div>
          <Link href="/funder/discover" className="funder-button-secondary">Back to catalog</Link>
        </div>
        <div className="funder-request-room-grid">
          {filteredRequests.map((request) => (
            <article className={`funder-request-tile funder-request-tile-${request.accent}`} key={request.id}>
              <div className="funder-request-tile-cover"><img src={request.coverImage} alt={`${request.business} request cover`} /><span>{request.status}</span></div>
              <div className="funder-request-tile-body">
                <div>
                  <h3>{request.business}</h3>
                  <p>{request.owner} | {request.industry} | {request.location}</p>
                </div>
                <div className="funder-request-tile-purpose"><span>Use of funds</span><strong>{request.purpose}</strong></div>
                <p>{request.signal}</p>
                <div className="funder-request-tile-metrics">
                  <div><span>Requested</span><strong>{request.requested}</strong></div>
                  <div><span>Readiness</span><strong>{request.score}%</strong></div>
                  <div><span>Received</span><strong>{request.date}</strong></div>
                </div>
                <div className="funder-progress"><span style={{ width: `${request.score}%` }} /></div>
                <Link href={`/funder/business/${request.id}`} className="funder-button">Open business account</Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
