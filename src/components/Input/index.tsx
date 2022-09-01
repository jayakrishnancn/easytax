interface Props {
  onChange: (e: number) => void;
  value: number | string;
  min?: number;
  max?: number;
  disabled?: boolean;
  testId?: string;
}

function Input(props: Props) {
  const {
    onChange,
    min = 0,
    max = Infinity,
    disabled = false,
    testId = "",
    ...rest
  } = props;

  const validField = (value: number) => {
    if (isNaN(value)) {
      return false;
    }
    if (value >= min && value <= max) {
      return true;
    }
    return false;
  };

  return (
    <input
      type="text"
      autoComplete="off"
      className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
      placeholder="0"
      disabled={disabled}
      data-testid={"input-" + testId}
      {...rest}
      onChange={(e) => {
        const value = Number(e.target.value);

        if (!validField(value)) {
          return;
        }
        onChange(value);
      }}
    />
  );
}

export default Input;
