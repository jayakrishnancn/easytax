import { useState } from "react";
interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  isValid?: (e: number) => boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
function Input(props: Props) {
  const { isValid = () => true, onChange = () => {} } = props;
  const [value, setValue] = useState(props.defaultValue);
  return (
    <input
      defaultValue={props.defaultValue ?? ""}
      min="0"
      autoComplete="off"
      className="bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="0"
      {...props}
      value={value}
      onChange={(e) => {
        const value = Number(e.target.value);
        if (isNaN(value)) {
          return;
        }
        if (!isValid(value)) {
          return;
        }
        setValue(value);
        onChange(e);
      }}
    />
  );
}

export default Input;
