import { ChangeEvent } from "react";

interface SelectProps {
  name: string;
  label: string;
  options: { key: string | number; value: string }[] | string[] | number[];
  defaultValue?: string;
  value: string | number;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}
export const Select = (props: SelectProps) => (
  <div className="w-1/3">
    <label className="block text-sm font-medium text-gray-700">
      {props.label}
    </label>
    <select
      name={props.name}
      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      defaultValue={props.defaultValue}
      value={props.value}
      onChange={props.onChange}
    >
      {props.options.map((op, index) => (
        <option key={index}>{op.value || op}</option>
      ))}
    </select>
  </div>
);
