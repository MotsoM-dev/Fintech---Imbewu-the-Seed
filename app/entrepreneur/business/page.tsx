// app/entrepreneur/business/page.tsx
"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BusinessPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const user = session?.user as any;

  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "products", label: "Products" },
    { id: "history", label: "Trading History" },
    { id: "milestones", label: "Milestones" },
  ];

  const handleEditProfile = () => {
    router.push("/entrepreneur/profile");
  };

  const handleAddProduct = () => {
    router.push("/entrepreneur/business/products");
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">{user?.businessName || "Your Business"}</h1>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">VERIFIED ✓</span>
            </div>
            <p className="text-gray-500">{user?.industry || "Industry not set"} • {user?.businessLocation || "Location not set"}</p>
          </div>
          <button 
            onClick={handleEditProfile}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition text-sm font-medium cursor-pointer"
          >
            Edit Profile
          </button>
        </div>

        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Profile Completeness</span>
            <span className="text-sm font-medium text-emerald-600">85%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2.5 rounded-full" style={{ width: "85%" }}></div>
          </div>
        </div>

        <div className="flex gap-6 mt-6 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 px-1 text-sm font-medium transition cursor-pointer ${
                activeTab === tab.id
                  ? "text-emerald-600 border-b-2 border-emerald-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">About</h3>
                <p className="text-gray-600">
                  {user?.businessDescription || "No business description provided yet."}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Founded</p>
                  <p className="font-semibold text-gray-900">2023</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Employees</p>
                  <p className="font-semibold text-gray-900">{user?.employeeCount || "N/A"}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Trading</p>
                  <p className="font-semibold text-gray-900">{user?.yearsInOperation || "N/A"}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "products" && (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-3">📦</div>
              <p>Add your products and services</p>
              <button 
                onClick={handleAddProduct}
                className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition text-sm cursor-pointer"
              >
                + Add Product
              </button>
            </div>
          )}

          {activeTab === "history" && (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-3">📊</div>
              <p>Your trading history will appear here</p>
            </div>
          )}

          {activeTab === "milestones" && (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-3">🏆</div>
              <p>Track your business milestones</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}