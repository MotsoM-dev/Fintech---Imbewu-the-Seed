"use client";

import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { FunderStateProvider, useFunderState } from "./FunderState";
import "./funder.css";

type FunderIconName = "dashboard" | "discover" | "applications" | "portfolio" | "messages" | "business" | "profile" | "alerts" | "theme" | "logout" | "collapse" | "expand";

function FunderIcon({ name }: { name: FunderIconName }) {
  const common = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (name === "dashboard") return <svg {...common}><path d="M4 13h6V4H4z" /><path d="M14 20h6V4h-6z" /><path d="M4 20h6v-3H4z" /></svg>;
  if (name === "discover") return <svg {...common}><path d="M12 21s6-5.7 6-11a6 6 0 1 0-12 0c0 5.3 6 11 6 11z" /><circle cx="12" cy="10" r="2.2" /></svg>;
  if (name === "applications") return <svg {...common}><path d="M7 3h7l5 5v13H7z" /><path d="M14 3v5h5" /><path d="M10 13h6M10 17h4" /></svg>;
  if (name === "portfolio") return <svg {...common}><path d="M4 7h16v13H4z" /><path d="M9 7V5a3 3 0 0 1 6 0v2" /></svg>;
  if (name === "messages") return <svg {...common}><path d="M21 12a8 8 0 0 1-8 8H7l-4 3v-7a8 8 0 1 1 18-4z" /><path d="M8 11h8M8 15h5" /></svg>;
  if (name === "business") return <svg {...common}><path d="M4 10h16l-1-5H5z" /><path d="M6 10v10h12V10" /><path d="M9 20v-5h6v5" /></svg>;
  if (name === "profile") return <svg {...common}><path d="M20 21a8 8 0 0 0-16 0" /><path d="M12 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10z" /></svg>;
  if (name === "alerts") return <svg {...common}><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></svg>;
  if (name === "theme") return <svg {...common}><path d="M12 3a9 9 0 1 0 9 9c-4.5 1.5-9-3-9-9z" /></svg>;
  if (name === "logout") return <svg {...common}><path d="M10 17l5-5-5-5" /><path d="M15 12H3" /><path d="M21 5v14a2 2 0 0 1-2 2h-5" /></svg>;
  if (name === "collapse") return <svg {...common}><path d="M15 18l-6-6 6-6" /></svg>;
  return <svg {...common}><path d="M9 18l6-6-6-6" /></svg>;
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

function FunderLayoutContent({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [alertsOpen, setAlertsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: "ready-review", title: "Khula Foods is ready", text: "All evidence checks are complete. You can make a community funding decision.", tone: "green" },
    { id: "new-nearby", title: "New nearby opportunity", text: "Sisonke Repair Co-op requested R18,000 for tools and parts inventory.", tone: "blue" },
    { id: "impact", title: "Impact signal", text: "Your watchlist businesses now support 12 local jobs.", tone: "gold" },
  ]);
  const { profile } = useFunderState();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth/signin");
  }, [status, router]);

  const navItems: { icon: FunderIconName; label: string; href: string }[] = [
    { icon: "dashboard", label: "Dashboard", href: "/funder/dashboard" },
    { icon: "discover", label: "Discover", href: "/funder/discover" },
    { icon: "applications", label: "Requests", href: "/funder/application" },
    { icon: "portfolio", label: "Portfolio", href: "/funder/portfolio" },
    { icon: "messages", label: "Messages", href: "/funder/messages" },
  ];

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") return null;

  const unreadCount = notifications.length;

  return (
    <div className="funder-shell" data-theme={theme}>
      <aside className={`funder-sidebar ${sidebarOpen ? "" : "funder-sidebar-collapsed"}`}>
        <Link href="/" className="funder-brand" aria-label="Go to Imbewu landing page">
          <span className="funder-logo"><ImbewuMark /></span>
          {sidebarOpen ? <span><strong>Imbewu</strong><span>Investor workspace</span></span> : null}
        </Link>
        <div className="funder-user">
          <div className="funder-avatar">{profile.name.charAt(0) || "F"}</div>
          {sidebarOpen ? <div><p>{profile.name}</p><small>{profile.funderType} workspace</small></div> : null}
        </div>
        <nav className="funder-nav" aria-label="Funder navigation">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return <Link key={item.href} href={item.href} data-active={active} aria-current={active ? "page" : undefined}><span className="funder-nav-icon"><FunderIcon name={item.icon} /></span>{sidebarOpen ? <span className="funder-nav-label">{item.label}</span> : null}</Link>;
          })}
        </nav>
        <div className="funder-actions">
          <button onClick={() => signOut({ callbackUrl: "/auth/signin" })} className="funder-logout"><FunderIcon name="logout" />{sidebarOpen ? <span>Logout</span> : null}</button>
          <button onClick={() => setSidebarOpen((open) => !open)} className="funder-collapse"><FunderIcon name={sidebarOpen ? "collapse" : "expand"} />{sidebarOpen ? <span>Collapse</span> : null}</button>
        </div>
      </aside>
      <main className={`funder-main ${sidebarOpen ? "" : "funder-main-collapsed"}`}>
        <header className="funder-topbar">
          <div>
            <span className="funder-live-dot" />
            <strong>{profile.accountName}</strong>
            <small>{profile.funderType} | {profile.province}</small>
          </div>
          <div className="funder-topbar-actions">
            <button className="funder-icon-button" onClick={() => setAlertsOpen((open) => !open)} aria-label="Open alerts" title="Alerts">
              <FunderIcon name="alerts" />
              {unreadCount ? <span className="funder-alert-dot">{unreadCount}</span> : null}
            </button>
            {alertsOpen ? (
              <div className="funder-alert-popover">
                <div className="funder-alert-head">
                  <div><strong>Signal Center</strong><span>{unreadCount ? `${unreadCount} live updates` : "All clear"}</span></div>
                  {unreadCount ? <button onClick={() => setNotifications([])}>Clear</button> : null}
                </div>
                {notifications.length ? notifications.map((notification) => (
                  <article className={`funder-alert-item funder-alert-${notification.tone}`} key={notification.id}>
                    <div><strong>{notification.title}</strong><p>{notification.text}</p></div>
                    <button onClick={() => setNotifications((current) => current.filter((item) => item.id !== notification.id))}>Done</button>
                  </article>
                )) : <p className="funder-alert-empty">Nothing needs your attention right now.</p>}
              </div>
            ) : null}
            <button className="funder-icon-button" onClick={() => setTheme((value) => value === "light" ? "dark" : "light")} aria-label="Toggle light and dark mode" title="Light / dark mode">
              <FunderIcon name="theme" />
            </button>
            <Link href="/funder/profile" className="funder-profile-chip" aria-label="Open funder profile">
              <span><FunderIcon name="profile" /></span>
              <div><strong>{profile.name}</strong><small>{profile.funderType} profile</small></div>
            </Link>
          </div>
        </header>
        <div className="funder-page">{children}</div>
      </main>
    </div>
  );
}

export default function FunderLayout({ children }: { children: React.ReactNode }) {
  return <FunderStateProvider><FunderLayoutContent>{children}</FunderLayoutContent></FunderStateProvider>;
}
