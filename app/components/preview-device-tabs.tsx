import type { PreviewMode } from "../lib/builder-config";
import styles from "./preview-device-tabs.module.css";

type PreviewDeviceTabsProps = {
  previewMode: PreviewMode;
  onPreviewModeChange: (mode: PreviewMode) => void;
};

export function PreviewDeviceTabs({
  previewMode,
  onPreviewModeChange,
}: PreviewDeviceTabsProps) {
  return (
    <div className={styles.root} role="tablist" aria-label="Preview mode">
      <button
        type="button"
        className={`${styles.tab} ${previewMode === "desktop" ? styles.tabActive : ""}`}
        onClick={() => onPreviewModeChange("desktop")}
      >
        <svg width="8" height="8" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <rect x="1" y="2" width="10" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
        </svg>
        <span className={styles.label}>Desktop</span>
      </button>
      <button
        type="button"
        className={`${styles.tab} ${previewMode === "tablet" ? styles.tabActive : ""}`}
        onClick={() => onPreviewModeChange("tablet")}
      >
        <svg width="7" height="8" viewBox="0 0 10 12" fill="none" aria-hidden="true">
          <rect x="1" y="1" width="8" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
          <rect x="3.5" y="9" width="3" height="1" rx=".5" fill="currentColor" />
        </svg>
        <span className={styles.label}>Tablet</span>
      </button>
      <button
        type="button"
        className={`${styles.tab} ${previewMode === "mobile" ? styles.tabActive : ""}`}
        onClick={() => onPreviewModeChange("mobile")}
      >
        <svg width="6" height="8" viewBox="0 0 8 12" fill="none" aria-hidden="true">
          <rect x="1" y="1" width="6" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
          <rect x="2.5" y="9" width="3" height="1" rx=".5" fill="currentColor" />
        </svg>
        <span className={styles.label}>Mobile</span>
      </button>
    </div>
  );
}
