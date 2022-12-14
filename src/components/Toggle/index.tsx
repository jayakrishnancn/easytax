interface Props {
  onChange: (arg0: boolean) => void;
  isEnabled: boolean;
  label: string;
  testId: string;
}
function Toggle(props: Props) {
  const { onChange, isEnabled, label, testId } = props;

  return (
    <div className="p-2 h-full flex justify-center items-center">
      <label className=" inline-flex relative items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={isEnabled}
          onChange={(e) => onChange(!isEnabled)}
          data-testid={`toggle-input-${testId}`}
          aria-checked={isEnabled ? "true" : "false"}
        />
        <div className="w-11 h-6 bg-gray-400 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="h-6 pl-2 text-sm">{label}</span>
      </label>
    </div>
  );
}

export default Toggle;
