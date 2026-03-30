"use client";

import { SystemButton } from "../system-button";
import type { RightPanelTab } from "./types";

function CodeSurface({
  filename,
  mode,
  copiedState,
  onCopy,
  content,
}: {
  filename: string;
  mode: "component" | "sheets";
  copiedState: string;
  onCopy: (label: string, value: string) => void;
  content: string;
}) {
  return (
    <div className="builder-app-code-panel">
      <div className="builder-app-code-header">
        <div className="builder-app-code-filename">{filename}</div>
        <SystemButton
          variant="secondary"
          size="sm"
          tone={copiedState === mode ? "success" : "default"}
          onClick={() => onCopy(mode, content)}
        >
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <rect x="1" y="3" width="7" height="8" rx="1" stroke="currentColor" strokeWidth="1.2" />
            <path
              d="M4 1h6a1 1 0 0 1 1 1v8"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
          {copiedState === mode ? "Copied" : "Copy"}
        </SystemButton>
      </div>
      <div className="builder-app-code-scroll">
        <pre>{content}</pre>
      </div>
    </div>
  );
}

type CodeModePanelProps = {
  activeTab: RightPanelTab;
  copiedState: string;
  generatedAppsScript: string;
  generatedFramerCode: string;
  onCopy: (label: string, value: string) => void;
  onTabChange: (tab: RightPanelTab) => void;
};

export function CodeModePanel({
  activeTab,
  copiedState,
  generatedAppsScript,
  generatedFramerCode,
  onCopy,
  onTabChange,
}: CodeModePanelProps) {
  return (
    <>
      <div className="builder-app-code-tabs">
        <button
          type="button"
          className={`builder-app-code-tab ${activeTab === "component" ? "is-active" : ""}`}
          onClick={() => onTabChange("component")}
        >
          <span className="builder-app-code-tab-dot is-component" />
          Component
        </button>
        <button
          type="button"
          className={`builder-app-code-tab ${activeTab === "sheets" ? "is-active" : ""}`}
          onClick={() => onTabChange("sheets")}
        >
          <span className="builder-app-code-tab-dot is-sheets" />
          AppScript
        </button>
      </div>

      {activeTab === "component" ? (
        <CodeSurface
          filename="LeadCaptureForm.jsx"
          mode="component"
          copiedState={copiedState}
          onCopy={onCopy}
          content={generatedFramerCode}
        />
      ) : null}

      {activeTab === "sheets" ? (
        <CodeSurface
          filename="GoogleScript.gs"
          mode="sheets"
          copiedState={copiedState}
          onCopy={onCopy}
          content={generatedAppsScript}
        />
      ) : null}
    </>
  );
}
