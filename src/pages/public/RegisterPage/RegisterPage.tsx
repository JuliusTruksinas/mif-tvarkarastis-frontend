import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../config/Router/routes';
import styles from './RegisterPage.module.scss';

const RegisterPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.registerPage}>
      <div className={styles.registerFormContainer}>
        <h1 className={styles.title}>
          Welcome to
          <br />
          Bug Busters
        </h1>

        <div className={styles.inputContainer}>
          <p className={styles.inputLabel}>First Name</p>
          <input
            className={styles.inputField}
            type="text"
            name="first_name"
            required
          />
        </div>

        <div className={styles.inputContainer}>
          <p className={styles.inputLabel}>Last Name</p>
          <input
            className={styles.inputField}
            type="text"
            name="last_name"
            required
          />
        </div>

        <div className={styles.inputContainer}>
          <p className={styles.inputLabel}>Email Address</p>
          <input
            className={styles.inputField}
            type="email"
            name="email"
            required
          />
        </div>

        <div className={styles.inputContainer}>
          <p className={styles.inputLabel}>Password</p>
          <input
            className={styles.inputField}
            type="password"
            name="password"
            required
          />
        </div>

        <div className={styles.inputContainer}>
          <p className={styles.inputLabel}>Program Name</p>
          <select
            className={classNames(
              'select select-bordered w-full focus:outline-none focus:ring-0',
              styles.inputField,
            )}
            name="program"
            required
          >
            <option disabled selected>
              Select your program
            </option>
            <option value="Informacinių sistemų inžinerija">
              Informacinių sistemų inžinerija
            </option>
          </select>
        </div>
        <div className={styles.programDetailsSection}>
          <div className={styles.selectContainer}>
            <p className={styles.inputLabel}>Course</p>
            <select
              className={classNames(
                'select select-bordered w-full focus:outline-none focus:ring-0',
                styles.inputField,
              )}
              name="course"
              required
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          <div className={styles.selectContainer}>
            <p className={styles.inputLabel}>Group</p>
            <select
              className={classNames(
                'select select-bordered w-full focus:outline-none focus:ring-0',
                styles.inputField,
              )}
              name="group"
              required
            >
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className={styles.selectContainer}>
            <p className={styles.inputLabel}>Subgroup</p>
            <select
              className={classNames(
                'select select-bordered w-full focus:outline-none focus:ring-0',
                styles.inputField,
              )}
              name="subgroup"
              required
            >
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
        </div>

        <div className={styles.ctaContainer}>
          <button className={classNames('btn', styles.registerBtn)}>
            Register
          </button>
          <div className={styles.orDivider}>
            <span>or</span>
          </div>
          <button
            onClick={() => navigate(routes.loginPage)}
            className={classNames('btn', styles.loginBtn)}
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
