"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { useFunderState } from "../FunderState";
import { GlassCard, PageHero, StatCard } from "../FunderUI";

export default function FunderDashboard() {
  const { profile } = useFunderState();

  const requests = [
    { name: "Khula Foods", industry: "Agriculture", location: "East London", score: 82, amount: "R50,000", status: "Reviewing", signal: "Strong trading history", accent: "green" },
    { name: "Sisonke Repair Co-op", industry: "Services", location: "Mdantsane", score: 76, amount: "R18,000", status: "New", signal: "Tools can unlock faster turnaround", accent: "blue" },
    { name: "Nomsa School Uniforms", industry: "Retail", location: "East London", score: 71, amount: "R12,000", status: "Offer Sent", signal: "Seasonal demand is rising", accent: "gold" },
  ];

  return (
    <>
      <PageHero eyebrow={`${profile.funderType} funding workspace`} title={`Good ${new Date().getHours() < 12 ? "Morning" : new Date().getHours() < 18 ? "Afternoon" : "Evening"}, ${profile.name}!`} description={profile.mandate}>
        <button onClick={() => signOut({ callbackUrl: "/auth/signin" })} className="funder-button-secondary">Logout</button>
        <button className="funder-button">Review requests</button>
      </PageHero>
      <div className="funder-grid funder-grid-3">
        <StatCard label="Local SMEs" value="18" note="Community opportunities nearby" tone="blue" />
        <StatCard label="Watchlist" value="6" note="Businesses you are following" tone="purple" />
        <StatCard label="Ready to invest" value={profile.ticketSize} note={`${profile.province} funding budget`} tone="green" />
      </div>
      <div className="funder-grid funder-grid-2 funder-signal-grid">
        <GlassCard className="funder-signal-card">
          <div className="funder-section-kicker">Portfolio signal</div>
          <h2>Neighbourhood momentum map</h2>
          <p>Your capital is clustering around practical businesses that keep money, work, and services moving locally.</p>
          <div className="funder-signal-orb" aria-hidden="true">
            <span>12</span>
            <small>jobs supported</small>
          </div>
          <div className="funder-signal-metrics">
            <div><span>Average readiness</span><strong>78%</strong></div>
            <div><span>Priority sector</span><strong>Food + services</strong></div>
            <div><span>Local confidence</span><strong>High</strong></div>
          </div>
        </GlassCard>
        <GlassCard className="funder-investor-card">
          <div className="funder-section-kicker">Community investor</div>
          <h2>{profile.accountName}</h2>
          <p>{profile.mandate}</p>
          <div className="funder-investor-strip">
            <div><span>Request queue</span><strong>8 businesses</strong></div>
            <div><span>Offers in motion</span><strong>2 active</strong></div>
          </div>
          <Link href="/funder/profile" className="funder-button-secondary">Edit investor profile</Link>
        </GlassCard>
      </div>
      <GlassCard className="funder-requests-board">
        <div className="funder-requests-head">
          <div>
            <span className="funder-section-kicker">Live request flow</span>
            <h2>New Funding Requests</h2>
            <p>A sharper view of nearby businesses asking for practical community capital.</p>
          </div>
          <Link href="/funder/application" className="funder-button-secondary">View all requests</Link>
        </div>
        <div className="funder-request-stack">
          {requests.map((request) => (
            <article key={request.name} className={`funder-request-card funder-request-${request.accent}`}>
              <div className="funder-request-main">
                <span className="funder-request-status">{request.status}</span>
                <h3>{request.name}</h3>
                <p>{request.industry} | {request.location}</p>
                <small>{request.signal}</small>
              </div>
              <div className="funder-request-readiness">
                <strong>{request.score}%</strong>
                <span>readiness</span>
                <div className="funder-progress"><span style={{ width: `${request.score}%` }} /></div>
              </div>
              <div className="funder-request-amount">
                <span>Requested</span>
                <strong>{request.amount}</strong>
              </div>
              <Link href="/funder/business/1" className="funder-button-secondary">View request</Link>
            </article>
          ))}
        </div>
      </GlassCard>
    </>
  );
}
