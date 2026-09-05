// app/entrepreneur/dashboard/page.tsx
"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function EntrepreneurDashboard() {
  const { data: session } = useSession();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const user = session?.user as any;

  // Get data from localStorage or use defaults
  const getDashboardData = () => {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem('entrepreneur_dashboard');
      if (data) return JSON.parse(data);
    }
    return {
      revenue: "R24,500",
      expenses: "R8,200",
      profit: "R16,300",
      readiness: 72,
    };
  };

  const stats = getDashboardData();

  const recentTransactions = [
    { date: "04 Sep", description: "Product Sales", type: "sale", amount: "+R1,400" },
    { date: "03 Sep", description: "Stock Purchase", type: "expense", amount: "-R650" },
    { date: "02 Sep", description: "Product Sales", type: "sale", amount: "+R2,100" },
  ];

  const tasks = [
    { title: "Business profile", completed: true },
    { title: "Upload registration", completed: true },
    { title: "Record 30 days of sales", completed: false },
    { title: "Upload latest bank statement", completed: false },
  ];

  const navItems = [
    { icon: "📊", label: "Dashboard", href: "/entrepreneur/dashboard" },
    { icon: "🏢", label: "My Business", href: "/entrepreneur/business" },
    { icon: "💰", label: "Finances", href: "/entrepreneur/finances" },
    { icon: "📄", label: "Documents", href: "/entrepreneur/documents" },
    { icon: "🎯", label: "Funding", href: "/entrepreneur/funding" },
    { icon: "🏪", label: "Storefront", href: "/entrepreneur/storefront" },
    { icon: "💬", label: "Messages", href: "/entrepreneur/messages" },
    { icon: "👤", label: "Profile", href: "/entrepreneur/profile" },
  ];

  const handleLogout = async () => {
    // Clear session and redirect
    localStorage.removeItem('imbewu_user');
    router.push("/auth/signin");
  };

  // Quick action handlers
  const handleRecordSale = () => {
    router.push("/entrepreneur/finances?action=add-sale");
  };

  const handleRecordExpense = () => {
    router.push("/entrepreneur/finances?action=add-expense");
  };

  const handleUploadReceipt = () => {
    router.push("/entrepreneur/documents");
  };

  const handleRequestFunding = () => {
    router.push("/entrepreneur/funding");
  };

  const handleViewAllActivity = () => {
    router.push("/entrepreneur/finances");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? "w-64" : "w-20"} bg-white border-r border-gray-200 min-h-screen transition-all duration-300 fixed left-0 top-0 z-40`}>
        <div className="p-4 border-b border-gray-200 flex items-center gap-2">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          {sidebarOpen && (
            <span className="text-xl font-bold text-gray-800">Imbewu</span>
          )}
        </div>
        
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${
                item.href === "/entrepreneur/dashboard"
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 p-4 w-full border-t border-gray-200">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-sm"
          >
            {sidebarOpen ? "◀ Collapse" : "▶"}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`${sidebarOpen ? "ml-64" : "ml-20"} flex-1 p-8 transition-all duration-300`}>
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Good {new Date().getHours() < 12 ? "Morning" : new Date().getHours() < 18 ? "Afternoon" : "Evening"}, {user?.name || "Entrepreneur"}! 👋
            </h1>
            <p className="text-gray-500 text-sm">
              {new Date().toLocaleDateString("en-ZA", { 
                weekday: "long", 
                day: "numeric", 
                month: "long", 
                year: "numeric" 
              })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition relative">
              🔔
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            <button onClick={handleLogout} className="px-4 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition">
              Logout
            </button>
          </div>
        </div>

        {/* Stats - All Clickable */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div 
            onClick={() => router.push("/entrepreneur/finances")}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-emerald-300 transition cursor-pointer hover:shadow-md"
          >
            <p className="text-sm text-gray-500">Revenue</p>
            <p className="text-2xl font-bold text-gray-900">{stats.revenue}</p>
            <p className="text-xs text-gray-400 mt-1">Click to view details →</p>
          </div>
          <div 
            onClick={() => router.push("/entrepreneur/finances")}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-red-300 transition cursor-pointer hover:shadow-md"
          >
            <p className="text-sm text-gray-500">Expenses</p>
            <p className="text-2xl font-bold text-red-600">{stats.expenses}</p>
            <p className="text-xs text-gray-400 mt-1">Click to view details →</p>
          </div>
          <div 
            onClick={() => router.push("/entrepreneur/finances")}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-emerald-300 transition cursor-pointer hover:shadow-md"
          >
            <p className="text-sm text-gray-500">Net</p>
            <p className="text-2xl font-bold text-emerald-600">{stats.profit}</p>
            <p className="text-xs text-gray-400 mt-1">Click to view details →</p>
          </div>
          <div 
            onClick={() => router.push("/entrepreneur/funding")}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-blue-300 transition cursor-pointer hover:shadow-md"
          >
            <p className="text-sm text-gray-500">Readiness Score</p>
            <p className="text-2xl font-bold text-blue-600">{stats.readiness}%</p>
            <p className="text-xs text-gray-400 mt-1">Click to apply for funding →</p>
          </div>
        </div>

        {/* Funding Readiness - Clickable */}
        <div 
          onClick={() => router.push("/entrepreneur/funding")}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8 hover:border-emerald-300 transition cursor-pointer hover:shadow-md"
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-gray-800">Funding Readiness</h3>
            <span className="text-sm font-medium text-emerald-600">{stats.readiness}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2.5 rounded-full" style={{ width: `${stats.readiness}%` }}></div>
          </div>
          <p className="text-xs text-emerald-600 mt-2 text-right">Click to view funding opportunities →</p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tasks */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-800">Complete These Next</h3>
              <button 
                onClick={() => router.push("/entrepreneur/business")}
                className="text-xs text-emerald-600 hover:text-emerald-700 font-medium"
              >
                View All →
              </button>
            </div>
            <div className="space-y-3">
              {tasks.map((task, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    readOnly
                    className="h-4 w-4 text-emerald-600 border-gray-300 rounded"
                  />
                  <span className={task.completed ? "text-gray-500 line-through" : "text-gray-700"}>
                    {task.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-800">Recent Activity</h3>
              <button 
                onClick={handleViewAllActivity}
                className="text-xs text-emerald-600 hover:text-emerald-700 font-medium"
              >
                View All →
              </button>
            </div>
            <div className="space-y-3">
              {recentTransactions.map((transaction, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{transaction.description}</p>
                    <p className="text-xs text-gray-400">{transaction.date}</p>
                  </div>
                  <span className={`text-sm font-semibold ${
                    transaction.type === "sale" ? "text-emerald-600" : "text-red-600"
                  }`}>
                    {transaction.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
          <p className="text-emerald-100 mb-4">Record your business activity</p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleRecordSale}
              className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition cursor-pointer"
            >
              ➕ Record Sale
            </button>
            <button
              onClick={handleRecordExpense}
              className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition cursor-pointer"
            >
              ➖ Record Expense
            </button>
            <button
              onClick={handleUploadReceipt}
              className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition cursor-pointer"
            >
              📤 Upload Receipt
            </button>
            <button
              onClick={handleRequestFunding}
              className="px-4 py-2 bg-white text-emerald-600 rounded-lg hover:bg-gray-100 transition font-medium cursor-pointer"
            >
              🎯 Request Funding
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}