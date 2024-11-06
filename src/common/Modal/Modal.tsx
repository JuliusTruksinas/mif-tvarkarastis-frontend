import { useEffect, ReactNode } from 'react';
import { ReactSVG } from 'react-svg';
import classNames from 'classnames';
import closeIcon from '../../assets/icons/close.svg';
import styles from './Modal.module.scss';

type Props = {
  onClose: () => void;
  children: ReactNode;
  elementClassName?: string;
  containerClassName?: string;
};

const Modal = ({
  onClose,
  children,
  elementClassName,
  containerClassName,
}: Props) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.keyCode === 27) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEsc);

    document.body.classList.add(styles.noScroll);

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.classList.remove(styles.noScroll);
    };
  }, [onClose]);

  return (
    <div className={styles.modalOverlay}>
      <div className={classNames(styles.modalBody, elementClassName)}>
        <div className={styles.modalHeader}>
          <ReactSVG
            src={closeIcon}
            className={styles.closeIcon}
            onClick={onClose}
          />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
