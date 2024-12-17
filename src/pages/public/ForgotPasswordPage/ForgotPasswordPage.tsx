import styles from './ForgotPasswordPage.module.scss';
import classNames from 'classnames';

const ForgotPasswordPage = () => {
  return (
    <div className={styles.forgotPasswordPageContainer}>
      <div className={styles.forgotPasswordFormContainer}>
        <h1 className={styles.title}>Reset your password</h1>

        <div className={styles.inputContainer}>
          <p className={styles.inputLabel}>Email adress</p>
          <input
            className={classNames(
              'input input-bordered w-full focus:outline-none focus:ring-0',
              styles.inputField,
            )}
            type="email"
          />
        </div>
        <button className={classNames('btn', styles.resetBtn)}>
          Reset password
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
