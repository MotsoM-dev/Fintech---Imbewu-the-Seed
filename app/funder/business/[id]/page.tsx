// app/funder/business/[id]/page.tsx
"use client";

import { useState } from "react";

export default function BusinessDetailPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "financials", label: "Financials" },
    { id: "documents", label: "Documents" },
    { id: "funding", label: "Funding" },
    { id: "activity", label: "Activity" },
  ];

  // Mock business data
  const business = {
    name: "Khula Foods",
    industry: "Agriculture",
    location: "East London",
    verified: true,
    readiness: 82,
    risk: "Low/Medium",
    revenue: "R24,500/month",
    tradingHistory: "24 months",
    description: "Sustainable farming and food processing business serving local communities.",
    fundingRequested: "R50,000",
    fundingPurpose: "Equipment",
    revenueTrend: "+18%",
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">{business.name}</h1>
              {business.verified && (
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
                  VERIFIED ✓
                </span>
              )}
            </div>
            <p className="text-gray-500">{business.industry} • {business.location}</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition text-sm font-medium">
              Request Information
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium">
              Make Offer
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-500">Readiness</p>
            <p className="text-2xl font-bold text-emerald-600">{business.readiness}/100</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-500">Risk</p>
            <p className="text-2xl font-bold text-yellow-600">{business.risk}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-500">Revenue</p>
            <p className="text-2xl font-bold text-gray-800">{business.revenue}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-500">Trading History</p>
            <p className="text-2xl font-bold text-gray-800">{business.tradingHistory}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-500">Revenue Trend</p>
            <p className="text-2xl font-bold text-emerald-600">{business.revenueTrend}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 mt-6 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 px-1 text-sm font-medium transition ${
                activeTab === tab.id
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="mt-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">About</h3>
                <p className="text-gray-600">{business.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">AI Funding Insight</h4>
                  <p className="text-sm text-gray-600">
                    Revenue has remained consistent over the previous six months, showing stable business operations.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Funding Request</h4>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-gray-500">Amount:</span> <span className="font-medium">{business.fundingRequested}</span></p>
                    <p><span className="text-gray-500">Purpose:</span> <span className="font-medium">{business.fundingPurpose}</span></p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "financials" && (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-3">📊</div>
              <p>Financial data and charts will appear here</p>
            </div>
          )}

          {activeTab === "documents" && (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-3">📄</div>
              <p>Verified documents will appear here</p>
            </div>
          )}

          {activeTab === "funding" && (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-3">💰</div>
              <p>Funding details and history will appear here</p>
            </div>
          )}

          {activeTab === "activity" && (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-3">📋</div>
              <p>Recent activity will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}