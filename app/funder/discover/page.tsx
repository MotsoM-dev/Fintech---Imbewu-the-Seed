"use client";

import { useState } from "react";
import Link from "next/link";
import { GlassCard, PageHero, StatCard } from "../FunderUI";

type Business = {
  id: string; name: string; owner: string; industry: string; location: string; verified: boolean; readiness: number; revenue: string; tradingHistory: string; fundingRequested: string; description: string; coverImage: string; profileImage: string; avatar: string; customers: string; products: string;
};

const businesses: Business[] = [
  { id: "1", name: "Khula Foods", owner: "Ayanda Mbeki", industry: "Agriculture", location: "East London", verified: true, readiness: 82, revenue: "R24,500/month", tradingHistory: "24 months", fundingRequested: "R50,000", description: "Fresh produce processing and township delivery for households, spazas, and caterers.", coverImage: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1400&q=80", profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=320&q=80", avatar: "AM", customers: "180 repeat buyers", products: "Vegetable boxes, dried herbs, catering packs" },
  { id: "2", name: "Sisonke Repair Co-op", owner: "Mandla Jali", industry: "Services", location: "Mdantsane", verified: true, readiness: 76, revenue: "R18,200/month", tradingHistory: "18 months", fundingRequested: "R18,000", description: "A neighbourhood repair collective fixing appliances, bicycles, and small business equipment.", coverImage: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1400&q=80", profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=320&q=80", avatar: "MJ", customers: "64 service clients", products: "Appliance repair, tool hire, maintenance plans" },
  { id: "3", name: "Nomsa School Uniforms", owner: "Nomsa Peyi", industry: "Retail", location: "East London", verified: false, readiness: 71, revenue: "R12,800/month", tradingHistory: "12 months", fundingRequested: "R12,000", description: "Affordable schoolwear and alterations for families preparing for new terms.", coverImage: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1400&q=80", profileImage: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=320&q=80", avatar: "NP", customers: "42 monthly families", products: "Uniform sets, hems, repairs, bulk school orders" },
  { id: "4", name: "Green Energy Solutions", owner: "Thabo Molefe", industry: "Technology", location: "Johannesburg", verified: true, readiness: 88, revenue: "R42,000/month", tradingHistory: "36 months", fundingRequested: "R200,000", description: "Solar maintenance and small installations for homes and community businesses.", coverImage: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1400&q=80", profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=320&q=80", avatar: "TM", customers: "31 active sites", products: "Solar checks, inverter setup, panel cleaning" },
];

export default function DiscoverPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sector, setSector] = useState("");
  const [location, setLocation] = useState("");
  const sectors = ["All", "Agriculture", "Services", "Retail", "Technology"];
  const filteredBusinesses = businesses.filter((business) => {
    const matchesSearch = `${business.name} ${business.industry} ${business.owner}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = !sector || business.industry === sector;
    const matchesLocation = !location || business.location.toLowerCase().includes(location.toLowerCase());
    return matchesSearch && matchesSector && matchesLocation;
  });

  return (
    <>
      <PageHero eyebrow="Business catalog" title="Discover community businesses with real storefronts." description="Browse portfolio-style business profiles with owner identity, trading proof, products, traction, and a storefront preview before opening the full account." />
      <div className="funder-grid funder-grid-3">
        <StatCard label="Catalog matches" value={String(filteredBusinesses.length)} note="Business portfolios visible now" tone="green" />
        <StatCard label="Verified profiles" value={String(filteredBusinesses.filter((business) => business.verified).length)} note="Evidence-backed opportunities" tone="blue" />
        <StatCard label="Local request pool" value="R380k" note="Across visible funding requests" tone="purple" />
      </div>
      <GlassCard className="funder-catalog-filter">
        <div className="funder-grid funder-grid-3">
          <input className="funder-input" type="text" placeholder="Search by business, owner, or sector..." value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
          <select className="funder-input" value={sector} onChange={(event) => setSector(event.target.value)}>{sectors.map((item) => <option key={item} value={item === "All" ? "" : item}>{item}</option>)}</select>
          <input className="funder-input" type="text" placeholder="Filter by location..." value={location} onChange={(event) => setLocation(event.target.value)} />
        </div>
      </GlassCard>
      <div className="funder-catalog-grid">
        {filteredBusinesses.map((business) => (
          <article className="funder-catalog-card" key={business.id}>
            <div className="funder-catalog-cover"><img src={business.coverImage} alt={`${business.name} cover`} /><span className="funder-catalog-badge">{business.verified ? "Verified portfolio" : "Verification pending"}</span></div>
            <div className="funder-catalog-body">
              <div className="funder-catalog-identity"><div className="funder-catalog-avatar"><img src={business.profileImage} alt={business.owner} /></div><div><h2>{business.name}</h2><p>{business.owner} | {business.industry} | {business.location}</p></div></div>
              <p>{business.description}</p>
              <div className="funder-catalog-facts">
                <div><span>Readiness</span><strong>{business.readiness}%</strong></div>
                <div><span>Revenue</span><strong>{business.revenue}</strong></div>
                <div><span>Trading</span><strong>{business.tradingHistory}</strong></div>
                <div><span>Customers</span><strong>{business.customers}</strong></div>
              </div>
              <div className="funder-catalog-storefront"><span>Storefront shelf</span><p>{business.products}</p></div>
              <div className="funder-catalog-actions"><span className="funder-pill positive">{business.fundingRequested} requested</span><Link href={`/funder/business/${business.id}`} className="funder-button">Open account</Link></div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
