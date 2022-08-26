import { useDispatch, useSelector } from "react-redux";
import { IncomeFieldsEnum } from "../../enum/incomeFields";
import { RootState } from "../../store";
import { changeIncomeField } from "../../store/reducers/incomeReducer";
import { ModalProps } from "../../type/modal";
import DetailedModal from "../DetailedModal";
import Toggle from "../Toggle";

function DetailedModal80CCD2(props: ModalProps) {
  const { onCancel } = props;

  const incomeFields = useSelector((state: RootState) => state.income);
  const year = useSelector((state: RootState) => state.year);
  const dispatch = useDispatch();
  const getFieldValue = (field: IncomeFieldsEnum) => {
    let value = Number(incomeFields[field].value) || 0;
    return { ...incomeFields[field], value };
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

  const body = (
    <table className="w-full">
      <tbody>
        <tr>
          <td>Are you a central or state government employee?</td>
          <td className="items-center flex justify-center">
            <Toggle
              isEnabled={getFieldValue(IncomeFieldsEnum.govtEmployee).isMonthly}
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

  return (
    <DetailedModal onCancel={onCancel} size="lg" title="80CCD(1B)">
      {body}
    </DetailedModal>
  );
}

export default DetailedModal80CCD2;
