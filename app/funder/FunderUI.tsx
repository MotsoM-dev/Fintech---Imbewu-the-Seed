"use client";

export function PageHero({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children?: React.ReactNode }) {
  return (
    <section className="funder-hero">
      <div>
        <p className="funder-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {children ? <div className="funder-hero-actions">{children}</div> : null}
    </section>
  );
}

export function StatCard({ label, value, note, tone = "green" }: { label: string; value: string; note: string; tone?: "blue" | "green" | "gold" | "purple" | "red" }) {
  return (
    <article className={`funder-stat funder-stat-${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
      <p>{note}</p>
    </article>
  );
}

export function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`funder-card ${className}`}>{children}</section>;
}

export function EmptyState({ icon, title, text, children }: { icon: string; title: string; text: string; children?: React.ReactNode }) {
  return (
    <div className="funder-empty">
      <div>{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
      {children}
    </div>
  );
}
