export function getAllFY() {
  const fy = [];
  let currentYear = getcurrentFY();

  for (let year = currentYear; year >= 2020; year--) {
    fy.push(`FY ${year}-${year + 1}`);
  }

  return fy;
}

export function getcurrentFY() {
  const date = new Date();
  let currentYear = date.getFullYear();
  const currentMonth = date.getMonth() + 1;

  if (currentMonth < 4) {
    currentYear--;
  }
  return currentYear;
}

const year = getcurrentFY();
export const FORMATTED_FY = `FY ${year}-${year + 1}`;
