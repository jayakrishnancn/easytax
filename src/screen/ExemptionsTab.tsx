import { useCallback, useEffect, useMemo, useState } from "react";
import { CgMoreR } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import Description from "../components/Description";
import DetailedModal80C from "../components/DetailedModal80C";
import DetailedModal80CCD2 from "../components/DetailedModal80CCD2";
import DetailedModal80DD from "../components/DetailedModal80DD";
import Input from "../components/Input";
import ProgressBar from "../components/Progressbar";
import Toggle from "../components/Toggle";
import WithTick from "../components/WithTick";
import { EXEMPTIONS } from "../constants/exemptionFields";
import { DetailedExemptionFieldsEnum } from "../enum/detailedExemptionFields";
import { ExemptionFieldsEnum } from "../enum/exemptionFields";
import { RootState } from "../store";
import { changeExemptionField } from "../store/reducers/exemptionsReducer";
import { calculateTotalExemptions } from "../util/calculations/exemptionUtils";
import HRA from "../util/calculations/hra";
import { currencyFormat } from "../util/currencyFormat";
function ExemptionsTab() {
  const [exemptionsFieldSorted, setExemptionsFieldSorted] =
    useState<string>("0");
  const [detailedModal, setDetailedModal] =
    useState<ExemptionFieldsEnum | null>(null);
  const exemptions = useSelector((state: RootState) => state.exemptions);
  const detailedExemptions = useSelector(
    (state: RootState) => state.detailedExemptions
  );
  const year = useSelector((state: RootState) => state.year);
  const income = useSelector((state: RootState) => state.income);

  const dispatch = useDispatch();

  const getFieldValue = useCallback(
    (field: ExemptionFieldsEnum) => {
      let value = Number(exemptions[field]) || 0;
      return value;
    },
    [exemptions]
  );

  const changeField = (field: ExemptionFieldsEnum, value: number | boolean) => {
    dispatch(
      changeExemptionField({
        field,
        value,
        year,
      })
    );
  };

  const totalExemptions = useMemo(() => {
    return currencyFormat(calculateTotalExemptions(exemptions));
  }, [exemptions]);

  useEffect(() => {
    if (year !== exemptionsFieldSorted) {
      EXEMPTIONS.sort((a, b) => {
        let bvalue = Number(exemptions[b.title]) || Number(b.value) || 0;
        let aValue = Number(exemptions[a.title]) || Number(a.value) || 0;
        return bvalue - aValue;
      });
      setExemptionsFieldSorted(year);
    }
  }, [exemptions, exemptionsFieldSorted, year]);
  const rentPaid = getFieldValue(ExemptionFieldsEnum["Rent paid"]);
  const isMetro = exemptions[ExemptionFieldsEnum["Is metro city"]];

  const hra = useMemo(() => {
    const salaryBasicDA = income["Salary (Basic + DA)"];
    const salaryHRA = income["Salary (HRA)"];

    const tmp = new HRA(
      (Number(salaryBasicDA?.value) || 0) * (salaryBasicDA?.isMonthly ? 12 : 1),
      (Number(salaryHRA?.value) || 0) * (salaryHRA?.isMonthly ? 12 : 1),
      rentPaid,
      isMetro
    );

    dispatch(
      changeExemptionField({
        value: tmp.calcaulteMaxHRA(),
        field: ExemptionFieldsEnum.HRA,
        year,
      })
    );

    return tmp;
  }, [dispatch, income, isMetro, rentPaid, year]);

  const isMetroCity = !!exemptions[ExemptionFieldsEnum["Is metro city"]];

  const getMaximumValue = useCallback(
    (title: ExemptionFieldsEnum): number | null => {
      const percent = detailedExemptions[
        DetailedExemptionFieldsEnum["80CCD_2-Govt Employee"]
      ]?.isMonthly
        ? 0.14
        : 0.1;
      if (title === ExemptionFieldsEnum["80CCD_2_"]) {
        const salaryBasicDA = income["Salary (Basic + DA)"];
        return Math.floor(
          percent *
            ((Number(salaryBasicDA?.value) || 0) *
              (salaryBasicDA?.isMonthly ? 12 : 1))
        );
      } else if (title === ExemptionFieldsEnum["80DD"]) {
        const severe =
          detailedExemptions[
            DetailedExemptionFieldsEnum["80DD-severe disability"]
          ]?.isMonthly;
        return severe ? 1_25_000 : 75_000;
      }
      return null;
    },
    [detailedExemptions, income]
  );

  const getDetailedModal = (field: ExemptionFieldsEnum) => {
    const close = () => setDetailedModal(null);

    switch (field) {
      case ExemptionFieldsEnum["80C"]:
        return <DetailedModal80C onCancel={close} />;
      case ExemptionFieldsEnum["80CCD_2_"]:
        return <DetailedModal80CCD2 onCancel={close} />;
      case ExemptionFieldsEnum["80DD"]:
        return <DetailedModal80DD onCancel={close} />;
    }
    return null;
  };

  return (
    <table className="table-fixed income-table w-full mt-4 mb-8 text-left">
      <thead>
        <tr className="bg-orange-600 text-white">
          <td colSpan={2}>Total Exemptions & deductions</td>
          <td className="text-right">{totalExemptions}</td>
        </tr>
      </thead>
      <tbody>
        <tr className="bg-gray-200">
          <td>HRA</td>
          <td>
            <Toggle
              isEnabled={exemptions[ExemptionFieldsEnum["Is metro city"]]}
              onChange={(value: boolean) => {
                changeField(ExemptionFieldsEnum["Is metro city"], value);
              }}
              label="Metro city?"
            />
          </td>
          <td className="text-center">
            {currencyFormat(hra.calcaulteMaxHRA())}
          </td>
        </tr>
        <tr className="bg-gray-200">
          <td>Rent per month</td>
          <td>
            <ProgressBar
              current={getFieldValue(ExemptionFieldsEnum["Rent paid"])}
              max={hra.optimalRent()}
            />
          </td>
          <td>
            <Input
              value={getFieldValue(ExemptionFieldsEnum["Rent paid"])}
              onChange={(value) => {
                changeField(ExemptionFieldsEnum["Rent paid"], value);
              }}
            />
          </td>
        </tr>
        <tr className="bg-gray-200">
          <td colSpan={2} className="text-right">
            <WithTick
              if={hra.current === 0}
              text="House Rent Paid - 10% of Basic + DA"
            />
          </td>
          <td>{currencyFormat(hra.A_10perBaseAndDA)}</td>
        </tr>
        <tr className="bg-gray-200">
          <td colSpan={2} className="text-right">
            <WithTick
              if={hra.current === 1}
              text={`${isMetroCity ? 50 : 40}% of Basic + DA in
              ${isMetroCity ? "" : " Non "} Metros`}
            />
          </td>
          <td>{currencyFormat(hra.B_50PerBaseAndDA)}</td>
        </tr>
        <tr className="bg-gray-200">
          <td colSpan={2} className="text-right">
            <WithTick if={hra.current === 2} text="HRA Received" />
          </td>
          <td>{currencyFormat(hra.HRAReceived)}</td>
        </tr>

        {EXEMPTIONS.map(
          ({
            title,
            value,
            max = Infinity,
            isDisabled,
            details,
            hasModal = false,
            info = null,
          }) => (
            <tr key={title}>
              <td>
                <Description info={info} title={title} details={details} />
              </td>
              <td>
                <ProgressBar
                  current={value ?? Number(exemptions[title])}
                  max={getMaximumValue(title) ?? max}
                />
              </td>

              <td>
                <div className="flex justify-between items-center gap-2">
                  <Input
                    disabled={isDisabled}
                    value={value ?? getFieldValue(title)}
                    onChange={(value) => {
                      changeField(title, value);
                    }}
                    max={getMaximumValue(title) ?? max}
                  />
                  {hasModal && (
                    <CgMoreR
                      onClick={() => setDetailedModal(title)}
                      size={"2em"}
                      className="cursor-pointer"
                      color="black"
                    />
                  )}
                </div>
              </td>
            </tr>
          )
        )}

        {detailedModal && getDetailedModal(detailedModal)}
      </tbody>
    </table>
  );
}
export default ExemptionsTab;
