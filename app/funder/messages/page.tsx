"use client";

import { useState } from "react";
import { GlassCard, PageHero, StatCard } from "../FunderUI";

const conversations = [
  { id: "1", sender: "Khula Foods", initials: "KF", type: "Business", subject: "Cold storage proof uploaded", preview: "We added supplier quotes and August bank activity for your review.", time: "2 hours ago", unread: true, tone: "green" },
  { id: "2", sender: "Sisonke Repair Co-op", initials: "SR", type: "Milestone", subject: "Tool purchase milestone", preview: "The cooperative shared photos of the first tool batch.", time: "1 day ago", unread: false, tone: "blue" },
  { id: "3", sender: "Nomsa School Uniforms", initials: "NS", type: "Offer", subject: "Offer questions", preview: "Nomsa wants clarity on repayment dates before accepting.", time: "2 days ago", unread: false, tone: "gold" },
];

export default function MessagesPage() {
  const [selectedId, setSelectedId] = useState(conversations[0].id);
  const selected = conversations.find((conversation) => conversation.id === selectedId) || conversations[0];

  return (
    <>
      <PageHero eyebrow="Messages" title="Investor conversations with momentum." description="A signal-rich inbox for funding decisions, milestone updates, business questions, and partner follow-ups." />
      <div className="funder-grid funder-grid-3">
        <StatCard label="Unread" value={String(conversations.filter((conversation) => conversation.unread).length)} note="Needs your attention" tone="green" />
        <StatCard label="Milestones" value="4" note="Updates this week" tone="blue" />
        <StatCard label="Response health" value="Fast" note="Average reply under 3h" tone="gold" />
      </div>
      <GlassCard className="funder-message-shell">
        <aside className="funder-message-list">
          <div className="funder-message-list-head"><span className="funder-section-kicker">Inbox</span><h2>Signals</h2></div>
          {conversations.map((conversation) => (
            <button className={`funder-message-card funder-message-${conversation.tone}`} data-active={selectedId === conversation.id} onClick={() => setSelectedId(conversation.id)} key={conversation.id}>
              <span className="funder-message-avatar">{conversation.initials}</span>
              <span><strong>{conversation.sender}</strong><small>{conversation.subject}</small><em>{conversation.preview}</em></span>
              <time>{conversation.time}</time>
              {conversation.unread ? <b>New</b> : null}
            </button>
          ))}
        </aside>
        <section className="funder-message-thread">
          <div className="funder-message-thread-head">
            <div className="funder-message-avatar large">{selected.initials}</div>
            <div><span className="funder-section-kicker">{selected.type}</span><h2>{selected.sender}</h2><p>{selected.subject}</p></div>
          </div>
          <div className="funder-message-bubbles">
            <article className="funder-bubble incoming"><strong>{selected.sender}</strong><p>{selected.preview}</p><time>{selected.time}</time></article>
            <article className="funder-bubble outgoing"><strong>You</strong><p>Thanks. I’m reviewing the request alongside the business performance and linked account details.</p><time>Just now</time></article>
            <article className="funder-bubble incoming accent"><strong>Imbewu Signal</strong><p>This conversation is linked to a funded or active request, so the message history stays attached to investor diligence.</p></article>
          </div>
          <form className="funder-message-compose" onSubmit={(event) => event.preventDefault()}>
            <input placeholder={`Reply to ${selected.sender}...`} />
            <button>Send</button>
          </form>
        </section>
      </GlassCard>
    </>
  );
}
