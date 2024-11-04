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
  className?: string;
};

const Select = ({ onChange, options, className }: Props) => {
  return (
    <select
      className={classNames(
        'select select-bordered',
        styles.selectRoot,
        className,
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
