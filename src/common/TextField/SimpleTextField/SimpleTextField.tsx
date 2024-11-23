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
  labelClassName?: string;
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
  labelClassName,
}: Props) => {
  return (
    <div
      className={classNames(
        styles.simpleTextFieldContainer,
        containerClassName,
      )}
    >
      <p className={classNames(styles.label, labelClassName)}>{label}</p>
      <input
        value={value}
        type={isPassword ? 'password' : 'text'}
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

export default SimpleTextField;
