import classNames from 'classnames';
import { NavLink, useNavigate } from 'react-router-dom';
import { routes } from '../../../config/Router/routes';
import styles from './LoginPage.module.scss';
import { useForm } from '../../../hooks/useForm';
import TextField from '../../../common/TextField/TextField';
import { useAuthStore } from '../../../stores/auth/auth.store';
import AuthPageWrapper from '../../../components/AuthPageWrapper/AuthPageWrapper';
import Loader from '../../../components/Loader/Loader';

type FormInputs = {
  email: string;
  password: string;
};

const INPUTS = [
  {
    name: 'email',
    type: 'text',
    label: 'Email address',
    value: '',
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password',
    value: '',
  },
];

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loginIsLoading } = useAuthStore();
  const { inputs, onInputChange, getSubmitInputs } =
    useForm<FormInputs>(INPUTS);

  const handleLogin = () => {
    const submitInputs: FormInputs = getSubmitInputs(inputs);

    login({
      email: submitInputs.email,
      password: submitInputs.password,
    });
  };

  return (
    <AuthPageWrapper>
      <div className={styles.loginPageContainer}>
        <div className={styles.loginFormContainer}>
          <h1 className={styles.title}>
            Welcome to
            <br />
            Bug Busters
          </h1>
          {inputs.map((input) => (
            <TextField
              key={input.name}
              name={input.name}
              value={input.value}
              type={input.type}
              label={input.label}
              onChange={onInputChange}
              containerClassName={styles.inputContainer}
              labelClassName={styles.inputLabel}
              elementClassName={styles.inputField}
              options={input.options}
            />
          ))}
          <NavLink
            to={routes.forgotPasswordPage}
            className={styles.forgotPasswordLabel}
          >
            Forgot password?
          </NavLink>
          <div className={styles.ctaContainer}>
            <button
              onClick={handleLogin}
              className={classNames('btn', styles.loginBtn)}
            >
              {loginIsLoading ? <Loader /> : 'Log in'}
            </button>
            <p className={styles.orDivider}>
              <span>or</span>
            </p>
            <button
              onClick={() => navigate(routes.registerPage)}
              className={classNames('btn', styles.registerBtn)}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </AuthPageWrapper>
  );
};

export default LoginPage;
