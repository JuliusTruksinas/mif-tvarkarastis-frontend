import classNames from 'classnames';
import styles from './CheckBoxTextField.module.scss';

type Props = {
  value: string;
  name: string;
  label?: string;
  elementClassName?: string;
  containerClassName?: string;
  onCheckboxChange?: (name: string, value: string) => void;
};

const CheckBoxTextField = ({
  name,
  value,
  label,
  containerClassName,
  elementClassName,
  onCheckboxChange,
}: Props) => {
  return (
    <div
      className={classNames(
        styles.checkBoxTextFieldContainer,
        containerClassName,
      )}
    >
      <input
        name={name}
        type="checkbox"
        className={classNames('checkbox checkbox-primary', elementClassName)}
        checked={value === '1'}
        onChange={() => {
          onCheckboxChange && onCheckboxChange(name, value === '0' ? '1' : '0');
        }}
        value={value}
      />
      <p className="label-text">{label}</p>
    </div>
  );
};

export default CheckBoxTextField;
