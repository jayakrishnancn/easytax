import { STANDARD_DEDUCTION } from "../../constants/exemptionFields";
import { ExemptionFieldsEnum } from "../../enum/exemptionFields";
import { ExemptionsType } from "../../store/reducers/type";

export const calculateTotalExemptions = (fields: ExemptionsType) => {
  return (
    Object.keys(fields).reduce((acc: number, key: any) => {
      const income = fields[key as keyof typeof fields];
      if (typeof income !== "number") {
        return acc;
      }
      if (
        [
          ExemptionFieldsEnum["Is metro city"] as string,
          ExemptionFieldsEnum["Rent paid"] as string,
          ExemptionFieldsEnum["Standard Deduction"] as string,
        ].includes(key)
      ) {
        return acc;
      }

      return acc + (Number(income) || 0);
    }, 0) + STANDARD_DEDUCTION.value
  );
};
