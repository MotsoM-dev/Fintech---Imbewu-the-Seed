// app/entrepreneur/funding/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface FundingApplication {
  id: string;
  amount: string;
  purpose: string;
  submitted: string;
  status: "New" | "Reviewing" | "Under Review" | "Offer" | "Funded";
  progress: number;
}

export default function FundingPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("opportunities");
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [applications, setApplications] = useState<FundingApplication[]>([
    {
      id: "IMB-2048",
      amount: "R50,000",
      purpose: "Equipment",
      submitted: "2 Sep 2026",
      status: "Under Review",
      progress: 3,
    },
    {
      id: "IMB-2035",
      amount: "R25,000",
      purpose: "Inventory",
      submitted: "28 Aug 2026",
      status: "Reviewing",
      progress: 2,
    },
  ]);

  const [formData, setFormData] = useState({
    amount: "",
    purpose: "",
    fundingType: "loan",
    repaymentPeriod: "12",
    motivation: "",
  });

  const tabs = [
    { id: "opportunities", label: "Opportunities" },
    { id: "applications", label: "My Applications" },
    { id: "history", label: "Funding History" },
  ];

  const statuses = ["Submitted", "Verified", "Under Review", "Offer", "Funded"];

  // Get status color
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      "New": "bg-gray-100 text-gray-700",
      "Reviewing": "bg-blue-100 text-blue-700",
      "Under Review": "bg-yellow-100 text-yellow-700",
      "Offer": "bg-purple-100 text-purple-700",
      "Funded": "bg-emerald-100 text-emerald-700",
    };
    return colors[status] || "bg-gray-100 text-gray-700";
  };

  const handleSubmitApplication = () => {
    if (!formData.amount || !formData.purpose || !formData.motivation) {
      alert("Please fill in all fields");
      return;
    }

    const newApplication: FundingApplication = {
      id: `IMB-${Math.floor(1000 + Math.random() * 9000)}`,
      amount: formData.amount,
      purpose: formData.purpose,
      submitted: new Date().toLocaleDateString('en-ZA', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: "New",
      progress: 1,
    };

    setApplications([newApplication, ...applications]);
    setShowRequestForm(false);
    setFormData({
      amount: "",
      purpose: "",
      fundingType: "loan",
      repaymentPeriod: "12",
      motivation: "",
    });
    alert("✅ Funding application submitted successfully!");
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Funding</h1>
          <button 
            onClick={() => setShowRequestForm(!showRequestForm)}
            className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:opacity-90 transition text-sm font-medium"
          >
            {showRequestForm ? "Cancel" : "Request Funding"}
          </button>
        </div>

        {/* Funding Readiness */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-lg border border-emerald-200 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Your Funding Readiness</p>
              <p className="text-3xl font-bold text-emerald-600">82%</p>
              <p className="text-sm text-emerald-600 mt-1">You may qualify for funding</p>
            </div>
            <div className="text-center">
              <div className="text-4xl">🎯</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-gray-200 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 px-1 text-sm font-medium transition ${
                activeTab === tab.id
                  ? "text-emerald-600 border-b-2 border-emerald-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Applications */}
        <div className="space-y-4">
          {applications.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-3">📋</div>
              <p>No funding applications yet</p>
              <button 
                onClick={() => setShowRequestForm(true)}
                className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition text-sm"
              >
                Submit your first application
              </button>
            </div>
          ) : (
            applications.map((app) => (
              <div key={app.id} className="border border-gray-200 rounded-lg p-4 hover:border-emerald-300 transition">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                  <div>
                    <p className="font-semibold text-gray-800">{app.id}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-sm text-gray-600">💰 {app.amount}</span>
                      <span className="text-sm text-gray-600">📋 {app.purpose}</span>
                      <span className="text-xs text-gray-400">📅 {app.submitted}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(app.status)}`}>
                      {app.status}
                    </span>
                    <button 
                      onClick={() => alert(`Viewing details for ${app.id}`)}
                      className="px-3 py-1 text-sm text-emerald-600 hover:bg-emerald-50 rounded transition"
                    >
                      View →
                    </button>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mt-3">
                  <div className="flex items-center gap-2">
                    {statuses.map((status, index) => (
                      <div key={status} className="flex items-center">
                        <div className={`h-2 w-8 rounded-full ${
                          index < app.progress ? "bg-emerald-500" : "bg-gray-200"
                        }`}></div>
                        <span className={`text-[10px] ${
                          index < app.progress ? "text-emerald-600" : "text-gray-400"
                        }`}>
                          {status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Request Form */}
        {showRequestForm && (
          <div className="mt-6 p-6 border-2 border-emerald-200 rounded-lg bg-emerald-50">
            <h3 className="font-semibold text-gray-800 mb-4">Request Funding</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount Required <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. R50,000"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Purpose of Funding <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.purpose}
                  onChange={(e) => setFormData({...formData, purpose: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="">Select purpose</option>
                  <option value="Inventory">Inventory</option>
                  <option value="Equipment">Equipment</option>
                  <option value="Expansion">Expansion</option>
                  <option value="Working Capital">Working Capital</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Funding Type
                </label>
                <select
                  value={formData.fundingType}
                  onChange={(e) => setFormData({...formData, fundingType: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="loan">Loan</option>
                  <option value="equity">Equity</option>
                  <option value="grant">Grant</option>
                  <option value="investment">Investment</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Repayment Period (months)
                </label>
                <select
                  value={formData.repaymentPeriod}
                  onChange={(e) => setFormData({...formData, repaymentPeriod: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="6">6 months</option>
                  <option value="12">12 months</option>
                  <option value="24">24 months</option>
                  <option value="36">36 months</option>
                  <option value="48">48 months</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Motivation <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Why do you need this funding? How will it help your business grow?"
                  value={formData.motivation}
                  onChange={(e) => setFormData({...formData, motivation: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={handleSubmitApplication}
                className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-lg hover:opacity-90 transition"
              >
                Submit Request
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}