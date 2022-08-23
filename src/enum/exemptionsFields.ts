export enum ExemptionsFieldsEnum {
  _80C = "80C",
  _80D = "80D",
  _80DD = "80DD",
}
type ExemptionsEnum = {
  title: string;
  min?: number;
  max?: number;
};
export const EXEMPTIONS: ExemptionsEnum[] = [
  {
    title: ExemptionsFieldsEnum._80C,
    min: 0,
    max: 1_50_000,
  },
];

export const EXEMPTIONS_FIELDS = Object.keys(EXEMPTIONS);
