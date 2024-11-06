import { ChangeEvent } from 'react';
import classNames from 'classnames';
import styles from './SimpleTextField.module.scss';

type Props = {
  value: string;
  name: string;
  label?: string;
  placeholder?: string;
  elementClassName?: string;
  containerClassName?: string;
  isPassword?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const SimpleTextField = ({
  value,
  name,
  label,
  placeholder,
  elementClassName,
  containerClassName,
  onChange,
  isPassword,
}: Props) => {
  return (
    <div
      className={classNames(
        styles.simpleTextFieldContainer,
        containerClassName,
      )}
    >
      <p className={styles.label}>{label}</p>
      <input
        value={value}
        type={isPassword ? 'password' : 'text'}
        name={name}
        placeholder={placeholder}
        className={classNames(
          'input input-bordered',
          styles.inputField,
          elementClassName,
        )}
        onChange={onChange}
      />
    </div>
  );
};

export default SimpleTextField;
