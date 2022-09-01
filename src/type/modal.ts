import { ReactNode } from "react";

export type ModalProps = {
  children?: ReactNode;
  title?: string;
  onCancel: () => void;
  // onSubmit?: () => void;
};
