// app/funder/applications/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";

export default function ApplicationsPage() {
  const [filter, setFilter] = useState("All");

  const filters = ["All", "New", "Reviewing", "Offers", "Funded", "Declined"];

  const applications = [
    { id: "1", business: "Khula Foods", requested: "R50,000", score: 82, status: "Reviewing", industry: "Agriculture", date: "2 Sep 2026" },
    { id: "2", business: "ABC Farming", requested: "R120,000", score: 76, status: "New", industry: "Agriculture", date: "1 Sep 2026" },
    { id: "3", business: "Nomsa Fashion", requested: "R30,000", score: 71, status: "Offer Sent", industry: "Fashion", date: "30 Aug 2026" },
    { id: "4", business: "Green Energy", requested: "R200,000", score: 88, status: "Funded", industry: "Technology", date: "15 Aug 2026" },
  ];

  const statusColors = {
    "New": "bg-blue-100 text-blue-700",
    "Reviewing": "bg-yellow-100 text-yellow-700",
    "Offer Sent": "bg-green-100 text-green-700",
    "Funded": "bg-emerald-100 text-emerald-700",
    "Declined": "bg-red-100 text-red-700",
  };

  const filteredApps = filter === "All" ? applications : applications.filter(a => a.status === filter);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Applications</h1>
        <p className="text-gray-500">Review and manage funding applications</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              filter === f
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Industry</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requested</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredApps.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50 transition cursor-pointer">
                  <td className="px-6 py-4 font-medium text-gray-800">{app.business}</td>
                  <td className="px-6 py-4 text-gray-600">{app.industry}</td>
                  <td className="px-6 py-4 text-gray-800">{app.requested}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-800">{app.score}%</span>
                      <div className="w-16 bg-gray-200 rounded-full h-1.5">
                        <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${app.score}%` }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[app.status as keyof typeof statusColors]}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm">{app.date}</td>
                  <td className="px-6 py-4">
                    <Link href={`/funder/applications/${app.id}`} className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}