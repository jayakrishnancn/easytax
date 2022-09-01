import { ExemptionFieldsEnum } from "../enum/exemptionFields";

export type Exemption = {
  title: ExemptionFieldsEnum;
  min?: number;
  max?: number;
  details?: string;
  isDisabled?: boolean;
  value?: number;
  hasModal?: boolean;
  info?: any;
};
