// app/entrepreneur/finances/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FinancesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "sales", label: "Sales" },
    { id: "expenses", label: "Expenses" },
    { id: "cashflow", label: "Cash Flow" },
  ];

  const stats = {
    revenue: "R24,500",
    expenses: "R8,200",
    net: "R16,300",
  };

  const transactions = [
    { date: "04 Sep", description: "Product Sales", type: "sale", amount: "+R1,400" },
    { date: "03 Sep", description: "Stock Purchase", type: "expense", amount: "-R650" },
    { date: "02 Sep", description: "Product Sales", type: "sale", amount: "+R2,100" },
    { date: "01 Sep", description: "Delivery Service", type: "expense", amount: "-R350" },
  ];

  const handleAddTransaction = () => {
    router.push("/entrepreneur/finances/add-transaction");
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Finances</h1>
          <button 
            onClick={handleAddTransaction}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition text-sm font-medium cursor-pointer"
          >
            + Add Transaction
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Revenue</p>
            <p className="text-2xl font-bold text-gray-900">{stats.revenue}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Expenses</p>
            <p className="text-2xl font-bold text-red-600">{stats.expenses}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Net</p>
            <p className="text-2xl font-bold text-emerald-600">{stats.net}</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-8 mb-6 text-center">
          <p className="text-gray-400">Revenue vs Expenses Chart</p>
          <div className="h-32 flex items-center justify-center text-sm text-gray-500">
            📊 Chart will appear here
          </div>
        </div>

        <div className="flex gap-6 border-b border-gray-200 mb-6">
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

        <div className="space-y-3">
          <h3 className="font-semibold text-gray-800 mb-3">Recent Transactions</h3>
          {transactions.map((transaction, index) => (
            <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100">
              <div>
                <p className="text-sm font-medium text-gray-800">{transaction.description}</p>
                <p className="text-xs text-gray-400">{transaction.date}</p>
              </div>
              <span className={`text-sm font-semibold ${transaction.type === "sale" ? "text-emerald-600" : "text-red-600"}`}>
                {transaction.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}