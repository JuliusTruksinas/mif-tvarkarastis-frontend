import classNames from 'classnames';
import styles from './TimeTextField.module.scss';
import { ChangeEvent } from 'react';

type Props = {
  value: string;
  name: string;
  label?: string;
  placeholder?: string;
  elementClassName?: string;
  containerClassName?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const TimeTextField = ({
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
      className={classNames(styles.timeTextFieldContainer, containerClassName)}
    >
      <p className={styles.label}>{label}</p>
      <input
        value={value}
        type="time"
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

export default TimeTextField;
