import { ExemptionFieldsEnum } from "../enum/exemptionFields";
import { Exemption } from "./../type/exemptions";
export const STANDARD_DEDUCTION = {
  title: ExemptionFieldsEnum["Standard Deduction"],
  min: 50_000,
  max: 50_000,
  isDisabled: true,
  value: 50_000,
};

export const HRA = { title: ExemptionFieldsEnum["HRA"] };

export const EXEMPTIONS: Exemption[] = [
  STANDARD_DEDUCTION,
  {
    title: ExemptionFieldsEnum["80C"],
    details: "LIC,PPF,EPF,NPS",
    max: 1_50_000,
  },
  {
    title: ExemptionFieldsEnum["80DD"],
    details: "Disabled Dependant Maintenance",
    max: 1_25_000,
  },
  {
    title: ExemptionFieldsEnum["80CCD_1B_"],
    details: "NPS additional benifit",
    max: 50_000,
  },

  { title: ExemptionFieldsEnum["80D"], details: "Health Insurance Premia" },
  { title: ExemptionFieldsEnum["Professional_Tax"] },
  { title: ExemptionFieldsEnum["80DDB"], details: "Medical Treatment Expense" },
  {
    title: ExemptionFieldsEnum["Section_24_B_"],
    details: "Interest on Home Loan",
  },
  {
    title: ExemptionFieldsEnum["80CCD_2_"],
    details: "Employers contribution to NPS",
  },
  {
    title: ExemptionFieldsEnum["80EEA"],
    details: "Interest on loan for Affordable Housing",
  },
  { title: ExemptionFieldsEnum["Food_Coupons"] },
  {
    title: ExemptionFieldsEnum["80U"],
    details: "Deduction for Disabled Individuals",
  },
  {
    title: ExemptionFieldsEnum["80EEB"],
    details: "Interest on loan for purchase of electric vehicle",
  },
  { title: ExemptionFieldsEnum["80E"], details: "Interest on education loan" },
  { title: ExemptionFieldsEnum["80G"], details: "Donations" },
  {
    title: ExemptionFieldsEnum["80GGA"],
    details: "Donations for scientific research and rural development",
  },
  {
    title: ExemptionFieldsEnum["80GGC"],
    details: "Contribution to political parties",
  },
  { title: ExemptionFieldsEnum["Other_Exemptions"] },
];
