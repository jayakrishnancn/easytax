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

function calculateTaxNewRegime(income: number) {
  let tax = 0;

  if (income <= REBATE_TILL) {
    return 0;
  }

  for (let slab of SLAB_DETAILS) {
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
