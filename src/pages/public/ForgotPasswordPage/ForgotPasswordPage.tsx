import { useNavigate } from 'react-router';
import classNames from 'classnames';
import { useForm } from '../../../hooks/useForm';
import styles from './ForgotPasswordPage.module.scss';
import TextField from '../../../common/TextField/TextField';
import { useAuthStore } from '../../../stores/auth/auth.store';
import AuthPageWrapper from '../../../components/AuthPageWrapper/AuthPageWrapper';
import Loader from '../../../components/Loader/Loader';
import { routes } from '../../../config/Router/routes';

type FormInputs = {
  email: string;
};

const INPUTS = [
  {
    name: 'email',
    type: 'text',
    label: 'Email address',
    value: '',
  },
];

const ForgotPasswordPage = () => {
  const { inputs, onInputChange, getSubmitInputs } =
    useForm<FormInputs>(INPUTS);
  const { remindPassword, passwordRemindIsLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = () => {
    const submitInputs: FormInputs = getSubmitInputs(inputs);
    remindPassword({ email: submitInputs.email });
  };

  return (
    <AuthPageWrapper>
      <div className={styles.forgotPasswordPageContainer}>
        <div className={styles.forgotPasswordFormContainer}>
          <h1 className={styles.title}>Reset your password</h1>
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
          <div className={styles.ctaContainer}>
            <button
              className={classNames('btn', styles.resetBtn)}
              onClick={handleSubmit}
            >
              {passwordRemindIsLoading ? <Loader /> : 'Reset password'}
            </button>
            <p className={styles.orDivider}>
              <span>or</span>
            </p>
            <button
              onClick={() => navigate(routes.loginPage)}
              className={classNames('btn', styles.loginBtn)}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </AuthPageWrapper>
  );
};

export default ForgotPasswordPage;
