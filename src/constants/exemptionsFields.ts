type ExemptionsEnum = {
  title: string;
  min?: number;
  max?: number;
  details?: string;
  isDisabled?: boolean;
  value?: number;
};

export const STANDARD_DEDUCTION = 50_000;

export const EXEMPTIONS: ExemptionsEnum[] = [
  { title: "80C", details: "LIC,PPF,EPF,NPS", max: 1_50_000 },
  { title: "80DD", details: "Disabled Dependant Maintenance", max: 1_25_000 },
  { title: "80CCD(1B)", details: "NPS additional benifit", max: 50_000 },
  {
    title: "Standard Deduction",
    min: 50_000,
    max: 50_000,
    isDisabled: true,
    value: STANDARD_DEDUCTION,
  },
  { title: "HRA" },
  { title: "80D", details: "Health Insurance Premia" },
  { title: "professional Tax" },
  { title: "80DDB", details: "Medical Treatment Expense" },
  { title: "Section 24(B)", details: "Interest on Home Loan" },
  { title: "80CCD(2)", details: "Employers contribution to NPS" },
  { title: "80EEA", details: "Interest on loan for Affordable Housing" },
  { title: "Food Coupons" },
  { title: "80U", details: "Deduction for Disabled Individuals" },
  {
    title: "80EEB",
    details: "Interest on loan for purchase of electric vehicle",
  },
  { title: "80E", details: "Interest on education loan" },
  { title: "80G", details: "Donations" },
  {
    title: "80GGA",
    details: "Donations for scientific research and rural development",
  },
  { title: "80GGC", details: "Contribution to political parties" },
  { title: "Other Exemptions" },
];

export const EXEMPTIONS_FIELDS = Object.keys(EXEMPTIONS);
