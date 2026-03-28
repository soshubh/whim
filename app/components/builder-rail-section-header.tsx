import AddRounded from "@mui/icons-material/AddRounded";

import { SystemButton } from "./system-button";

type BuilderRailSectionHeaderProps = {
  title: string;
  onAdd: () => void;
  addLabel: string;
};

export function BuilderRailSectionHeader({
  title,
  onAdd,
  addLabel,
}: BuilderRailSectionHeaderProps) {
  return (
    <div className="builder-app-section-header">
      <span className="builder-app-panel-title">{title}</span>
      <SystemButton
        variant="icon"
        size="icon"
        aria-label={addLabel}
        onClick={onAdd}
      >
        <AddRounded fontSize="inherit" />
      </SystemButton>
    </div>
  );
}
