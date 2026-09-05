// app/funder/layout.tsx
"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function FunderLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  const navItems = [
    { icon: "📊", label: "Dashboard", href: "/funder/dashboard" },
    { icon: "🔍", label: "Discover", href: "/funder/discover" },
    { icon: "📋", label: "Applications", href: "/funder/applications" },
    { icon: "💼", label: "Portfolio", href: "/funder/portfolio" },
    { icon: "💬", label: "Messages", href: "/funder/messages" },
    { icon: "📈", label: "Reports", href: "/funder/reports" },
    { icon: "👤", label: "Profile", href: "/funder/profile" },
  ];

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/auth/signin" });
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  const user = session?.user as any;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? "w-64" : "w-20"} bg-white border-r border-gray-200 min-h-screen transition-all duration-300 fixed left-0 top-0 z-40 flex flex-col`}>
        <div className="p-4 border-b border-gray-200 flex items-center gap-2">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          {sidebarOpen && (
            <span className="text-xl font-bold text-gray-800">Imbewu</span>
          )}
        </div>

        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3 px-2">
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-medium text-blue-700">
              {user?.name?.charAt(0) || "F"}
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{user?.name || "Funder"}</p>
                <p className="text-xs text-gray-500 truncate">Funder</p>
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${
                pathname === item.href
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span className="text-xl flex-shrink-0">{item.icon}</span>
              {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200 space-y-2">
          <button
            onClick={handleLogout}
            className="w-full px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm flex items-center gap-2 transition"
          >
            <span>🚪</span>
            {sidebarOpen && <span>Logout</span>}
          </button>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-sm transition"
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