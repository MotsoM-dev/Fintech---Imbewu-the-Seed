// app/funder/discover/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";

interface Business {
  id: string;
  name: string;
  industry: string;
  location: string;
  verified: boolean;
  readiness: number;
  revenue: string;
  tradingHistory: string;
  fundingRequested: string;
  description: string;
}

export default function DiscoverPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sector, setSector] = useState("");
  const [location, setLocation] = useState("");

  const businesses: Business[] = [
    {
      id: "1",
      name: "Khula Foods",
      industry: "Agriculture",
      location: "East London",
      verified: true,
      readiness: 82,
      revenue: "R24,500/month",
      tradingHistory: "24 months",
      fundingRequested: "R50,000",
      description: "Sustainable farming and food processing business",
    },
    {
      id: "2",
      name: "ABC Farming",
      industry: "Agriculture",
      location: "KwaZulu-Natal",
      verified: true,
      readiness: 76,
      revenue: "R18,200/month",
      tradingHistory: "18 months",
      fundingRequested: "R120,000",
      description: "Organic vegetable farming and distribution",
    },
    {
      id: "3",
      name: "Nomsa Fashion",
      industry: "Fashion",
      location: "Cape Town",
      verified: false,
      readiness: 71,
      revenue: "R12,800/month",
      tradingHistory: "12 months",
      fundingRequested: "R30,000",
      description: "African-inspired fashion and accessories",
    },
    {
      id: "4",
      name: "Green Energy Solutions",
      industry: "Technology",
      location: "Johannesburg",
      verified: true,
      readiness: 88,
      revenue: "R42,000/month",
      tradingHistory: "36 months",
      fundingRequested: "R200,000",
      description: "Solar energy installation and maintenance",
    },
  ];

  const filteredBusinesses = businesses.filter((b) => {
    const matchesSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = !sector || b.industry === sector;
    const matchesLocation = !location || b.location.includes(location);
    return matchesSearch && matchesSector && matchesLocation;
  });

  const sectors = ["All", "Agriculture", "Fashion", "Technology", "Retail", "Food & Beverage"];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Discover Businesses</h1>
        <p className="text-gray-500">Find and fund promising SMEs</p>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search businesses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <select
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {sectors.map((s) => (
              <option key={s} value={s === "All" ? "" : s}>{s}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Location..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {filteredBusinesses.map((business) => (
          <div key={business.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:border-blue-300 transition">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-gray-800">{business.name}</h3>
                  {business.verified && (
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
                      VERIFIED ✓
                    </span>
                  )}
                </div>
                <p className="text-gray-500 text-sm">{business.industry} • {business.location}</p>
                <p className="text-gray-600 text-sm mt-1">{business.description}</p>
                
                <div className="flex flex-wrap items-center gap-4 mt-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">Readiness:</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${business.readiness}%` }}></div>
                      </div>
                      <span className="text-sm font-semibold text-emerald-600">{business.readiness}%</span>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">Revenue: {business.revenue}</span>
                  <span className="text-sm text-gray-500">Trading: {business.tradingHistory}</span>
                  <span className="text-sm font-medium text-blue-600">Funding: {business.fundingRequested}</span>
                </div>
              </div>
              <Link
                href={`/funder/business/${business.id}`}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium whitespace-nowrap"
              >
                View Business →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}