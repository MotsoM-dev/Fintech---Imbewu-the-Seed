"use client";

import { useState } from "react";
import { GlassCard, PageHero, StatCard } from "../EntrepreneurUI";
import { RegistrationSetup } from "../RegistrationSetup";
import { useBusinessState } from "../BusinessState";

export default function BusinessPage() {
  const accountState = useBusinessState();
  const [activeTab, setActiveTab] = useState("profile");
  const [coverImage, setCoverImage] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [profileForm, setProfileForm] = useState({
    ownerName: accountState.account.ownerName,
    shortName: accountState.account.shortName,
    email: accountState.account.email,
    name: accountState.business.name,
    category: accountState.business.category,
    industry: accountState.business.industry,
    location: accountState.business.location,
    employeeCount: accountState.business.employeeCount,
    description: accountState.business.description,
  });
  const [evidenceName, setEvidenceName] = useState("");
  const tabs = ["profile", "registration", "products", "history", "milestones"];
  const { business, metrics, products, transactions, tasks } = accountState;

  const saveProfile = () => {
    accountState.updateAccountProfile({ ownerName: profileForm.ownerName, shortName: profileForm.shortName, email: profileForm.email });
    accountState.updateBusinessProfile({ name: profileForm.name, category: profileForm.category, industry: profileForm.industry, location: profileForm.location, employeeCount: profileForm.employeeCount, description: profileForm.description });
    alert("Profile updated");
  };

  const uploadEvidence = () => {
    if (!evidenceName) return alert("Name the evidence file first");
    accountState.addDocument({ name: evidenceName, category: "Registration" });
    setEvidenceName("");
  };

  const previewImage = (file: File | undefined, setter: (value: string) => void) => {
    if (!file) return;
    setter(URL.createObjectURL(file));
  };

  return (
    <>
      <PageHero eyebrow="Profile and evidence" title={business.name} description={`${accountState.account.ownerName} can edit account details, maintain the business profile and link registration evidence here.`}>
        <button className="entrepreneur-button" onClick={saveProfile}>Save profile</button>
      </PageHero>

      <div className="entrepreneur-grid entrepreneur-grid-4">
        <StatCard label="Profile strength" value={`${metrics.profileStrength}%`} note="Core identity and credibility" />
        <StatCard label="Registration" value={business.registered ? "Linked" : business.registered === false ? "Not yet" : "Unknown"} note="CIPC evidence status" tone={business.registered ? "green" : "gold"} />
        <StatCard label="Team" value={business.employeeCount} note="Jobs supported" tone="purple" />
        <StatCard label="Avg order" value={metrics.averageOrder} note="Retail basket size" tone="blue" />
      </div>

      <div className="entrepreneur-tabs">{tabs.map((tab) => <button key={tab} className="entrepreneur-tab" data-active={activeTab === tab} onClick={() => setActiveTab(tab)}>{tab[0].toUpperCase() + tab.slice(1)}</button>)}</div>

      {activeTab === "profile" && <><section className="profile-cover-panel"><div className="profile-cover-photo" style={coverImage ? { backgroundImage: `linear-gradient(135deg, rgba(6,26,58,.38), rgba(7,95,171,.18)), url(${coverImage})` } : undefined}><div><span>Retail profile</span><h2>{business.name}</h2><p>{business.location}</p></div><label className="profile-upload-button">Change cover<input type="file" accept="image/*" onChange={(e) => previewImage(e.target.files?.[0], setCoverImage)} /></label></div><div className="profile-picture-row"><div className="profile-picture-frame">{profileImage ? <img src={profileImage} alt={`${accountState.account.ownerName} profile preview`} /> : <span>{accountState.account.shortName.charAt(0)}</span>}</div><div><h3>{accountState.account.ownerName}</h3><p>{business.category} owner building a trusted digital footprint.</p></div><label className="profile-upload-button secondary">Upload profile picture<input type="file" accept="image/*" onChange={(e) => previewImage(e.target.files?.[0], setProfileImage)} /></label></div></section><div className="entrepreneur-grid entrepreneur-grid-2"><GlassCard><h2>Edit account and business information</h2><div className="profile-edit-grid"><label><span className="entrepreneur-label">Account owner</span><input className="entrepreneur-input" value={profileForm.ownerName} onChange={(e) => setProfileForm({ ...profileForm, ownerName: e.target.value })} /></label><label><span className="entrepreneur-label">Preferred name</span><input className="entrepreneur-input" value={profileForm.shortName} onChange={(e) => setProfileForm({ ...profileForm, shortName: e.target.value })} /></label><label><span className="entrepreneur-label">Email</span><input className="entrepreneur-input" value={profileForm.email} onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })} /></label><label><span className="entrepreneur-label">Business name</span><input className="entrepreneur-input" value={profileForm.name} onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })} /></label><label><span className="entrepreneur-label">Category</span><input className="entrepreneur-input" value={profileForm.category} onChange={(e) => setProfileForm({ ...profileForm, category: e.target.value })} /></label><label><span className="entrepreneur-label">Location</span><input className="entrepreneur-input" value={profileForm.location} onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })} /></label><label className="profile-wide"><span className="entrepreneur-label">Industry</span><input className="entrepreneur-input" value={profileForm.industry} onChange={(e) => setProfileForm({ ...profileForm, industry: e.target.value })} /></label><label className="profile-wide"><span className="entrepreneur-label">Business story</span><textarea className="entrepreneur-textarea" rows={5} value={profileForm.description} onChange={(e) => setProfileForm({ ...profileForm, description: e.target.value })} /></label></div><button className="entrepreneur-button" onClick={saveProfile}>Save changes</button></GlassCard><GlassCard><h2>Registration evidence</h2><p>If you clicked “Yes, it is registered”, link the proof here so Imbewu can make the business profile funder-ready.</p><div className="entrepreneur-list" style={{ marginTop: "1rem" }}><div className="entrepreneur-row"><strong>CIPC registration certificate</strong><span className="entrepreneur-pill">Required</span></div><div className="entrepreneur-row"><strong>Company registration number</strong><span className="entrepreneur-pill">Required</span></div><div className="entrepreneur-row"><strong>Director ID copy</strong><span className="entrepreneur-pill">Useful</span></div><div className="entrepreneur-row"><strong>Bank confirmation letter</strong><span className="entrepreneur-pill">Useful</span></div></div><div className="profile-evidence-upload"><input className="entrepreneur-input" value={evidenceName} onChange={(e) => setEvidenceName(e.target.value)} placeholder="e.g. CIPC Registration Certificate.pdf" /><button className="entrepreneur-button" onClick={uploadEvidence}>Upload evidence</button></div></GlassCard></div></>}

      {activeTab === "registration" && <div className="entrepreneur-grid entrepreneur-grid-2"><RegistrationSetup /><GlassCard><h2>Link registration evidence</h2><p>If the business is registered, upload the evidence funders and partners expect to see.</p><div className="entrepreneur-list" style={{ marginTop: "1rem" }}><div className="entrepreneur-row"><strong>CIPC registration certificate</strong><span className="entrepreneur-pill">Required</span></div><div className="entrepreneur-row"><strong>Company registration number</strong><span className="entrepreneur-pill">Required</span></div><div className="entrepreneur-row"><strong>Director ID copy</strong><span className="entrepreneur-pill">Useful</span></div><div className="entrepreneur-row"><strong>Bank confirmation letter</strong><span className="entrepreneur-pill">Useful</span></div></div><div className="profile-evidence-upload"><input className="entrepreneur-input" value={evidenceName} onChange={(e) => setEvidenceName(e.target.value)} placeholder="e.g. CIPC Registration Certificate.pdf" /><button className="entrepreneur-button" onClick={uploadEvidence}>Upload evidence</button></div></GlassCard></div>}

      {activeTab === "products" && <GlassCard><div className="entrepreneur-grid entrepreneur-grid-3">{products.map((product) => <article className="entrepreneur-card" key={product.id}><span className="entrepreneur-pill">{product.category}</span><h3>{product.name}</h3><p>{product.description}</p><strong className="entrepreneur-price">{product.price}</strong></article>)}</div></GlassCard>}
      {activeTab === "history" && <GlassCard><div className="entrepreneur-list">{transactions.map((tx) => <div className="entrepreneur-row" key={tx.id}><div><strong>{tx.description}</strong><p>{tx.date}</p></div><span className={`entrepreneur-pill ${tx.type === "sale" ? "positive" : "negative"}`}>{tx.amount}</span></div>)}</div></GlassCard>}
      {activeTab === "milestones" && <GlassCard><div className="entrepreneur-list">{tasks.map((task) => <div className="entrepreneur-row task-row" key={task.title}><div><strong>{task.title}</strong><p>{task.metric}</p><div className="entrepreneur-progress"><span style={{ width: `${task.progress}%` }} /></div></div><span className="entrepreneur-pill">{task.completed ? "Complete" : `${task.progress}%`}</span></div>)}</div></GlassCard>}
    </>
  );
}
