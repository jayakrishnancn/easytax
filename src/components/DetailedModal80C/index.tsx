import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DetailedExemptionFieldsEnum } from "../../enum/detailedExemptionFields";
import { ExemptionFieldsEnum } from "../../enum/exemptionFields";
import { RootState } from "../../store";
import { changeDetailedExemptionField } from "../../store/reducers/detailedExemptionsReducer";
import { changeExemptionField } from "../../store/reducers/exemptionsReducer";
import { ModalProps } from "../../type/modal";
import { currencyFormat } from "../../util/currencyFormat";
import DetailedModal from "../DetailedModal";
import Input from "../Input";
import ProgressBar from "../Progressbar";
import Toggle from "../Toggle";

const MAX = 1_50_000;

function DetailedModal80C(props: ModalProps) {
  const { onCancel } = props;
  const dispatch = useDispatch();

  const exemptions = useSelector(
    (state: RootState) => state.detailedExemptions
  );
  const year = useSelector((state: RootState) => state.year);

  const handleToggleChange = (
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

  const handleValueChange = (
    field: DetailedExemptionFieldsEnum,
    value: number
  ) => {
    dispatch(
      changeDetailedExemptionField({
        field,
        value,
        year,
      })
    );
  };

  const _80C = useMemo<{ id: DetailedExemptionFieldsEnum; title: string }[]>(
    () => [
      {
        id: DetailedExemptionFieldsEnum["_80C-Employee provident fund"],
        title: "Employee provident fund",
      },
      {
        id: DetailedExemptionFieldsEnum[
          "_80C-Equity-linked savings scheme (ELSS)"
        ],
        title: "Equity-linked savings scheme (ELSS)",
      },
      {
        id: DetailedExemptionFieldsEnum["_80C-Life insurance"],
        title: "Life insurance",
      },
      {
        id: DetailedExemptionFieldsEnum["_80C-Public provident dund"],
        title: "Public provident dund",
      },
      {
        id: DetailedExemptionFieldsEnum["_80C-House loan principal"],
        title: "House loan principal",
      },
      {
        id: DetailedExemptionFieldsEnum["_80C-National pensoin scheme"],
        title: "National pensoin scheme",
      },
      {
        id: DetailedExemptionFieldsEnum["_80C-Tuitio fees"],
        title: "Tuitio fees",
      },
      { id: DetailedExemptionFieldsEnum["_80C-Others"], title: "Others" },
    ],
    []
  );

  const current = useMemo(() => {
    return Math.min(
      1_50_000,
      _80C.reduce((ac, i) => {
        const { value = 0, isMonthly = false } = { ...exemptions[i.id] };
        return ac + value * (isMonthly ? 12 : 1);
      }, 0)
    );
  }, [_80C, exemptions]);

  useEffect(() => {
    dispatch(
      changeExemptionField({
        field: ExemptionFieldsEnum["80C"],
        value: current,
        year,
      })
    );
  }, [current, dispatch, year]);

  return (
    <DetailedModal
      onCancel={onCancel}
      title="80C"
      footerItems={
        <table className="table-fixed w-full text-right">
          <tbody>
            <tr>
              <td>
                <ProgressBar current={current} max={MAX} />
              </td>
              <td className="px-2 flex justify-end text-right">
                <table className="">
                  <tbody>
                    <tr>
                      <td className="text-right pr-2">Total</td>
                      <td>{currencyFormat(current)}</td>
                    </tr>
                    <tr>
                      <td className="text-right pr-2">Remaining</td>
                      <td>{currencyFormat(Math.max(0, MAX - current))}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      }
    >
      <table className="border table-fixed income-table w-full mb-8 text-left">
        <tbody>
          {_80C.map(({ title, id }) => (
            <tr key={id}>
              <td>{title}</td>
              <td>
                <Toggle
                  isEnabled={!!exemptions[id]?.isMonthly}
                  onChange={(value: boolean) => handleToggleChange(id, value)}
                  label="Monthly?"
                />
              </td>
              <td>
                <Input
                  value={exemptions[id]?.value}
                  onChange={(value: number) => handleValueChange(id, value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </DetailedModal>
  );
}

export default DetailedModal80C;
