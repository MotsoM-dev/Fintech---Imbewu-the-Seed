"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { GlassCard, StatCard } from "../../FunderUI";

const businesses = [
  { id: "1", name: "Khula Foods", owner: "Ayanda Mbeki", industry: "Agriculture", location: "East London", verified: true, readiness: 82, risk: "Low/Medium", revenue: "R24,500/month", tradingHistory: "24 months", description: "Fresh produce processing and township delivery for households, spazas, and caterers.", fundingRequested: "R50,000", fundingPurpose: "Cold storage and delivery crates", revenueTrend: "+18%", impact: "Feeds 180 repeat households and supplies 9 informal food sellers.", opportunity: "A small cold-storage upgrade can reduce spoilage, increase delivery capacity, and unlock larger catering orders.", coverImage: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1600&q=80", profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=320&q=80", avatar: "AM", products: [{ name: "Family vegetable box", price: "R120", description: "Weekly mixed produce for households." }, { name: "Dried herb packs", price: "R35", description: "Locally grown herbs for cooking." }, { name: "Catering produce bundle", price: "R480", description: "Bulk fresh produce for events and kitchens." }] },
  { id: "2", name: "Sisonke Repair Co-op", owner: "Mandla Jali", industry: "Services", location: "Mdantsane", verified: true, readiness: 76, risk: "Medium", revenue: "R18,200/month", tradingHistory: "18 months", description: "A neighbourhood repair collective fixing appliances, bicycles, and small business equipment.", fundingRequested: "R18,000", fundingPurpose: "Tools and spare parts inventory", revenueTrend: "+11%", impact: "Keeps household appliances in use and supports 4 cooperative repair technicians.", opportunity: "Better tools and stock can cut wait times, grow repeat clients, and open service contracts with local shops.", coverImage: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=80", profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=320&q=80", avatar: "MJ", products: [{ name: "Appliance repair", price: "From R180", description: "Fridges, stoves, kettles, and small appliances." }, { name: "Tool hire day pass", price: "R90", description: "Affordable tool access for local builders." }, { name: "Monthly maintenance", price: "R350", description: "Preventative checks for small businesses." }] },
  { id: "3", name: "Nomsa School Uniforms", owner: "Nomsa Peyi", industry: "Retail", location: "East London", verified: false, readiness: 71, risk: "Medium", revenue: "R12,800/month", tradingHistory: "12 months", description: "Affordable schoolwear and alterations for families preparing for new terms.", fundingRequested: "R12,000", fundingPurpose: "Fabric, thread, and ready-made uniform stock", revenueTrend: "+9%", impact: "Helps families access lower-cost schoolwear and quick repairs close to home.", opportunity: "Stocking core sizes before term starts can turn confirmed demand into higher margin sales.", coverImage: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1600&q=80", profileImage: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=320&q=80", avatar: "NP", products: [{ name: "Primary uniform set", price: "R390", description: "Shirt, skirt or trousers, and jersey." }, { name: "Alteration service", price: "From R45", description: "Hems, repairs, resizing, and patches." }, { name: "Bulk school order", price: "Quote", description: "Class and team uniform packages." }] },
  { id: "4", name: "Green Energy Solutions", owner: "Thabo Molefe", industry: "Technology", location: "Johannesburg", verified: true, readiness: 88, risk: "Low", revenue: "R42,000/month", tradingHistory: "36 months", description: "Solar maintenance and small installations for homes and community businesses.", fundingRequested: "R200,000", fundingPurpose: "Installation stock and technician training", revenueTrend: "+22%", impact: "Keeps 31 homes and small businesses running during outages.", opportunity: "Inventory funding can support larger installations and faster response times for existing customers.", coverImage: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1600&q=80", profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=320&q=80", avatar: "TM", products: [{ name: "Solar health check", price: "R650", description: "Panel, inverter, and battery diagnostics." }, { name: "Panel cleaning", price: "R450", description: "Maintenance for better energy capture." }, { name: "Backup setup", price: "Quote", description: "Small inverter systems for shops and homes." }] },
];

