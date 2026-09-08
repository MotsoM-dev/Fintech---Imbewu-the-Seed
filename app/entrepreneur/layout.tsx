"use client";

import Link from "next/link";
import { SessionProvider, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BusinessStateProvider, useBusinessState } from "./BusinessState";
import "./entrepreneur.css";
import { useTheme } from "../useTheme";

type IconName = "dashboard" | "finances" | "documents" | "funding" | "storefront" | "user" | "chat" | "alerts" | "theme" | "logout" | "collapse" | "expand";

const navItems: { icon: IconName; label: string; href: string; hint: string }[] = [
  { icon: "dashboard", label: "Dashboard", href: "/entrepreneur/dashboard", hint: "Overview" },
  { icon: "finances", label: "Finances", href: "/entrepreneur/finances", hint: "Money" },
  { icon: "documents", label: "Documents", href: "/entrepreneur/documents", hint: "Proof" },
  { icon: "funding", label: "Funding", href: "/entrepreneur/funding", hint: "Capital" },
  { icon: "storefront", label: "Storefront", href: "/entrepreneur/storefront", hint: "Customers" },
];

function WorkspaceIcon({ name }: { name: IconName }) {
  const common = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (name === "dashboard") return <svg {...common}><path d="M4 13h6V4H4z" /><path d="M14 20h6V4h-6z" /><path d="M4 20h6v-3H4z" /></svg>;
  if (name === "finances") return <svg {...common}><path d="M4 18V6" /><path d="M8 18v-5" /><path d="M12 18V9" /><path d="M16 18v-8" /><path d="M20 18V4" /></svg>;
  if (name === "documents") return <svg {...common}><path d="M7 3h7l5 5v13H7z" /><path d="M14 3v5h5" /><path d="M10 13h6M10 17h4" /></svg>;
  if (name === "funding") return <svg {...common}><path d="M12 3v18" /><path d="M17 7.5c0-1.7-2.2-3-5-3s-5 1.3-5 3 2.2 3 5 3 5 1.3 5 3-2.2 3-5 3-5-1.3-5-3" /></svg>;
  if (name === "storefront") return <svg {...common}><path d="M4 10h16l-1-5H5z" /><path d="M6 10v10h12V10" /><path d="M9 20v-5h6v5" /></svg>;
  if (name === "user") return <svg {...common}><path d="M20 21a8 8 0 0 0-16 0" /><path d="M12 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10z" /></svg>;
  if (name === "chat") return <svg {...common}><path d="M21 12a8 8 0 0 1-8 8H7l-4 3v-7a8 8 0 1 1 18-4z" /><path d="M8 11h8M8 15h5" /></svg>;
  if (name === "alerts") return <svg {...common}><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></svg>;
  if (name === "theme") return <svg {...common}><path d="M12 3a9 9 0 1 0 9 9c-4.5 1.5-9-3-9-9z" /></svg>;
  if (name === "logout") return <svg {...common}><path d="M10 17l5-5-5-5" /><path d="M15 12H3" /><path d="M21 5v14a2 2 0 0 1-2 2h-5" /><path d="M14 3h5a2 2 0 0 1 2 2" /></svg>;
  if (name === "collapse") return <svg {...common}><path d="M15 18l-6-6 6-6" /></svg>;
  if (name === "expand") return <svg {...common}><path d="M9 18l6-6-6-6" /></svg>;
  return null;
}

