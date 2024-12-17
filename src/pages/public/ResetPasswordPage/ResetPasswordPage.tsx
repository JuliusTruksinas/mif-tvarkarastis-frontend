import styles from './ResetPasswordPage.module.scss';
import classNames from 'classnames';

const ResetPasswordPage = () => {
  return (
    <div className={styles.resetPasswordPageContainer}>
      <div className={styles.resetPasswordFormContainer}>
        <h1 className={styles.title}>Reset your password</h1>
        <div className={styles.inputContainer}>
          <p className={styles.inputLabel}>New password</p>
          <input
            className={classNames(
              'input input-bordered w-full focus:outline-none focus:ring-0',
              styles.inputField,
            )}
          />
        </div>
        <div className={styles.inputContainer}>
          <p className={styles.inputLabel}>Repeat password</p>
          <input
            className={classNames(
              'input input-bordered w-full focus:outline-none focus:ring-0',
              styles.inputField,
            )}
          />
        </div>
        <button className={classNames('btn', styles.resetBtn)}>Reset</button>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
