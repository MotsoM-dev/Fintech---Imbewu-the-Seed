"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GlassCard, PageHero, StatCard } from "../EntrepreneurUI";
import { RegistrationSetup } from "../RegistrationSetup";
import { useBusinessState } from "../BusinessState";

export default function AccountDashboard() {
  const router = useRouter();
  const accountState = useBusinessState();
  const displayName = accountState.account.shortName;
  const businessName = accountState.business.name;
  const metrics = accountState.metrics;
  const [showRegistrationModal, setShowRegistrationModal] = useState(accountState.business.registered === null);
  const retailReminders = [
    { label: "Stock check", title: "Top up fast movers", text: "Grocery staples and fresh produce are leading sales this week. Check stock before the afternoon rush.", metric: `${accountState.salesMix[0].value}% staples` },
    { label: "Sales capture", title: "Record today before close", text: "Add cash, card and delivery sales while the numbers are fresh so your trading record stays funder-ready.", metric: accountState.tasks[2].metric.replace(" of ", "/").replace(" captured", "") },
    { label: "Receipts", title: "Upload supplier slips", text: "Keep stock, packaging and transport receipts attached to expenses for cleaner profit tracking.", metric: "3 due" },
    { label: "Customers", title: "Follow up repeat buyers", text: "Send meal-pack reminders to your regular customers before the weekend order window closes.", metric: `${metrics.repeatCustomers}% repeat` },
  ];

  return (
    <>
      {showRegistrationModal ? <RegistrationSetup variant="modal" onClose={() => setShowRegistrationModal(false)} /> : null}
      <PageHero
        eyebrow="Welcome back"
        title={`Welcome back, ${displayName}. Let’s pick up where we left off...`}
        description={`${businessName} is set up as a ${accountState.business.category.toLowerCase()} business, so today’s focus is stock, sales capture, receipts and repeat customers.`}
      >
        <button className="entrepreneur-button" onClick={() => router.push("/entrepreneur/finances?action=add-sale")}>Record today’s sale</button>
        <button className="entrepreneur-button-secondary" onClick={() => router.push("/entrepreneur/business")}>View business profile</button>
      </PageHero>

      <section className="retail-reminders" aria-label="Retail and sales reminders">
        {retailReminders.map((reminder) => <article className="retail-reminder" key={reminder.label}><span>{reminder.label}</span><strong>{reminder.title}</strong><p>{reminder.text}</p><small>{reminder.metric}</small></article>)}
      </section>

      <div className="entrepreneur-grid entrepreneur-grid-4" style={{ marginTop: "1rem" }}>
        <StatCard label="Monthly revenue" value={metrics.monthlyRevenue} note={`${metrics.growthRate} from last month`} tone="blue" />
        <StatCard label="Net profit" value={metrics.netProfit} note="Healthy trading surplus" tone="green" />
        <StatCard label="Repeat customers" value={`${metrics.repeatCustomers}%`} note="Customers coming back" tone="purple" />
        <StatCard label="Funding readiness" value={`${metrics.readiness}%`} note="Strong candidate signal" tone="gold" />
      </div>

      <div className="entrepreneur-grid entrepreneur-grid-3" style={{ marginTop: "1rem" }}>
        <GlassCard className="entrepreneur-analytics-card">
          <h2>Readiness engine</h2>
          <p>Each bar shows a signal funders care about.</p>
          <div className="entrepreneur-metric-stack">
            {[["Profile strength", metrics.profileStrength], ["Document score", metrics.documentScore], ["Sales consistency", metrics.salesConsistency], ["Storefront quality", metrics.storefrontScore]].map(([label, value]) => <div className="entrepreneur-metric" key={label as string}><div><span>{label}</span><strong>{value}%</strong></div><div className="entrepreneur-progress entrepreneur-progress-tall"><span style={{ width: `${value}%` }} /></div></div>)}
          </div>
        </GlassCard>

        <GlassCard className="entrepreneur-analytics-card">
          <h2>Sales mix</h2>
          <p>What is moving through {businessName} this month.</p>
          <div className="entrepreneur-donut" style={{ "--a": "42%", "--b": "73%", "--c": "91%" } as React.CSSProperties}><span>{metrics.monthlyRevenue}</span><small>Total sales</small></div>
          <div className="entrepreneur-list compact">{accountState.salesMix.map((item) => <div className="entrepreneur-row" key={item.label}><strong>{item.label}</strong><span className="entrepreneur-pill">{item.value}%</span></div>)}</div>
        </GlassCard>

        <GlassCard className="entrepreneur-analytics-card">
          <h2>Business pulse</h2>
          <p>Quick health metrics from daily records.</p>
          <div className="entrepreneur-mini-metrics"><div><span>Avg order</span><strong>{metrics.averageOrder}</strong></div><div><span>Cashflow</span><strong>{metrics.cashflowHealth}%</strong></div><div><span>Expenses</span><strong>{metrics.monthlyExpenses}</strong></div><div><span>Team</span><strong>{accountState.business.employeeCount}</strong></div></div>
        </GlassCard>
      </div>

      <div className="entrepreneur-grid entrepreneur-grid-2" style={{ marginTop: "1rem" }}>
        <GlassCard><h2>Today’s growth path</h2><p>Complete these to turn informal activity into a stronger digital business identity.</p><div className="entrepreneur-list" style={{ marginTop: "1rem" }}>{accountState.tasks.map((task) => <div className="entrepreneur-row task-row" key={task.title}><div><strong>{task.title}</strong><p>{task.metric}</p><div className="entrepreneur-progress"><span style={{ width: `${task.progress}%` }} /></div></div><span className="entrepreneur-pill">{task.completed ? "Complete" : `${task.progress}%`}</span></div>)}</div></GlassCard>
        <GlassCard><h2>Activity pulse</h2><p>Recent records feeding the Imbewu trading story.</p><div className="entrepreneur-list" style={{ marginTop: "1rem" }}>{accountState.transactions.map((tx) => <div className="entrepreneur-row" key={`${tx.date}-${tx.description}`}><div><strong>{tx.description}</strong><p>{tx.date}</p></div><span className={`entrepreneur-pill ${tx.type === "sale" ? "positive" : "negative"}`}>{tx.amount}</span></div>)}</div></GlassCard>
      </div>
    </>
  );
}
