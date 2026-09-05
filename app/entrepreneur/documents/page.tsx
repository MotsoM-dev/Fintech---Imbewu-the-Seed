"use client";

import { useState } from "react";
import { EmptyState, GlassCard, PageHero, StatCard } from "../EntrepreneurUI";
import { useBusinessState } from "../BusinessState";

export default function DocumentsPage() {
  const accountState = useBusinessState();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [uploadCategory, setUploadCategory] = useState("Registration");
  const [fileName, setFileName] = useState("");
  const categories = ["All", "Registration", "Tax", "Bank Statements", "Invoices", "Receipts", "Other"];
  const visibleDocs = selectedCategory === "All" ? accountState.documents : accountState.documents.filter((doc) => doc.category === selectedCategory);

  const addDoc = () => {
    if (!fileName) return alert("Name the document first");
    accountState.addDocument({ name: fileName, category: uploadCategory });
    setFileName("");
  };

  return (
    <>
      <PageHero eyebrow="Trust vault" title={`Keep ${accountState.business.name}'s proof in one place.`} description="Registration documents, bank statements, invoices and receipts turn retail activity into evidence funders can review." />
      <div className="entrepreneur-grid entrepreneur-grid-3">
        <StatCard label="Documents" value={String(accountState.documents.length)} note="Files in the trust vault" />
        <StatCard label="Verified" value={String(accountState.documents.filter((d) => d.verified).length)} note="Ready for funder review" tone="green" />
        <StatCard label="Document score" value={`${accountState.metrics.documentScore}%`} note="Proof completeness" tone="gold" />
      </div>
      <div className="entrepreneur-tabs">{categories.map((category) => <button className="entrepreneur-tab" data-active={selectedCategory === category} key={category} onClick={() => setSelectedCategory(category)}>{category}</button>)}</div>
      <div className="entrepreneur-grid entrepreneur-grid-2"><GlassCard><h2>Document library</h2><div className="entrepreneur-list" style={{ marginTop: "1rem" }}>{visibleDocs.length ? visibleDocs.map((doc) => <div className="entrepreneur-row" key={doc.id}><div><strong>{doc.name}</strong><p>{doc.category} • {doc.uploadedAt}</p></div><span className="entrepreneur-pill">{doc.verified ? "Verified" : "Reviewing"}</span></div>) : <EmptyState icon="□" title="No documents here yet" text="Add your first file to this category." />}</div></GlassCard><GlassCard><h2>Add a proof item</h2><p>For this prototype, enter a document name to simulate an upload.</p><div className="entrepreneur-grid" style={{ marginTop: "1rem" }}><select className="entrepreneur-select" value={uploadCategory} onChange={(e) => setUploadCategory(e.target.value)}>{categories.filter((c) => c !== "All").map((category) => <option key={category}>{category}</option>)}</select><input className="entrepreneur-input" value={fileName} onChange={(e) => setFileName(e.target.value)} placeholder="e.g. September receipts.pdf" /><button className="entrepreneur-button" onClick={addDoc}>Add document</button></div></GlassCard></div>
    </>
  );
}