function ImbewuMark() {
  return (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" aria-hidden="true">
      <path d="M19 33C11.8 28.9 8 23.9 8 18.2C8 11.5 13.1 6.4 19 5C24.9 6.4 30 11.5 30 18.2C30 23.9 26.2 28.9 19 33Z" stroke="currentColor" strokeWidth="2.4" />
      <path d="M19 30V12" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M19 20C22.9 18.9 25.2 16.5 26.4 12.8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M19 24C15.4 22.9 13.1 20.8 11.6 17.6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

function EntrepreneurLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { theme, toggleTheme } = useTheme();
  const [alertsOpen, setAlertsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: "documents", title: "Document proof improved", text: "Bank Statement - August is verified and visible to funders.", tone: "green" },
    { id: "storefront", title: "Storefront score jumped", text: `Your storefront score is now ${91}%. Keep products fresh to hold the signal.`, tone: "blue" },
    { id: "funding", title: "Funding readiness tip", text: "Upload this month bank statement to strengthen cashflow confidence.", tone: "gold" },
  ]);
  const accountState = useBusinessState();
  const unreadCount = notifications.length;

  return (
    <div className="entrepreneur-shell" data-theme={theme}>
      <aside className={`entrepreneur-sidebar ${sidebarOpen ? "" : "entrepreneur-sidebar-collapsed"}`}>
        <Link href="/" className="entrepreneur-brand home-brand" aria-label="Go to Imbewu landing page">
          <span className="entrepreneur-logo imbewu-wordmark-symbol"><ImbewuMark /></span>
          {sidebarOpen ? <span className="entrepreneur-brand-text imbewu-wordmark-copy"><strong>Imbewu</strong><span>Account workspace</span></span> : null}
        </Link>

        <nav className="entrepreneur-nav" aria-label="Account navigation">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} data-active={isActive} aria-current={isActive ? "page" : undefined} title={item.label}>
                <span className="entrepreneur-nav-icon"><WorkspaceIcon name={item.icon} /></span>
                {sidebarOpen ? <span className="entrepreneur-nav-copy"><span className="entrepreneur-nav-label">{item.label}</span><small>{item.hint}</small></span> : null}
              </Link>
            );
          })}
        </nav>

        <div className="entrepreneur-sidebar-actions">
          <button className="entrepreneur-logout" onClick={() => signOut({ callbackUrl: "/auth/signin" })} title="Log out" aria-label="Log out">
            <WorkspaceIcon name="logout" />
            {sidebarOpen ? <span>Logout</span> : null}
          </button>
          <button className="entrepreneur-collapse" onClick={() => setSidebarOpen((open) => !open)} title={sidebarOpen ? "Collapse workspace" : "Open workspace"} aria-label={sidebarOpen ? "Collapse workspace" : "Open workspace"}>
            <WorkspaceIcon name={sidebarOpen ? "collapse" : "expand"} />
            {sidebarOpen ? <span>Collapse</span> : null}
          </button>
        </div>
      </aside>

      <main className={`entrepreneur-main ${sidebarOpen ? "" : "entrepreneur-main-collapsed"}`}>
        <header className="entrepreneur-topbar">
          <div><span className="entrepreneur-live-dot" /><strong>{accountState.business.name}</strong><small>{accountState.business.location}</small></div>
          <div className="entrepreneur-topbar-actions">
            <button className="entrepreneur-icon-button" onClick={() => setAlertsOpen((open) => !open)} aria-label="Open alerts" title="Alerts">
              <WorkspaceIcon name="alerts" />
              {unreadCount ? <span className="entrepreneur-alert-dot">{unreadCount}</span> : null}
            </button>
            {alertsOpen ? (
              <div className="entrepreneur-alert-popover">
                <div className="entrepreneur-alert-head">
                  <div><strong>Growth Signals</strong><span>{unreadCount ? `${unreadCount} new updates` : "All clear"}</span></div>
                  {unreadCount ? <button onClick={() => setNotifications([])}>Clear</button> : null}
                </div>
                {notifications.length ? notifications.map((notification) => (
                  <article className={`entrepreneur-alert-item entrepreneur-alert-${notification.tone}`} key={notification.id}>
                    <div><strong>{notification.title}</strong><p>{notification.text}</p></div>
                    <button onClick={() => setNotifications((current) => current.filter((item) => item.id !== notification.id))}>Done</button>
                  </article>
                )) : <p className="entrepreneur-alert-empty">Nothing needs your attention right now.</p>}
              </div>
            ) : null}
            <button className="entrepreneur-icon-button" onClick={toggleTheme} aria-label="Toggle light and dark mode" title="Light / dark mode">
              <WorkspaceIcon name="theme" />
            </button>
            <Link href="/entrepreneur/business" className="entrepreneur-profile-chip" aria-label="Open profile and business evidence">
              <span><WorkspaceIcon name="user" /></span>
              <div><strong>{accountState.account.ownerName}</strong><small>Profile & evidence</small></div>
            </Link>
            <Link href="/entrepreneur/chat" className="entrepreneur-chat-chip" aria-label="Open assistant chat"><WorkspaceIcon name="chat" /></Link>
          </div>
        </header>
        <div className="entrepreneur-page">{children}</div>
      </main>
    </div>
  );
}

export default function EntrepreneurLayout({ children }: { children: React.ReactNode }) {
  return <SessionProvider><BusinessStateProvider><EntrepreneurLayoutContent>{children}</EntrepreneurLayoutContent></BusinessStateProvider></SessionProvider>;
}
