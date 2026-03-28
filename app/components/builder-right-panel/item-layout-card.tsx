"use client";

import type { PreviewMode } from "../../lib/builder-config";
import type { WidthOption } from "../form/types";
import { InspectorCard, WidthSelectorRow } from "./inspector-primitives";

function getWidthLabel(previewMode: PreviewMode) {
  if (previewMode === "tablet") {
    return "Tablet width";
  }

  if (previewMode === "mobile") {
    return "Mobile width";
  }

  return "Desktop width";
}

export function ItemLayoutCard({
  previewMode,
  width,
  onWidthChange,
}: {
  previewMode: PreviewMode;
  width: WidthOption;
  onWidthChange: (value: WidthOption) => void;
}) {
  return (
    <InspectorCard title="Layout">
      <WidthSelectorRow
        label={getWidthLabel(previewMode)}
        value={width}
        onChange={onWidthChange}
      />
    </InspectorCard>
  );
}
