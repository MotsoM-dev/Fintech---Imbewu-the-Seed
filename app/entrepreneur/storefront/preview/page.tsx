"use client";

import Link from "next/link";
import { useBusinessState } from "../../BusinessState";

const storefrontCover = "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1800&q=85";

export default function StorefrontPreviewPage() {
  const accountState = useBusinessState();
  const { business, account, metrics, products } = accountState;

  return (
    <div className="storefront-preview-shell">
      <div className="storefront-preview-toolbar">
        <div><span className="storefront-preview-dot" /> Preview mode <strong>{business.name}</strong></div>
        <Link href="/entrepreneur/storefront" className="entrepreneur-button-secondary">Back to editor</Link>
      </div>

      <section className="storefront-preview-hero">
        <img src={storefrontCover} alt="Fresh produce arranged on a market stall" />
        <div className="storefront-preview-hero-shade" />
        <div className="storefront-preview-hero-copy">
          <span className="storefront-preview-kicker">A neighbourhood market, made personal</span>
          <h1>{business.name}</h1>
          <p>{business.description}</p>
          <div className="storefront-preview-actions">
            <a href="#offers" className="entrepreneur-button">Browse our offers <span aria-hidden="true">↘</span></a>
            <a href={`mailto:${account.email}`} className="storefront-preview-text-link">Contact the shop <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <div className="storefront-preview-location"><span aria-hidden="true">⌖</span>{business.location}</div>
      </section>

      <section className="storefront-preview-trust" aria-label="Business highlights">
        <div><span>Open for</span><strong>Local orders</strong></div>
        <div><span>Customer favourite</span><strong>{metrics.repeatCustomers} repeat buyers</strong></div>
        <div><span>Shop confidence</span><strong>{metrics.storefrontScore}% complete</strong></div>
        <div><span>Response</span><strong>Usually today</strong></div>
      </section>

      <section className="storefront-preview-content" id="offers">
        <div className="storefront-preview-heading">
          <div><span className="storefront-preview-kicker">The offer shelf</span><h2>Good things for the week ahead.</h2></div>
          <p>Thoughtfully packed for busy households, commuters, and local caterers.</p>
        </div>
        <div className="storefront-preview-products">
          {products.map((product, index) => (
            <article className={`storefront-preview-product storefront-preview-product-${index % 3}`} key={product.id}>
              <div className="storefront-preview-product-number">0{index + 1}</div>
              <span>{product.category}</span>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <div className="storefront-preview-product-footer"><strong>{product.price}</strong><button type="button" onClick={() => alert(`Thanks for your interest in ${product.name}. Contact ${account.email} to order.`)}>Enquire <span aria-hidden="true">→</span></button></div>
            </article>
          ))}
        </div>
      </section>

      <section className="storefront-preview-story">
        <div className="storefront-preview-story-mark">✦</div>
        <div><span className="storefront-preview-kicker">Rooted in {business.location}</span><h2>Small shop. Big care.</h2><p>{business.description} Every order helps a local business keep growing with intention.</p></div>
        <a className="entrepreneur-button-secondary" href={`mailto:${account.email}`}>Say hello</a>
      </section>

      <footer className="storefront-preview-footer"><strong>{business.name}</strong><span>{business.category} · {business.location}</span><a href={`mailto:${account.email}`}>{account.email}</a></footer>
    </div>
  );
}