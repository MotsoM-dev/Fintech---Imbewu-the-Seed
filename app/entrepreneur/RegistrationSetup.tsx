"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GlassCard } from "./EntrepreneurUI";
import { useBusinessState } from "./BusinessState";

type RegistrationSetupProps = {
  variant?: "card" | "modal";
  onClose?: () => void;
};

export function RegistrationSetup({ variant = "card", onClose }: RegistrationSetupProps) {
  const accountState = useBusinessState();
  const router = useRouter();
  const [showProcess, setShowProcess] = useState(accountState.business.registered === false);
  const content = (
    <div className="registration-setup-content">
      <div className="registration-header">
        <span>First setup question</span>
        <strong>Has {accountState.business.name} been formally registered with CIPC?</strong>
        <p>Registration helps turn the business from informal trading activity into a more trusted digital profile for customers, banks and funders.</p>
      </div>

      <div className="registration-actions">
        <button className="entrepreneur-button" onClick={() => { accountState.setRegistrationStatus(true); onClose?.(); }}>Yes, it is registered</button>
        <button className="entrepreneur-button-secondary" onClick={() => { accountState.setRegistrationStatus(false); setShowProcess(true); }}>No, show me how</button>
      </div>

      {showProcess ? (
        <div className="registration-process feature-process">
          <div className="process-intro">
            <h2>Registration path for {accountState.business.name}</h2>
            <p>For Zanele’s retail and sales business, formal registration supports supplier accounts, banking credibility, funding readiness and a cleaner public business footprint.</p>
          </div>

          <ol>
            <li><strong>Create or access a CIPC/BizPortal profile.</strong><span>Use the owner/director South African ID details, contact information and business address.</span></li>
            <li><strong>Choose the company name route.</strong><span>Reserve a name online through CIPC, or register first with an enterprise number and add a name later.</span></li>
            <li><strong>Prepare company and director details.</strong><span>Collect director IDs, email, phone, physical address, share/director information and proposed business activity.</span></li>
            <li><strong>Pay official registration costs.</strong><span>CIPC lists electronic name reservation at R50 and private company registration with a standard MOI at R125.</span></li>
            <li><strong>Store the proof in Imbewu.</strong><span>Upload the registration certificate, company number, bank confirmation and future tax records into the trust vault.</span></li>
          </ol>

          <div className="payment-gateway-card">
            <div>
              <span className="entrepreneur-pill">Transparent payment</span>
              <h3>Let Imbewu handle the registration support</h3>
              <p>The R500 fee is Imbewu’s assisted service fee. It covers guided intake, checklist preparation, form guidance and assistant support. Official CIPC/BizPortal fees remain separate and are shown below.</p>
            </div>
            <div className="payment-lines">
              <div><span>CIPC name reservation</span><strong>R50</strong></div>
              <div><span>CIPC private company registration</span><strong>R125</strong></div>
              <div><span>Imbewu assisted service</span><strong>R500</strong></div>
              <div className="payment-total"><span>Pay now to start assistant support</span><strong>R500</strong></div>
            </div>
            <button className="entrepreneur-button" onClick={() => router.push("/entrepreneur/chat?topic=registration&paid=1")}>Pay R500 and continue to chat</button>
            <small>Prototype payment gateway card: no real payment is processed yet.</small>
          </div>
        </div>
      ) : null}
    </div>
  );

  if (variant === "modal") {
    return (
      <div className="registration-modal-backdrop" role="dialog" aria-modal="true" aria-label="Business registration setup">
        <div className="registration-modal">
          <button className="registration-modal-close" onClick={onClose} aria-label="Close registration setup">×</button>
          {content}
        </div>
      </div>
    );
  }

  return <GlassCard className="registration-card">{content}</GlassCard>;
}
