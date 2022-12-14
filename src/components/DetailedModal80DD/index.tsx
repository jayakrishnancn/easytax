import { useDispatch, useSelector } from "react-redux";
import { DetailedExemptionFieldsEnum } from "../../enum/detailedExemptionFields";
import { RootState } from "../../store";
import { changeDetailedExemptionField } from "../../store/reducers/detailedExemptionsReducer";
import { ModalProps } from "../../type/modal";
import { currencyFormat } from "../../util/currencyFormat";
import DetailedModal from "../DetailedModal";
import Toggle from "../Toggle";

function DetailedModal80DD(props: ModalProps) {
  const { onCancel } = props;

  const detailedExemptions = useSelector(
    (state: RootState) => state.detailedExemptions
  );
  const year = useSelector((state: RootState) => state.year);
  const dispatch = useDispatch();

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
  const FIELD = DetailedExemptionFieldsEnum["80DD-severe disability"];
  const body = (
    <table className="w-full">
      <tbody>
        <tr>
          <td>Disability is more than 80%?</td>
          <td className="items-center flex justify-center">
            <Toggle
              testId={DetailedExemptionFieldsEnum["80DD-severe disability"]}
              isEnabled={!!detailedExemptions[FIELD]?.isMonthly}
              onChange={(isMonthly) => changeFieldMonthly(FIELD, isMonthly)}
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
      <span data-testid="max-limit">
        {currencyFormat(
          !!detailedExemptions[FIELD]?.isMonthly ? 1_25_000 : 75_000
        )}{" "}
      </span>
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

export default DetailedModal80DD;
