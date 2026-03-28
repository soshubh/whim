import CheckBoxRounded from "@mui/icons-material/CheckBoxRounded";
import KeyboardBackspaceRounded from "@mui/icons-material/KeyboardBackspaceRounded";
import ListAltRounded from "@mui/icons-material/ListAltRounded";
import LockRounded from "@mui/icons-material/LockRounded";
import MailOutlineRounded from "@mui/icons-material/MailOutlineRounded";
import NotesRounded from "@mui/icons-material/NotesRounded";
import PhoneIphoneRounded from "@mui/icons-material/PhoneIphoneRounded";
import RadioButtonCheckedRounded from "@mui/icons-material/RadioButtonCheckedRounded";
import RocketLaunchRounded from "@mui/icons-material/RocketLaunchRounded";
import TextFieldsRounded from "@mui/icons-material/TextFieldsRounded";

import type { FormButtonType } from "./form/button/types";
import type { FieldType } from "./form/types";

export function FieldTypeIcon({ type }: { type: FieldType }) {
  switch (type) {
    case "text":
      return <TextFieldsRounded fontSize="inherit" />;
    case "email":
      return <MailOutlineRounded fontSize="inherit" />;
    case "phone":
      return <PhoneIphoneRounded fontSize="inherit" />;
    case "select":
      return <ListAltRounded fontSize="inherit" />;
    case "textarea":
      return <NotesRounded fontSize="inherit" />;
    case "radio":
      return <RadioButtonCheckedRounded fontSize="inherit" />;
    case "checkbox":
      return <CheckBoxRounded fontSize="inherit" />;
  }
}

export function ButtonTypeIcon({ type }: { type: FormButtonType }) {
  switch (type) {
    case "submit":
      return <RocketLaunchRounded fontSize="inherit" />;
    case "back":
      return <KeyboardBackspaceRounded fontSize="inherit" />;
    case "otp":
      return <LockRounded fontSize="inherit" />;
  }
}
