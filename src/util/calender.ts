export function getAllFY() {
  const fy = [];
  let currentYear = getcurrentFY();

  for (let year = 2020; year <= currentYear; year++) {
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

export function formattedFY() {
  const year = getcurrentFY();
  return `FY ${year}-${year + 1}`;
}
