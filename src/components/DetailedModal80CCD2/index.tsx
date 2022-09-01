import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DetailedExemptionFieldsEnum } from "../../enum/detailedExemptionFields";
import { IncomeFieldsEnum } from "../../enum/incomeFields";
import { RootState } from "../../store";
import { changeDetailedExemptionField } from "../../store/reducers/detailedExemptionsReducer";
import { ModalProps } from "../../type/modal";
import { currencyFormat } from "../../util/currencyFormat";
import DetailedModal from "../DetailedModal";
import Toggle from "../Toggle";

function DetailedModal80CCD2(props: ModalProps) {
  const { onCancel } = props;

  const detailedExemptions = useSelector(
    (state: RootState) => state.detailedExemptions
  );
  const income = useSelector((state: RootState) => state.income);
  const year = useSelector((state: RootState) => state.year);
  const dispatch = useDispatch();
  const getFieldValue = (field: DetailedExemptionFieldsEnum) => {
    let value = Number(detailedExemptions[field]?.value) || 0;
    return { ...detailedExemptions[field], value };
  };

  const changeFieldMonthly = (
    field: DetailedExemptionFieldsEnum,
    isMonthly: boolean
  ) => {
    dispatch(
      changeDetailedExemptionField({
        field,
        isMonthly,
        year,
      })
    );
  };
  const enabled = getFieldValue(
    DetailedExemptionFieldsEnum["80CCD_2-Govt Employee"]
  )?.isMonthly;

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
              testId={DetailedExemptionFieldsEnum["80CCD_2-Govt Employee"]}
              isEnabled={enabled}
              onChange={(isMonthly) =>
                changeFieldMonthly(
                  DetailedExemptionFieldsEnum["80CCD_2-Govt Employee"],
                  isMonthly
                )
              }
              label="Yes"
            />
          </td>
        </tr>
      </tbody>
    </table>
  );

  const footer = (
    <div>
      Max Limit :{" "}
      <span data-testid="max-limit">{currencyFormat(MAX_LIMIT)}</span>
    </div>
  );

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
