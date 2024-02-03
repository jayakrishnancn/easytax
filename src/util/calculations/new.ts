const SLAB_DETAILS = [
  { from: 0, till: 2_50_000, taxPercent: 0 },
  { from: 2_50_000, till: 5_00_000, taxPercent: 5 },
  { from: 5_00_000, till: 7_50_000, taxPercent: 10 },
  { from: 7_50_000, till: 10_00_000, taxPercent: 15 },
  { from: 10_00_000, till: 12_50_000, taxPercent: 20 },
  { from: 12_50_000, till: 15_00_000, taxPercent: 25 },
  { from: 15_00_000, till: Infinity, taxPercent: 30 },
];
const REBATE_TILL = 5_00_000;

// FY_2023_2024 or FY 2023 on wards
const SLAB_DETAILS_FY_2023_2024 = [
  { from: 0, till: 3_00_000, taxPercent: 0 },
  { from: 3_00_000, till: 6_00_000, taxPercent: 5 },
  { from: 6_00_000, till: 9_00_000, taxPercent: 10 },
  { from: 9_00_000, till: 12_00_000, taxPercent: 15 },
  { from: 12_00_000, till: 15_00_000, taxPercent: 20 },
  { from: 15_00_000, till: Infinity, taxPercent: 30 },
];
const REBATE_TILL_FY_2023_2024 = 7_00_000;

function calculateTaxNewRegime(income: number, FY : number ) {
  let tax = 0;

  if (income <= (FY >= 2023 ? REBATE_TILL_FY_2023_2024 :  REBATE_TILL)) {
    return 0;
  }

const slabs = FY >= 2023 ? SLAB_DETAILS_FY_2023_2024 : SLAB_DETAILS

  for (let slab of slabs) {
    if (income < slab.from) {
      break;
    }
    const slabMax = Math.min(income, slab.till);
    const taxInSlab = ((slabMax - slab.from) * slab.taxPercent) / 100;
    tax += taxInSlab;
  }
  const cess = (tax * 4) / 100;
  return tax + cess;
}
export default calculateTaxNewRegime;
