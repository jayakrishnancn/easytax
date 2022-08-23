interface Props {
  max: number;
  current: number;
}

function ProgressBar(props: Props) {
  let { current = 0, max = 1 } = props;
  if (current > max) current = max;
  let width = `${(current / (max || 1)) * 100}%`;
  if (max === Infinity) {
    width = "0%";
  }
  let colorClass = "bg-blue-600";
  if (max === current) {
    colorClass = "bg-green-600";
  }
  if (current < max * 0.3) {
    colorClass = "bg-red-600";
  }
  let trackColor = "bg-red-200";
  if (current != 0) {
    trackColor = "bg-gray-100";
  }
  return (
    <div
      className={
        "w-full mt-2 rounded-full h-1.5 mb-4 dark:bg-gray-700 " + trackColor
      }
    >
      <div
        className={"h-1.5 rounded-full dark:bg-gray-300 " + colorClass}
        style={{ width }}
      ></div>
    </div>
  );
}

export default ProgressBar;
