// app/funder/portfolio/page.tsx
"use client";

import Link from "next/link";

export default function PortfolioPage() {
  const portfolio = {
    totalDeployed: "R1,240,000",
    activeBusinesses: 18,
    milestoneRate: "92%",
  };

  const businesses = [
    { name: "Khula Foods", funded: "R50,000", progress: 70, status: "On Track", milestone: "Purchase equipment", due: "15 September 2026" },
    { name: "ABC Farming", funded: "R120,000", progress: 45, status: "On Track", milestone: "Expand operations", due: "30 October 2026" },
    { name: "Nomsa Fashion", funded: "R30,000", progress: 90, status: "On Track", milestone: "Marketing campaign", due: "1 December 2026" },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Portfolio</h1>
        <p className="text-gray-500">Track your investments and impact</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500">Total Deployed</p>
          <p className="text-3xl font-bold text-emerald-600">{portfolio.totalDeployed}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500">Active Businesses</p>
          <p className="text-3xl font-bold text-gray-800">{portfolio.activeBusinesses}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500">Repayment / Milestones</p>
          <p className="text-3xl font-bold text-emerald-600">{portfolio.milestoneRate}</p>
        </div>
      </div>

      {/* Portfolio List */}
      <div className="space-y-4">
        {businesses.map((business) => (
          <div key={business.name} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:border-blue-300 transition">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{business.name}</h3>
                <div className="flex flex-wrap items-center gap-4 mt-2">
                  <span className="text-sm text-gray-500">Funded: <span className="font-medium text-gray-800">{business.funded}</span></span>
                  <span className="text-sm text-gray-500">Progress: <span className="font-medium text-gray-800">{business.progress}%</span></span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    business.status === "On Track" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {business.status}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: `${business.progress}%` }}></div>
                </div>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500">
                  <span>Next milestone: <span className="font-medium text-gray-700">{business.milestone}</span></span>
                  <span>Due: <span className="font-medium text-gray-700">{business.due}</span></span>
                </div>
              </div>
              <Link
                href={`/funder/business/1`}
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