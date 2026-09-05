"use client";

import { useEffect, useMemo, useState } from "react";
import { useFunderState, type FunderType } from "../FunderState";
import { GlassCard, PageHero, StatCard } from "../FunderUI";

type VerificationState = "idle" | "uploading" | "verified";

const funderTypes: FunderType[] = ["Individual", "Company", "Organization", "Community Group"];

const verificationDocuments: Record<FunderType, { id: string; title: string; note: string }[]> = {
  Individual: [
    { id: "identity", title: "Identification document", note: "South African ID, passport, or residence permit" },
    { id: "address", title: "Proof of address", note: "Utility bill, lease, or official letter from the last 3 months" },
    { id: "bank", title: "Personal bank statement", note: "Latest bank statement for the account funding will come from" },
  ],
  Company: [
    { id: "registration", title: "Company registration", note: "CIPC registration document or company certificate" },
    { id: "director", title: "Director identification", note: "ID document for the authorized representative" },
    { id: "bank", title: "Business bank statement", note: "Latest company bank statement" },
    { id: "resolution", title: "Company resolution", note: "Proof that this person may invest on behalf of the company" },
  ],
  Organization: [
    { id: "constitution", title: "Organization constitution", note: "Founding document, NPO registration, or trust deed" },
    { id: "representative", title: "Representative identification", note: "ID document for the authorized contact" },
    { id: "bank", title: "Organization bank statement", note: "Latest bank statement for the funding account" },
    { id: "mandate", title: "Funding mandate", note: "Board, trustee, or committee approval to fund businesses" },
  ],
  "Community Group": [
    { id: "member-list", title: "Member list", note: "Names and contacts for the community members contributing funds" },
    { id: "lead-id", title: "Group lead identification", note: "ID document for the nominated group lead" },
    { id: "stokvel-proof", title: "Group account or savings proof", note: "Bank statement, stokvel record, or savings ledger" },
    { id: "agreement", title: "Group agreement", note: "Signed agreement showing who can approve funding decisions" },
  ],
};

