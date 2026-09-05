"use client";

import { useState } from "react";
import { EmptyState, GlassCard, PageHero, StatCard } from "../EntrepreneurUI";
import { useBusinessState } from "../BusinessState";

export default function StorefrontPage() {
  const accountState = useBusinessState();
  const [published, setPublished] = useState(false);
  const [form, setForm] = useState({ name: "", description: "", price: "", category: "" });

  const addProduct = () => {
    if (!form.name || !form.price) return alert("Add a product name and price");
    accountState.addProduct({ name: form.name, description: form.description || "Ready for customers", price: form.price, category: form.category || "General" });
    setForm({ name: "", description: "", price: "", category: "" });
  };

  return (
    <>
      <PageHero eyebrow="Public footprint" title={`${accountState.business.name} is ready to be seen.`} description="Show products, location and contact details so customers can buy with confidence and funders can see a real market presence.">
        <button className="entrepreneur-button" onClick={() => setPublished((value) => !value)}>{published ? "Unpublish" : "Publish storefront"}</button>
        <button className="entrepreneur-button-secondary" onClick={() => alert("Preview mode: your storefront is " + (published ? "published" : "draft"))}>Preview</button>
      </PageHero>
      <div className="entrepreneur-grid entrepreneur-grid-4"><StatCard label="Status" value={published ? "Live" : "Draft"} note="Visibility of the public page" tone={published ? "green" : "gold"} /><StatCard label="Products" value={String(accountState.products.length)} note="Offers customers can browse" /><StatCard label="Reach" value="Local" note="Mdantsane customer base" tone="purple" /><StatCard label="Trust" value={`${accountState.metrics.storefrontScore}%`} note="Storefront quality" tone="green" /></div>
      <div className="entrepreneur-grid entrepreneur-grid-2" style={{ marginTop: "1rem" }}><GlassCard><h2>{accountState.business.name}</h2><p>{accountState.business.description}</p><div className="entrepreneur-list" style={{ marginTop: "1rem" }}><div className="entrepreneur-row"><strong>Location</strong><span className="entrepreneur-pill">{accountState.business.location}</span></div><div className="entrepreneur-row"><strong>Category</strong><span className="entrepreneur-pill">{accountState.business.category}</span></div><div className="entrepreneur-row"><strong>Email</strong><span className="entrepreneur-pill">{accountState.account.email}</span></div></div></GlassCard><GlassCard><h2>Add an offer</h2><div className="entrepreneur-grid" style={{ marginTop: "1rem" }}><input className="entrepreneur-input" placeholder="Product or service" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /><input className="entrepreneur-input" placeholder="Price e.g. R49.99" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} /><input className="entrepreneur-input" placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} /><textarea className="entrepreneur-textarea" rows={3} placeholder="Short description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /><button className="entrepreneur-button" onClick={addProduct}>Add to storefront</button></div></GlassCard></div>
      <GlassCard><h2>Offer shelf</h2><div className="entrepreneur-grid entrepreneur-grid-3" style={{ marginTop: "1rem" }}>{accountState.products.length ? accountState.products.map((product) => <article className="entrepreneur-card" key={product.id}><span className="entrepreneur-pill">{product.category}</span><h3>{product.name}</h3><p>{product.description}</p><strong className="entrepreneur-price">{product.price}</strong></article>) : <EmptyState icon="◇" title="No products yet" text="Add the first offer and make the storefront useful." />}</div></GlassCard>
    </>
  );
}
