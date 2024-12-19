import { useEffect, useState } from 'react';
import { useForm } from '../../../hooks/useForm';
import styles from './ResetPasswordPage.module.scss';
import classNames from 'classnames';
import TextField from '../../../common/TextField/TextField';
import { useNavigate, useParams } from 'react-router';
import AuthPageWrapper from '../../../components/AuthPageWrapper/AuthPageWrapper';
import { useAuthStore } from '../../../stores/auth/auth.store';
import LoadingPage from '../LoadingPage/LoadingPage';
import { routes } from '../../../config/Router/routes';
import Loader from '../../../components/Loader/Loader';

type FormInputs = {
  newPassword: string;
  repeatedPassword: string;
};

const INPUTS = [
  {
    name: 'newPassword',
    type: 'password',
    label: 'New password',
    value: '',
  },
  {
    name: 'repeatedPassword',
    type: 'password',
    label: 'Repeat password',
    value: '',
  },
];

const ResetPasswordPage = () => {
  const { inputs, onInputChange, getSubmitInputs } =
    useForm<FormInputs>(INPUTS);
  const {
    checkResetPasswordToken,
    resetPasswordTokenExistsIsLoading,
    resetPasswordTokenExists,
    resetPassword,
    passwordResetIsLoading,
    passwordResetIsSuccess,
    resetPasswordTokenExistsIsSuccess,
  } = useAuthStore();
  const navigate = useNavigate();

  const [resetPasswordToken, setResetPasswordToken] = useState<string>('');

  const { resetPasswordTokenParam } = useParams();

  useEffect(() => {
    if (resetPasswordTokenParam) {
      checkResetPasswordToken(resetPasswordTokenParam);
      setResetPasswordToken(resetPasswordTokenParam);
    }
  }, [resetPasswordTokenParam]);

  useEffect(() => {
    if (!resetPasswordTokenExists && resetPasswordTokenExistsIsSuccess) {
      navigate(routes.loginPage);
    }
  }, [resetPasswordTokenExists, resetPasswordTokenExistsIsSuccess]);

  useEffect(() => {
    if (passwordResetIsSuccess) {
      navigate(routes.loginPage);
    }
  }, [passwordResetIsSuccess]);

  if (resetPasswordTokenExistsIsLoading) {
    return <LoadingPage />;
  }

  const handleSubmit = () => {
    const submitInputs: FormInputs = getSubmitInputs(inputs);
    resetPassword({
      resetPasswordToken: resetPasswordToken,
      newPassword: submitInputs.newPassword,
      repeatedPassword: submitInputs.repeatedPassword,
    });
  };

  return (
    <AuthPageWrapper>
      <div className={styles.resetPasswordPageContainer}>
        <div className={styles.resetPasswordFormContainer}>
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
          <button
            className={classNames('btn', styles.resetBtn)}
            onClick={handleSubmit}
          >
            {passwordResetIsLoading ? <Loader /> : 'Reset'}
          </button>
        </div>
      </div>
    </AuthPageWrapper>
  );
};

export default ResetPasswordPage;
