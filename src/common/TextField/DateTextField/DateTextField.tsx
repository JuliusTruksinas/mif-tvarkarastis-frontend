import { ChangeEvent } from 'react';
import classNames from 'classnames';
import styles from './DateTextField.module.scss';

type Props = {
  value: string;
  name: string;
  label?: string;
  placeholder?: string;
  elementClassName?: string;
  containerClassName?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const DateTextField = ({
  value,
  name,
  label,
  placeholder,
  elementClassName,
  containerClassName,
  onChange,
}: Props) => {
  return (
    <div
      className={classNames(styles.dateTextFieldContainer, containerClassName)}
    >
      <p className={styles.label}>{label}</p>
      <input
        value={value}
        type="date"
        name={name}
        placeholder={placeholder}
        className={classNames(
          'input input-bordered focus:outline-none focus:ring-0',
          styles.inputField,
          elementClassName,
        )}
        onChange={onChange}
      />
    </div>
  );
};

export default DateTextField;
