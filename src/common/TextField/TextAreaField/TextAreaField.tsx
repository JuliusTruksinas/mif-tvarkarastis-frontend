import { ChangeEvent } from 'react';
import classNames from 'classnames';
import styles from './TextAreaField.module.scss';

type Props = {
  value: string;
  name: string;
  label?: string;
  placeholder?: string;
  elementClassName?: string;
  containerClassName?: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

const TextAreaField = ({
  value,
  name,
  label,
  placeholder,
  elementClassName,
  containerClassName,
  onChange,
}: Props) => {
  return (
    <div className={styles.textAreaFieldContainer}>
      <p className={styles.label}>{label}</p>
      <textarea
        className={classNames(
          'textarea textarea-bordered focus:outline-none focus:ring-0',
          styles.inputField,
          elementClassName,
        )}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
      >
        {value}
      </textarea>
    </div>
  );
};

export default TextAreaField;
