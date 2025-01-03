import Loader from '../../components/Loader/Loader';
import styles from './Button.module.scss';
import classNames from 'classnames';

export type ButtonVariant = 'primary' | 'secondary' | 'info' | 'danger';

type Props = {
  variant: ButtonVariant;
  label: string;
  onClick: () => void;
  className?: string;
  isLoading?: boolean;
};

const Button = ({ variant, label, onClick, className, isLoading }: Props) => {
  return (
    <button
      className={classNames(
        'btn',
        styles.buttonBase,
        {
          [styles.primaryButtonVariant]: variant === 'primary',
          [styles.secondaryButtonVariant]: variant === 'secondary',
          [styles.infoButtonVariant]: variant === 'info',
          [styles.dangerButtonVariant]: variant === 'danger',
        },
        className,
      )}
      onClick={onClick}
    >
      {isLoading ? <Loader /> : label}
    </button>
  );
};

export default Button;