export default function FunderProfilePage() {
  const { profile, updateProfile } = useFunderState();
  const [draftProfile, setDraftProfile] = useState(profile);
  const [verificationState, setVerificationState] = useState<VerificationState>("idle");
  const [progress, setProgress] = useState(0);
  const [toastVisible, setToastVisible] = useState(false);
  const [saveNoticeVisible, setSaveNoticeVisible] = useState(false);

  const requiredDocuments = verificationDocuments[draftProfile.funderType];
  const uploadedCount = useMemo(() => Math.min(requiredDocuments.length, Math.ceil(progress / (100 / requiredDocuments.length))), [progress, requiredDocuments.length]);

  useEffect(() => {
    setDraftProfile(profile);
  }, [profile]);

  useEffect(() => {
    setVerificationState("idle");
    setProgress(0);
    setToastVisible(false);
  }, [draftProfile.funderType]);

  useEffect(() => {
    if (verificationState !== "uploading") return;

    const startedAt = Date.now();
    const interval = window.setInterval(() => {
      const elapsed = Date.now() - startedAt;
      setProgress(Math.min(100, Math.round((elapsed / 30000) * 100)));
    }, 300);

    const timeout = window.setTimeout(() => {
      window.clearInterval(interval);
      setProgress(100);
      setVerificationState("verified");
      setToastVisible(true);
      window.setTimeout(() => setToastVisible(false), 6500);
    }, 30000);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timeout);
    };
  }, [verificationState]);

  const startVerification = () => {
    setProgress(0);
    setToastVisible(false);
    setVerificationState("uploading");
  };

  const saveProfile = () => {
    updateProfile(draftProfile);
    setSaveNoticeVisible(true);
    window.setTimeout(() => setSaveNoticeVisible(false), 4500);
  };

  return (
    <>
      <PageHero eyebrow="Funder profile" title="Manage your community investor identity." description="Choose whether you are investing as an individual, company, organization, or community group. Imbewu adjusts the verification checklist to match.">
        <button className="funder-button" onClick={startVerification}>{verificationState === "verified" ? "Run verification again" : "Submit for verification"}</button>
      </PageHero>

      {toastVisible ? <div className="funder-toast"><strong>You have been verified.</strong><span>Your {draftProfile.funderType.toLowerCase()} funder profile can now review verified opportunities.</span></div> : null}
      {saveNoticeVisible ? <div className="funder-toast funder-toast-secondary"><strong>Profile updated.</strong><span>Your changes now apply across the Funder workspace.</span></div> : null}

      <div className="funder-grid funder-grid-3">
        <StatCard label="Funder type" value={draftProfile.funderType} note="Editable account category" tone="green" />
        <StatCard label="Verification" value={verificationState === "verified" ? "Verified" : verificationState === "uploading" ? `${progress}%` : "Pending"} note={`${requiredDocuments.length} checks required`} tone="blue" />
        <StatCard label="Investing range" value={draftProfile.ticketSize} note="Community funding budget" tone="gold" />
      </div>

      <div className="funder-grid funder-grid-2" style={{ marginTop: "1rem" }}>
        <GlassCard>
          <h2>Profile information</h2>
          <div className="funder-form-grid">
            <label><span className="funder-label">Funder type</span><select className="funder-input" value={draftProfile.funderType} onChange={(event) => setDraftProfile({ ...draftProfile, funderType: event.target.value as FunderType })}>{funderTypes.map((type) => <option key={type} value={type}>{type}</option>)}</select></label>
            <label><span className="funder-label">Account name</span><input className="funder-input" value={draftProfile.accountName} onChange={(event) => setDraftProfile({ ...draftProfile, accountName: event.target.value })} /></label>
            <label><span className="funder-label">Full name</span><input className="funder-input" value={draftProfile.name} onChange={(event) => setDraftProfile({ ...draftProfile, name: event.target.value })} /></label>
            <label><span className="funder-label">Email</span><input className="funder-input" value={draftProfile.email} onChange={(event) => setDraftProfile({ ...draftProfile, email: event.target.value })} /></label>
            <label><span className="funder-label">Role</span><input className="funder-input" value={draftProfile.role} onChange={(event) => setDraftProfile({ ...draftProfile, role: event.target.value })} /></label>
            <label><span className="funder-label">Investment range</span><input className="funder-input" value={draftProfile.ticketSize} onChange={(event) => setDraftProfile({ ...draftProfile, ticketSize: event.target.value })} /></label>
            <label><span className="funder-label">Primary province</span><input className="funder-input" value={draftProfile.province} onChange={(event) => setDraftProfile({ ...draftProfile, province: event.target.value })} /></label>
            <label className="funder-wide"><span className="funder-label">Community funding purpose</span><textarea className="funder-textarea" rows={5} value={draftProfile.mandate} onChange={(event) => setDraftProfile({ ...draftProfile, mandate: event.target.value })} /></label>
          </div>
          <button className="funder-button" style={{ marginTop: "1rem" }} onClick={saveProfile}>Save profile</button>
        </GlassCard>

        <GlassCard>
          <h2>{draftProfile.funderType} verification</h2>
          <p>The required evidence changes with the funder type so individuals, companies, organizations, and community groups are verified fairly.</p>
          <div className="funder-list" style={{ marginTop: "1rem" }}>
            {requiredDocuments.map((document, index) => (
              <div className="funder-row" key={document.id}>
                <div><strong>{document.title}</strong><p>{document.note}</p></div>
                <span className={`funder-pill ${uploadedCount > index ? "positive" : ""}`}>{uploadedCount > index ? "Uploaded" : "Required"}</span>
              </div>
            ))}
          </div>
          <button className="funder-button-secondary" style={{ marginTop: "1rem" }} onClick={startVerification}>Open verification modal</button>
        </GlassCard>
      </div>

      {verificationState === "uploading" ? (
        <div className="funder-modal-backdrop" role="dialog" aria-modal="true" aria-label="Verification upload progress">
          <div className="funder-modal-card">
            <div className="funder-modal-header">
              <div>
                <span className="funder-pill positive">{draftProfile.funderType} verification</span>
                <h2>Uploading verification documents</h2>
              </div>
              <span className="funder-modal-progress">{progress}%</span>
            </div>
            <div className="funder-progress funder-progress-large"><span style={{ width: `${progress}%` }} /></div>
            <div className="funder-list" style={{ marginTop: "1rem" }}>
              {requiredDocuments.map((document, index) => (
                <div className="funder-row" key={document.id}>
                  <div><strong>{document.title}</strong><p>{document.note}</p></div>
                  <span className={`funder-pill ${uploadedCount > index ? "positive" : ""}`}>{uploadedCount > index ? "Uploaded" : "Waiting"}</span>
                </div>
              ))}
            </div>
            <p className="funder-modal-note">Verification is running. A confirmation notification will appear after 30 seconds.</p>
          </div>
        </div>
      ) : null}
    </>
  );
}
