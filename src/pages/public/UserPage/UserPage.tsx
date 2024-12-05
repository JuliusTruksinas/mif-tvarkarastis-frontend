import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../config/Router/routes';
import styles from './UserPage.module.scss';

const UserPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.registerPage}>
      <h1 className={styles.title}>Settings</h1>
      <p className={styles.pageSubtitle}>
        View and manage your account settings
      </p>
      <div className={styles.formContainer}>
        <div className={styles.myInfoContainer}>
          <p className={styles.infoText}>Marius info</p>
        </div>
        <div className={styles.programContainer}>
          <div className={styles.profilePhotoContainer}>
            <img
              src="https://th.bing.com/th/id/R.9002144c9ad458b687e5aeb4bdb4e0bf?rik=s4enLQDyyN6m7A&pid=ImgRaw&r=0"
              alt="User Avatar"
              className={styles.profilePhoto}
            />
          </div>
          <div className={styles.programBoxSection}>
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
          </div>
          <div className={styles.programBoxSection}>
            <div className={styles.inputContainer}>
              <p className={styles.inputLabel}>Password</p>
              <input
                className={styles.inputField}
                type="password"
                name="password"
                required
              />
            </div>
            <div className={styles.selectContainer}>
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
            <div className={styles.programDetailsContainer}>
              <div className={styles.smallInputContainer}>
                <p className={styles.inputLabel}>Course</p>
                <select
                  className={classNames(
                    'select select-bordered focus:outline-none focus:ring-0',
                    styles.smallInputField,
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
              <div className={styles.smallInputContainer}>
                <p className={styles.inputLabel}>Group</p>
                <select
                  className={classNames(
                    'select select-bordered focus:outline-none focus:ring-0',
                    styles.smallInputField,
                  )}
                  name="group"
                  required
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </div>
              <div className={styles.smallInputContainer}>
                <p className={styles.inputLabel}>Subgroup</p>
                <select
                  className={classNames(
                    'select select-bordered focus:outline-none focus:ring-0',
                    styles.smallInputField,
                  )}
                  name="subgroup"
                  required
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.ctaContainer}>
        <button className={classNames('btn', styles.cancelBtn)}>Cancel</button>
        <button className={classNames('btn', styles.saveBtn)}>Save</button>
      </div>
    </div>
  );
};

export default UserPage;
