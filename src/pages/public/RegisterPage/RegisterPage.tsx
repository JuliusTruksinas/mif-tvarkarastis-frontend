import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../config/Router/routes';
import styles from './RegisterPage.module.scss';
import { useForm } from '../../../hooks/useForm';
import TextField from '../../../common/TextField/TextField';
import { useStudyOptionsStore } from '../../../stores/study-options/studyOptions.store';
import { useEffect, useMemo } from 'react';
import { useAuthStore } from '../../../stores/auth/auth.store';
import AuthPageWrapper from '../../../components/AuthPageWrapper/AuthPageWrapper';
import Loader from '../../../components/Loader/Loader';

type FormInputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  programName: string;
  course: number;
  group: number;
  subgroup: number;
};

const DEFAULT_OPTIONS = [{ label: 'select', value: '' }];

const INPUTS = [
  {
    name: 'firstName',
    type: 'text',
    label: 'First Name',
    value: '',
  },
  {
    name: 'lastName',
    type: 'text',
    label: 'Last Name',
    value: '',
  },
  {
    name: 'email',
    type: 'text',
    label: 'Email Address',
    value: '',
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password',
    value: '',
  },
  {
    name: 'studyType',
    type: 'select',
    options: DEFAULT_OPTIONS,
    label: 'Study type',
    value: '',
    fieldsToClearOnChange: ['programName', 'course', 'group', 'subgroup'],
  },
  {
    name: 'programName',
    type: 'select',
    options: DEFAULT_OPTIONS,
    label: 'Program Name',
    value: '',
    fieldsToClearOnChange: ['course', 'group', 'subgroup'],
  },
  {
    name: 'course',
    type: 'select',
    options: DEFAULT_OPTIONS,
    label: 'Course',
    value: '',
    fieldsToClearOnChange: ['group', 'subgroup'],
  },
  {
    name: 'group',
    type: 'select',
    options: DEFAULT_OPTIONS,
    label: 'Group',
    value: '',
    fieldsToClearOnChange: ['subgroup'],
  },
  {
    name: 'subgroup',
    type: 'select',
    options: DEFAULT_OPTIONS,
    label: 'Subgroup',
    value: '',
  },
];

const RegisterPage = () => {
  const navigate = useNavigate();
  const {
    inputs,
    onInputChange,
    setNewInputValue,
    getSubmitInputs,
    resetInputValues,
  } = useForm<FormInputs>(INPUTS);

  const { register, registerIsLoading } = useAuthStore();

  const {
    getAllStudyTypesOptions,
    studyTypesOptions,
    getAllProgramsOptions,
    programsOptions,
    coursesOptions,
    groupsOptions,
    subgroupsOptions,
    getAllCoursesOptions,
    getAllGroupsOptions,
    getAllSubgroupsOptions,
    resetStudyOptionsStore,
  } = useStudyOptionsStore();

  const studyTypeInputValue = useMemo(
    () => inputs.find((input) => input.name === 'studyType')?.value,
    [inputs],
  );

  const programNameInputValue = useMemo(
    () => inputs.find((input) => input.name === 'programName')?.value,
    [inputs],
  );

  const courseInputValue = useMemo(
    () => inputs.find((input) => input.name === 'course')?.value,
    [inputs],
  );

  const groupInputValue = useMemo(
    () => inputs.find((input) => input.name === 'group')?.value,
    [inputs],
  );

  useEffect(() => {
    getAllStudyTypesOptions();
  }, []);

  useEffect(() => {
    if (studyTypeInputValue) {
      getAllProgramsOptions({ studyType: +studyTypeInputValue || null });
    }
  }, [studyTypeInputValue]);

  useEffect(() => {
    if (studyTypeInputValue && programNameInputValue) {
      getAllCoursesOptions({
        studyType: +studyTypeInputValue || null,
        studyProgramName: programNameInputValue,
      });
    }
  }, [programNameInputValue]);

  useEffect(() => {
    if (studyTypeInputValue && programNameInputValue && courseInputValue) {
      getAllGroupsOptions({
        studyType: +studyTypeInputValue || null,
        studyProgramName: programNameInputValue,
        course: +courseInputValue || null,
      });
    }
  }, [courseInputValue]);

  useEffect(() => {
    if (groupInputValue) {
      getAllSubgroupsOptions();
    }
  }, [groupInputValue]);

  useEffect(() => {
    if (studyTypesOptions?.length) {
      setNewInputValue('studyType', {
        options: DEFAULT_OPTIONS.concat(studyTypesOptions),
      });
    }
  }, [studyTypesOptions]);

  useEffect(() => {
    if (programsOptions?.length) {
      setNewInputValue('programName', {
        options: DEFAULT_OPTIONS.concat(programsOptions),
      });
    }
  }, [programsOptions]);

  useEffect(() => {
    if (coursesOptions?.length) {
      setNewInputValue('course', {
        options: DEFAULT_OPTIONS.concat(coursesOptions),
      });
    }
  }, [coursesOptions]);

  useEffect(() => {
    if (groupsOptions?.length) {
      setNewInputValue('group', {
        options: DEFAULT_OPTIONS.concat(groupsOptions),
      });
    }
  }, [groupsOptions]);

  useEffect(() => {
    if (subgroupsOptions?.length) {
      setNewInputValue('subgroup', {
        options: DEFAULT_OPTIONS.concat(subgroupsOptions),
      });
    }
  }, [subgroupsOptions]);

  const handleRegister = () => {
    const formInputs: FormInputs = getSubmitInputs(inputs);

    register({
      email: formInputs.email,
      password: formInputs.password,
      firstName: formInputs.firstName,
      lastName: formInputs.lastName,
      studyType: 1,
      programName: formInputs.programName,
      course: +formInputs.course || null,
      group: +formInputs.group || null,
      subgroup: +formInputs.subgroup || null,
    });

    resetInputValues();
  };

  useEffect(() => {
    return () => resetStudyOptionsStore();
  }, []);

  return (
    <AuthPageWrapper>
      <div className={styles.registerPage}>
        <div className={styles.registerFormContainer}>
          <h1 className={styles.title}>
            Welcome to
            <br />
            Bug Busters
          </h1>
          {inputs
            .filter(
              (input) => !['course', 'group', 'subgroup'].includes(input.name),
            )
            .map((input) => (
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
          <div className={styles.programDetailsSection}>
            {inputs
              .filter((input) =>
                ['course', 'group', 'subgroup'].includes(input.name),
              )
              .map((input) => (
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
          </div>

          <div className={styles.ctaContainer}>
            <button
              onClick={handleRegister}
              className={classNames('btn', styles.registerBtn)}
            >
              {registerIsLoading ? <Loader /> : 'Register'}
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
    </AuthPageWrapper>
  );
};

export default RegisterPage;
