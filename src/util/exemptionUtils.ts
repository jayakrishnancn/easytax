import { ExemptionsType } from "./../store/reducers/type";

export const calculateTotalExemptions = (fields: ExemptionsType) => {
  return Object.values(fields).reduce((acc, income) => {
    return acc + (Number(income) || 0);
  }, 0);
};