export default function BusinessDetailPage() {
  const params = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("investment");
  const business = businesses.find((item) => item.id === params.id) || businesses[0];
  const tabs = ["investment", "storefront", "financials", "documents", "activity"];

  return (
    <>
      <section className="funder-deal-hero">
        <img src={business.coverImage} alt={`${business.name} business cover`} />
        <div className="funder-deal-hero-content">
          <div className="funder-deal-breadcrumb">Business account | {business.industry} | {business.location}</div>
          <h1>{business.name}</h1>
          <p>{business.description}</p>
          <div className="funder-deal-tags">
            <span>{business.verified ? "Verified business profile" : "Verification pending"}</span>
            <span>{business.tradingHistory} trading</span>
            <span>{business.revenueTrend} revenue trend</span>
          </div>
        </div>
        <aside className="funder-deal-ticket">
          <span>Funding request</span>
          <strong>{business.fundingRequested}</strong>
          <p>{business.fundingPurpose}</p>
          <button className="funder-button">Make offer</button>
          <button className="funder-button-secondary">Request information</button>
        </aside>
      </section>
      <div className="funder-deal-metrics">
        <StatCard label="Readiness" value={`${business.readiness}/100`} note="Investment readiness" tone="green" />
        <StatCard label="Risk band" value={business.risk} note="Current diligence signal" tone="gold" />
        <StatCard label="Monthly revenue" value={business.revenue} note="Reported turnover" tone="blue" />
        <StatCard label="Trading age" value={business.tradingHistory} note="Operating history" tone="purple" />
      </div>
      <div className="funder-deal-layout">
        <main className="funder-deal-main">
          <GlassCard className="funder-investment-thesis">
            <div className="funder-section-kicker">Investor brief</div>
            <h2>Why this business makes sense</h2>
            <p>{business.opportunity}</p>
            <div className="funder-thesis-grid">
              <div><span>Community impact</span><strong>{business.impact}</strong></div>
              <div><span>Use of funds</span><strong>{business.fundingPurpose}</strong></div>
              <div><span>Revenue momentum</span><strong>{business.revenueTrend} across recent months</strong></div>
            </div>
          </GlassCard>
          <GlassCard className="funder-deal-room">
            <div className="funder-tabs">{tabs.map((tab) => <button key={tab} onClick={() => setActiveTab(tab)} data-active={activeTab === tab} className="funder-tab">{tab === "investment" ? "Investment view" : tab === "storefront" ? "Storefront preview" : tab[0].toUpperCase() + tab.slice(1)}</button>)}</div>
            <div className="funder-detail-panel">
              {activeTab === "investment" ? <div className="funder-grid funder-grid-2"><GlassCard><h3>Business profile</h3><p>{business.description}</p><div className="funder-list"><div className="funder-row"><strong>Sector</strong><span className="funder-pill">{business.industry}</span></div><div className="funder-row"><strong>Location</strong><span className="funder-pill positive">{business.location}</span></div></div></GlassCard><GlassCard><h3>Funding request</h3><div className="funder-list"><div className="funder-row"><strong>Amount</strong><span className="funder-pill">{business.fundingRequested}</span></div><div className="funder-row"><strong>Purpose</strong><span className="funder-pill positive">{business.fundingPurpose}</span></div></div></GlassCard></div> : null}
              {activeTab === "storefront" ? <div className="funder-storefront-preview"><div className="funder-storefront-hero"><img src={business.coverImage} alt={`${business.name} storefront cover`} /><div className="funder-business-avatar">{business.avatar}</div><div><span>Live storefront preview</span><h2>{business.name}</h2><p>{business.description}</p></div></div><div className="funder-grid funder-grid-3">{business.products.map((product) => <article className="funder-storefront-product" key={product.name}><span className="funder-pill">Available</span><h3>{product.name}</h3><p>{product.description}</p><strong>{product.price}</strong></article>)}</div></div> : null}
              {activeTab === "financials" ? <div className="funder-empty"><div>Chart</div><h3>Financial signal</h3><p>Revenue and transaction charts will appear here.</p></div> : null}
              {activeTab === "documents" ? <div className="funder-empty"><div>Docs</div><h3>Verified documents</h3><p>Evidence checks, bank statements, and identity documents will appear here.</p></div> : null}
              {activeTab === "activity" ? <div className="funder-empty"><div>Log</div><h3>Recent activity</h3><p>Messages, updates, and diligence activity will appear here.</p></div> : null}
            </div>
          </GlassCard>
        </main>
        <aside className="funder-founder-panel">
          <div className="funder-founder-photo"><img src={business.profileImage} alt={business.owner} /></div>
          <span>Account steward</span>
          <h3>{business.owner}</h3>
          <p>Owner details support the diligence story, while the business profile remains the main investment focus.</p>
          <div className="funder-list">
            <div className="funder-row"><strong>Role</strong><span className="funder-pill">Founder</span></div>
            <div className="funder-row"><strong>Status</strong><span className="funder-pill positive">{business.verified ? "Verified" : "Pending"}</span></div>
          </div>
        </aside>
      </div>
    </>
  );
}
