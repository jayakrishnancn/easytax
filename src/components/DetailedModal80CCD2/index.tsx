import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IncomeFieldsEnum } from "../../enum/incomeFields";
import { RootState } from "../../store";
import { changeIncomeField } from "../../store/reducers/incomeReducer";
import { ModalProps } from "../../type/modal";
import { currencyFormat } from "../../util/currencyFormat";
import DetailedModal from "../DetailedModal";
import Toggle from "../Toggle";

function DetailedModal80CCD2(props: ModalProps) {
  const { onCancel } = props;

  const income = useSelector((state: RootState) => state.income);
  const year = useSelector((state: RootState) => state.year);
  const dispatch = useDispatch();
  const getFieldValue = (field: IncomeFieldsEnum) => {
    let value = Number(income[field].value) || 0;
    return { ...income[field], value };
  };

  const changeFieldMonthly = (field: IncomeFieldsEnum, isMonthly: boolean) => {
    dispatch(
      changeIncomeField({
        field,
        isMonthly,
        year,
      })
    );
  };
  const enabled = getFieldValue(IncomeFieldsEnum.govtEmployee).isMonthly;

  const MAX_LIMIT = useMemo(() => {
    const percent = enabled ? 0.14 : 0.1;
    const salaryBasicDA = income[IncomeFieldsEnum.salary_basicDA];
    return Math.floor(
      percent *
        ((Number(salaryBasicDA?.value) || 0) *
          (salaryBasicDA.isMonthly ? 12 : 1))
    );
  }, [enabled, income]);

  const body = (
    <table className="w-full">
      <tbody>
        <tr>
          <td>Are you a central or state government employee?</td>
          <td className="items-center flex justify-center">
            <Toggle
              isEnabled={enabled}
              onChange={(isMonthly) =>
                changeFieldMonthly(IncomeFieldsEnum.govtEmployee, isMonthly)
              }
              label="Yes"
            />
          </td>
        </tr>
      </tbody>
    </table>
  );

  const footer = <div>Max Limit : {currencyFormat(MAX_LIMIT)} </div>;

  return (
    <DetailedModal
      footerItems={footer}
      onCancel={onCancel}
      size="lg"
      title="80CCD(1B)"
    >
      {body}
    </DetailedModal>
  );
}

export default DetailedModal80CCD2;
