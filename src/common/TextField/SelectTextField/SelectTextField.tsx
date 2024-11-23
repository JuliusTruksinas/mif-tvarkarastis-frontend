import classNames from 'classnames';
import styles from './SelectTextField.module.scss';
import { ChangeEvent } from 'react';

export type SelectOption = {
  label: string;
  value: string;
  selected?: boolean;
};

type Props = {
  name: string;
  value: string;
  options: SelectOption[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  elementClassName?: string;
  containerClassName?: string;
  label?: string;
  placeholder?: string;
  labelClassName?: string;
};

const SelectTextField = ({
  name,
  value,
  options,
  onChange,
  elementClassName,
  containerClassName,
  label,
  placeholder,
  labelClassName,
}: Props) => {
  return (
    <div
      className={classNames(
        styles.selectTextFieldContainerRoot,
        containerClassName,
      )}
    >
      <p className={classNames(styles.labelRoot, labelClassName)}>{label}</p>
      <select
        className={classNames(
          'select select-bordered focus:outline-none focus:ring-0',
          styles.selectRoot,
          elementClassName,
        )}
        onChange={onChange}
        name={name}
        value={value}
      >
        {options.map((option, i) => (
          <option key={`${option.label}-${i}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectTextField;
