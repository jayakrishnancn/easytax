import { IncomeFieldsEnum } from "../enum/incomeFields";
import { IncomeFields } from "../type/income";
import { FORMATTED_FY } from "../util/calender";

export const initialDefaultState: IncomeFields = {
  [IncomeFieldsEnum.salary_basicDA]: { value: 0, isMonthly: false },
  [IncomeFieldsEnum.salary_HRA]: { value: 0, isMonthly: false },
  [IncomeFieldsEnum.salary_bonus]: { value: 0, isMonthly: false },
  [IncomeFieldsEnum.salary_other]: { value: 0, isMonthly: false },
  [IncomeFieldsEnum.businessAndProfession]: { value: 0, isMonthly: false },
  [IncomeFieldsEnum.CapitalGains]: { value: 0, isMonthly: false },
  [IncomeFieldsEnum.other]: { value: 0, isMonthly: false },
};

enum STORE_KEYS {
  Income = "Income",
}

export const getIncomeData = (year: string = FORMATTED_FY): IncomeFields => {
  let data = initialDefaultState;
  try {
    const tmp = localStorage.getItem(STORE_KEYS.Income + year);
    if (tmp) {
      data = { ...data, ...JSON.parse(tmp) };
    }
  } catch {}

  return data;
};

export const saveIncomeData = (
  value: IncomeFields,
  year: string = FORMATTED_FY
): void => {
  localStorage.setItem(STORE_KEYS.Income + year, JSON.stringify(value));
};
