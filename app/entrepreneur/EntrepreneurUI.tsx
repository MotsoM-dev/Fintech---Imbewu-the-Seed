export function PageHero({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children?: React.ReactNode }) {
  return (
    <section className="entrepreneur-hero">
      <div>
        <p className="entrepreneur-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {children ? <div className="entrepreneur-hero-actions">{children}</div> : null}
    </section>
  );
}

export function StatCard({ label, value, note, tone = "blue" }: { label: string; value: string; note: string; tone?: "blue" | "green" | "red" | "gold" | "purple" }) {
  return (
    <article className={`entrepreneur-stat entrepreneur-stat-${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
      <p>{note}</p>
    </article>
  );
}

export function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`entrepreneur-card ${className}`}>{children}</section>;
}

export function EmptyState({ icon, title, text, children }: { icon: string; title: string; text: string; children?: React.ReactNode }) {
  return (
    <div className="entrepreneur-empty">
      <div>{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
      {children}
    </div>
  );
}

