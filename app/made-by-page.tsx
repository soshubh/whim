import { LandingSubpageShell } from "./components/landing/subpage-shell";
import styles from "./home/page.module.css";

export default function MadeByPage() {
  return (
    <LandingSubpageShell
      eyebrow="Made by"
      title="Made by Subhanshu Singh at GradRight."
      lede="This product came from a real workflow problem: the gap between how forms are designed, how they behave, and how they finally get shipped in Framer."
    >
      <section className={styles.subpageSection}>
        <blockquote className={styles.subpageQuote}>
          I needed a way to build Framer forms that did not fall apart between
          the design layer, the builder settings, the exported code, and the
          submission flow.
        </blockquote>
        <div className={styles.subpageQuoteMeta}>
          Subhanshu Singh, UI/UX Manager at GradRight
        </div>
      </section>

      <section className={styles.subpageGrid}>
        <article className={styles.subpageSection}>
          <h2 className={styles.subpageSectionTitle}>The original problem</h2>
          <p className={styles.subpageSectionBody}>
            Forms were being rebuilt again and again. Styling lived in one
            place, interaction expectations lived somewhere else, and the final
            Framer code often broke the consistency that was designed upstream.
          </p>
        </article>
        <article className={styles.subpageSection}>
          <h2 className={styles.subpageSectionTitle}>Why this product exists</h2>
          <p className={styles.subpageSectionBody}>
            The builder exists to turn one messy workflow into one system:
            define the form once, keep the UI language intact, and ship code
            that reflects the actual design and logic decisions.
          </p>
        </article>
      </section>

      <section className={styles.subpageSection}>
        <h2 className={styles.subpageSectionTitle}>What matters most in the product</h2>
        <ul className={styles.subpageBulletList}>
          <li>Design-system consistency across builder, preview, and export.</li>
          <li>Interaction states that behave like real forms, not demos.</li>
          <li>Delivery options that are simple enough for teams to adopt quickly.</li>
          <li>Cleaner code output that does not need a second rewrite after export.</li>
        </ul>
      </section>
    </LandingSubpageShell>
  );
}
