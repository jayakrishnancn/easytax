export function getAllFY() {
  const fy = [];
  const date = new Date();
  let currentYear = date.getFullYear();
  const currentMonth = date.getMonth() + 1;

  if (currentMonth < 4) {
    currentYear--;
  }

  for (let year = 2020; year <= currentYear; year++) {
    fy.push(`FY ${year}-${year + 1}`);
  }

  return fy;
}
