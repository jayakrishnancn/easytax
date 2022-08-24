import { IncomeFieldsEnum } from "../enum/incomeFields";
import { IncomeFields } from "../type/income";

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

export const getIncomeData = (): IncomeFields => {
  let data = initialDefaultState;
  try {
    const tmp = localStorage.getItem(STORE_KEYS.Income);
    if (tmp) {
      data = { ...data, ...JSON.parse(tmp) };
    }
  } catch {}

  return data;
};

export const saveIncomeData = (value: IncomeFields): void => {
  localStorage.setItem(STORE_KEYS.Income, JSON.stringify(value));
};
