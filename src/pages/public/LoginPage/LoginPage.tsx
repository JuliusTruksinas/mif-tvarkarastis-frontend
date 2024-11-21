import styles from './LoginPage.module.scss';
import classNames from 'classnames';

const LoginPage = () => (
  <div className={styles.loginPageContainer}>
    <div className={styles.loginFormContainer}>
      <h1 className={styles.title}>
        Welcome to <br /> Bug Busters
      </h1>
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
      <div className={styles.inputContainer}>
        <p className={styles.inputLabel}>Password</p>
        <input
          className={classNames(
            'input input-bordered w-full focus:outline-none focus:ring-0',
            styles.inputField,
          )}
          type="password"
        />
      </div>
      <p className={styles.forgotPasswordLabel}>Forgot password?</p>
      <div className={styles.ctaContainer}>
        <button className={classNames('btn', styles.loginBtn)}>Log in</button>
        <p className={styles.orDivider}>or</p>
        <button className={classNames('btn', styles.registerBtn)}>
          Register
        </button>
      </div>
    </div>
  </div>
);

export default LoginPage;
