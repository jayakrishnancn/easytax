const SLAB_DETAILS = [
  { from: 0, till: 2_50_000, taxPercent: 0 },
  { from: 2_50_000, till: 5_00_000, taxPercent: 5 },
  { from: 5_00_000, till: 10_00_000, taxPercent: 20 },
  { from: 10_00_000, till: Infinity, taxPercent: 30 },
];

const REBATE_TILL = 5_00_000;

function calculateTaxOldRegime(income: number) {
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
export default calculateTaxOldRegime;
