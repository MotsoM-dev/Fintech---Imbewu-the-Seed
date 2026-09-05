// app/entrepreneur/layout.tsx
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSession, SessionProvider } from "next-auth/react";
import { useState } from "react";

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

function EntrepreneurLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const user = session?.user as any;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? "w-64" : "w-20"} bg-white border-r border-gray-200 min-h-screen transition-all duration-300 fixed left-0 top-0 z-40 flex flex-col`}>
        <div className="p-4 border-b border-gray-200 flex items-center gap-2">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0">
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          {sidebarOpen && <span className="text-xl font-bold text-gray-800">Imbewu</span>}
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${
                  isActive
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span className="text-xl flex-shrink-0">{item.icon}</span>
                {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-sm font-medium text-emerald-700">
              {user?.name?.charAt(0) || "E"}
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{user?.name || "Entrepreneur"}</p>
                <p className="text-xs text-gray-500 truncate">Entrepreneur</p>
              </div>
            )}
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-sm mt-2"
          >
            {sidebarOpen ? "◀ Collapse" : "▶"}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`${sidebarOpen ? "ml-64" : "ml-20"} flex-1 transition-all duration-300`}>
        {children}
      </div>
    </div>
  );
}

// Wrap with SessionProvider
export default function EntrepreneurLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <EntrepreneurLayoutContent>{children}</EntrepreneurLayoutContent>
    </SessionProvider>
  );
}