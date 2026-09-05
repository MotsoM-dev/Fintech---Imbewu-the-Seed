"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function EntrepreneurLayout({ children }: { children: React.ReactNode }) {
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
    await signOut({ callbackUrl: "/auth/signin" });
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className={`${sidebarOpen ? "w-64" : "w-20"} bg-white border-r border-gray-200 min-h-screen transition-all duration-300 fixed left-0 top-0 z-40`}>
        <div className="p-4 border-b border-gray-200 flex items-center gap-2">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          {sidebarOpen && <span className="text-xl font-bold text-gray-800">Imbewu</span>}
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${
                pathname === item.href ? "bg-emerald-50 text-emerald-700" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 p-4 w-full border-t border-gray-200 space-y-2">
          <button onClick={handleLogout} className="w-full px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm text-left flex items-center gap-2">
            <span>🚪</span>
            {sidebarOpen && <span>Logout</span>}
          </button>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="w-full px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-sm">
            {sidebarOpen ? "◀ Collapse" : "▶"}
          </button>
        </div>
      </div>

      <div className={`${sidebarOpen ? "ml-64" : "ml-20"} flex-1 transition-all duration-300`}>
        {children}
      </div>
    </div>
  );
}