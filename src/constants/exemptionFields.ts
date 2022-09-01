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
    hasModal: true,
    max: 1_50_000,
    info: "Investments in Provident Funds such as EPF, PPF, etc., payment made towards life insurance premiums, Equity Linked Saving Schemes, payment made towards the principal sum of a home loan, SSY, NSC, SCSS, etc.\n Max limit : 1,50,000",
  },
  {
    title: ExemptionFieldsEnum["80DD"],
    details: "Disabled Dependant Maintenance",
    max: 75_000,
    hasModal: true,
    info: `Dependant person with disability – A dependant person with disability is one who has at least 40% of any of the specified disability. The family member who takes care of the medical charges of the dependant person with disability can claim tax deduction of up to Rs. 75,000.

    Dependant person with severe disability – A dependant person with severe disability is one who has at least 80% of any disability. The family member handling the medical expenses of dependant person with severe disability can claim tax deduction of up to Rs. 1,25,000.
    
    The following documents will have to be submitted to claim tax benefits under Section 80DD of the Income Tax Act, 1961:

Medical Certificate: To claim tax deduction under Section 80DD, the taxpayer will have to submit a copy of the medical certificate, which authenticates the disability of the dependant.

Form 10-IA: If the disabled dependant is suffering from autism, cerebral palsy or multiple disabilities, then Form No. 10-IA has to be submitted.

Self-Declaration Certificate: Taxpayers have to produce a self-declaration certificate, mentioning the expenses incurred on the medical treatment (including nursing, rehabilitation and training) of the disabled dependant.

Receipts of Insurance Premium Paid: Since the self-declaration certificate will suffice for claiming most expenses, the individual is not required to preserve the actual receipts. However, if a claim is being made for the payment made towards insurance policies taken for the disabled dependant, then the actual receipts of the expenses need to be maintained.`,
  },
  {
    title: ExemptionFieldsEnum["80CCD_1B_"],
    details: "NPS additional benifit",
    max: 50_000,
  },

  {
    title: ExemptionFieldsEnum["80D"],
    details: "Health Insurance Premia",
    max: 1_00_000,
  },
  { title: ExemptionFieldsEnum["Professional_Tax"], max: 2_500 },
  {
    title: ExemptionFieldsEnum["80DDB"],
    details: "Medical Treatment Expense",
    max: 1_00_000,
  },
  {
    title: ExemptionFieldsEnum["Section_24_B_"],
    details: "Interest on Home Loan",
    max: 2_00_000,
  },
  {
    title: ExemptionFieldsEnum["80CCD_2_"],
    details: "Employers contribution to NPS",
    hasModal: true,
  },
  {
    title: ExemptionFieldsEnum["80EEA"],
    details: "Interest on loan for Affordable Housing",
    max: 1_50_000,
  },
  { title: ExemptionFieldsEnum["Food_Coupons"], max: 26_400 },
  {
    title: ExemptionFieldsEnum["80U"],
    details: "Deduction for Disabled Individuals",
    max: 1_25_000,
  },
  {
    title: ExemptionFieldsEnum["80EEB"],
    details: "Interest on loan for purchase of electric vehicle",
    max: 1_50_000,
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
