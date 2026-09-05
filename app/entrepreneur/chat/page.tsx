"use client";

import { FormEvent, useMemo, useState } from "react";
import { GlassCard, PageHero } from "../EntrepreneurUI";
import { useBusinessState } from "../BusinessState";

type Message = {
  id: string;
  sender: "assistant" | "user";
  text: string;
  time: string;
};

function nowTime() {
  return new Date().toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit" });
}

function getAssistantReply(message: string, businessName: string) {
  const text = message.toLowerCase();
  if (text.includes("name")) {
    return `Great. I’ll treat “${businessName}” as the preferred name. Next, we should check whether you want a name reservation first or if you want to register immediately and add the name after approval.`;
  }
  if (text.includes("id") || text.includes("director")) {
    return "For each director, prepare full legal name, South African ID number, phone, email, residential address and share/director role details. You can paste the safe non-sensitive parts here and keep ID copies for the evidence upload step.";
  }
  if (text.includes("cost") || text.includes("fee") || text.includes("pay")) {
    return "The transparent breakdown is: CIPC name reservation R50, CIPC private company registration with standard MOI R125, and Imbewu assisted support R500. The prototype marks assisted support as active without processing a real payment.";
  }
  if (text.includes("document") || text.includes("upload") || text.includes("certificate")) {
    return "After registration, upload the CIPC registration certificate, company registration number evidence, director ID copy and bank confirmation letter under Profile & evidence. That strengthens the funding readiness score.";
  }
  if (text.includes("bank")) {
    return "For the bank step, connect or upload a bank confirmation letter under Profile & evidence. In Finances, use Connect your bank to show how deposits and supplier payments will later match your records.";
  }
  return "I’ve noted that. For the next step, tell me whether you want help with the company name, director details, CIPC costs, or the documents Zanele needs to upload after registration.";
}

export default function AssistantChatPage() {
  const accountState = useBusinessState();
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m-1",
      sender: "assistant",
      text: `Hi ${accountState.account.shortName}, your assisted registration support for ${accountState.business.name} is active. I can help with the CIPC route, director details, official fees and evidence checklist.`,
      time: "09:12",
    },
    {
      id: "m-2",
      sender: "user",
      text: `The business name is ${accountState.business.name}.`,
      time: "09:13",
    },
    {
      id: "m-3",
      sender: "assistant",
      text: "Perfect. For a retail and sales business, formal registration helps with supplier accounts, bank credibility, document proof and future funding applications. Let’s prepare the registration path cleanly.",
      time: "09:13",
    },
  ]);

  const checklist = useMemo(() => {
    const allText = messages.map((message) => message.text.toLowerCase()).join(" ");
    return [
      { label: "Preferred company name", done: allText.includes(accountState.business.name.toLowerCase()) || allText.includes("name") },
      { label: "Director ID details", done: allText.includes("director") || allText.includes("id") },
      { label: "Contact details", done: allText.includes("email") || allText.includes("phone") || allText.includes("contact") },
      { label: "Business address", done: allText.includes("address") || allText.includes(accountState.business.location.toLowerCase()) },
      { label: "Official CIPC/BizPortal payment", done: allText.includes("pay") || allText.includes("fee") || allText.includes("cost") },
      { label: "Registration certificate upload", done: allText.includes("upload") || allText.includes("certificate") },
    ];
  }, [messages, accountState.business.name, accountState.business.location]);

  const completeCount = checklist.filter((item) => item.done).length;

  const sendMessage = (text = draft) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const userMessage: Message = { id: `m-${Date.now()}`, sender: "user", text: trimmed, time: nowTime() };
    const assistantMessage: Message = {
      id: `m-${Date.now()}-a`,
      sender: "assistant",
      text: getAssistantReply(trimmed, accountState.business.name),
      time: nowTime(),
    };
    setMessages((current) => [...current, userMessage, assistantMessage]);
    setDraft("");
  };

  const submitMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage();
  };

  const quickPrompts = ["Help me reserve the name", "What director details do you need?", "Show the fee breakdown", "What must I upload after registration?"];

  return (
    <>
      <PageHero
        eyebrow="Assistant chat"
        title={`Registration support for ${accountState.business.name}`}
        description={`Welcome, ${accountState.account.shortName}. Your assisted support is active. Ask about CIPC steps, official costs, director details or evidence uploads.`}
      />

      <div className="entrepreneur-grid chat-page-grid">
        <GlassCard className="chat-workspace-card">
          <div className="assistant-chat full-chat live-chat">
            <div className="assistant-chat-header"><strong>Imbewu Registration Assistant</strong><span>Paid support active</span></div>
            <div className="chat-thread" aria-live="polite">
              {messages.map((message) => (
                <div className={`assistant-bubble ${message.sender === "assistant" ? "agent" : "user"}`} key={message.id}>
                  <p>{message.text}</p>
                  <time>{message.time}</time>
                </div>
              ))}
            </div>
            <div className="quick-prompts">
              {quickPrompts.map((prompt) => <button key={prompt} onClick={() => sendMessage(prompt)}>{prompt}</button>)}
            </div>
            <form className="chat-compose" onSubmit={submitMessage}>
              <input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Type a message for the registration assistant..." />
              <button type="submit">Send</button>
            </form>
          </div>
        </GlassCard>

        <div className="chat-side-stack">
          <GlassCard>
            <h2>Registration checklist</h2>
            <p>{completeCount} of {checklist.length} steps have useful detail in the conversation.</p>
            <div className="entrepreneur-progress entrepreneur-progress-tall" style={{ marginTop: "1rem" }}><span style={{ width: `${(completeCount / checklist.length) * 100}%` }} /></div>
            <div className="entrepreneur-list" style={{ marginTop: "1rem" }}>
              {checklist.map((item) => <div className="entrepreneur-row" key={item.label}><div><strong>{item.label}</strong><p>{item.done ? "Captured in chat" : "Still needed"}</p></div><span className="entrepreneur-pill">{item.done ? "Done" : "Next"}</span></div>)}
            </div>
          </GlassCard>
        </div>
      </div>
    </>
  );
}
