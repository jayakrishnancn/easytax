import { ExemptionFieldsEnum } from "./../enum/exemptionFields";

export const initialDefaultState = {
  [ExemptionFieldsEnum["80C"]]: 0,
  [ExemptionFieldsEnum["80DD"]]: 0,
  [ExemptionFieldsEnum["80CCD_1B_"]]: 0,
  [ExemptionFieldsEnum["80D"]]: 0,
  [ExemptionFieldsEnum["Professional_Tax"]]: 0,
  [ExemptionFieldsEnum["80DDB"]]: 0,
  [ExemptionFieldsEnum["Section_24_B_"]]: 0,
  [ExemptionFieldsEnum["80CCD_2_"]]: 0,
  [ExemptionFieldsEnum["80EEA"]]: 0,
  [ExemptionFieldsEnum["Food_Coupons"]]: 0,
  [ExemptionFieldsEnum["80U"]]: 0,
  [ExemptionFieldsEnum["80EEB"]]: 0,
  [ExemptionFieldsEnum["80E"]]: 0,
  [ExemptionFieldsEnum["80G"]]: 0,
  [ExemptionFieldsEnum["80GGA"]]: 0,
  [ExemptionFieldsEnum["80GGC"]]: 0,
  [ExemptionFieldsEnum["Other_Exemptions"]]: 0,
  [ExemptionFieldsEnum["Standard Deduction"]]: 50_000,
  [ExemptionFieldsEnum["HRA"]]: 0,
  [ExemptionFieldsEnum["Rent paid"]]: 0,
  [ExemptionFieldsEnum["Is metro city"]]: false,
};

enum STORE_KEYS {
  Exemptions = "Exemptions",
}

export const getExemptionData = () => {
  let data = initialDefaultState;
  try {
    const tmp = localStorage.getItem(STORE_KEYS.Exemptions);
    if (tmp) {
      data = JSON.parse(tmp);
    }
  } catch {}

  return data;
};

export const saveExemptionData = (value: any): void => {
  localStorage.setItem(STORE_KEYS.Exemptions, JSON.stringify(value));
};
