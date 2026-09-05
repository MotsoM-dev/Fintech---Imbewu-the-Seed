// app/funder/dashboard/page.tsx
"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function FunderDashboard() {
  const { data: session } = useSession();
  const user = session?.user as any;

  const stats = [
    { label: "SMEs", value: "128", icon: "🏢", color: "blue" },
    { label: "Reviews", value: "24", icon: "📋", color: "purple" },
    { label: "Deployed", value: "R1.2m", icon: "💰", color: "emerald" },
  ];

  const applications = [
    { name: "Khula Foods", industry: "Agriculture", location: "East London", score: 82, amount: "R50,000", status: "Reviewing" },
    { name: "ABC Farming", industry: "Agriculture", location: "KwaZulu-Natal", score: 76, amount: "R120,000", status: "New" },
    { name: "Nomsa Fashion", industry: "Fashion", location: "Cape Town", score: 71, amount: "R30,000", status: "Offer Sent" },
  ];

  const statusColors = {
    "New": "bg-blue-100 text-blue-700",
    "Reviewing": "bg-yellow-100 text-yellow-700",
    "Offer Sent": "bg-green-100 text-green-700",
    "Funded": "bg-emerald-100 text-emerald-700",
    "Declined": "bg-red-100 text-red-700",
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/auth/signin" });
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Good {new Date().getHours() < 12 ? "Morning" : new Date().getHours() < 18 ? "Afternoon" : "Evening"}, {user?.name || "Funder"}! 👋
          </h1>
          <p className="text-gray-500 text-sm">
            {new Date().toLocaleDateString("en-ZA", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Notification Bell */}
          <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition relative">
            🔔
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
          
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition font-medium"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`h-12 w-12 rounded-full bg-${stat.color}-100 flex items-center justify-center text-2xl`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="font-semibold text-gray-800">New Funding Applications</h3>
          <Link href="/funder/applications" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View All →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {applications.map((app) => (
                <tr key={app.name} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-800">{app.name}</p>
                      <p className="text-sm text-gray-500">{app.industry} • {app.location}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-800">{app.score}%</span>
                      <div className="w-16 bg-gray-200 rounded-full h-1.5">
                        <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${app.score}%` }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-800">{app.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[app.status as keyof typeof statusColors]}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                      View
                    </button>
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