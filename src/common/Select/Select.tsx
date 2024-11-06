import classNames from 'classnames';
import styles from './Select.module.scss';

type SelectOption = {
  label: string;
  value: string;
  selected?: boolean;
};

type Props = {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  elementClassName?: string;
  containerClassName?: string;
};

const Select = ({
  onChange,
  options,
  elementClassName,
  containerClassName,
}: Props) => {
  return (
    <select
      className={classNames(
        'select select-bordered',
        styles.selectRoot,
        elementClassName,
      )}
      onChange={onChange}
    >
      {options.map((option, i) => (
        <option
          key={`${option.label}-${i}`}
          selected={option.selected}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
