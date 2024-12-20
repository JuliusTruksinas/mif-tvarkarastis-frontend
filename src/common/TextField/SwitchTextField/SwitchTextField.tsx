import classNames from 'classnames';
import styles from './SwitchTextField.module.scss';

type Props = {
  value: string;
  name: string;
  label?: string;
  elementClassName?: string;
  containerClassName?: string;
  onCheckboxChange?: (name: string, value: string) => void;
};

const SwitchTextField = ({
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
        styles.switchTextFieldContainer,
        containerClassName,
      )}
    >
      <p className="label-text">{label}</p>
      <input
        name={name}
        type="checkbox"
        className={classNames('toggle toggle-primary', elementClassName)}
        checked={value === '1'}
        onChange={() => {
          onCheckboxChange && onCheckboxChange(name, value === '0' ? '1' : '0');
        }}
        value={value}
      />
    </div>
  );
};

export default SwitchTextField;
