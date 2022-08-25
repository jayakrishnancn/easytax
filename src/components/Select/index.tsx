interface Props {
  onChange: (arg0: any) => void;
  values: { label?: string | number; value: string | number }[];
  [k: string]: any;
}
function Select(props: Props) {
  const { onChange, values = [], ...rest } = props;
  return (
    <select
      className="pr-8 block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 rounded-lg p-2.5 text-sm"
      {...rest}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    >
      {values.map(({ value, label = value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}
export default Select;
