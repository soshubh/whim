"use client";

import { useEffect, useState } from "react";
import posthog from "posthog-js";

import styles from "../page.module.css";

export function CodePreviewCopyButton() {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isCopied) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setIsCopied(false);
    }, 1400);

    return () => window.clearTimeout(timeout);
  }, [isCopied]);

  return (
    <button
      className={`${styles.codePreviewCopy} ${isCopied ? styles.codePreviewCopyActive : ""}`}
      onClick={() => {
        posthog.capture("code_copied", {
          area: "marketing",
          source: "landing_preview",
        });
        setIsCopied(true);
      }}
      type="button"
    >
      {isCopied ? "Code copied" : "Copy"}
    </button>
  );
}
