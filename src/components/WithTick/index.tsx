import Tick from "../Tick";

function WithTick(props: any) {
  return (
    <div className="flex justify-between">
      <span>{props.if && <Tick />}</span>
      <span>{props.text || ""}</span>
    </div>
  );
}
export default WithTick;
