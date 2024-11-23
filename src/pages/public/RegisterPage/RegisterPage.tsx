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

type formInputs = {
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
  },
  {
    name: 'programName',
    type: 'select',
    options: DEFAULT_OPTIONS,
    label: 'Program Name',
    value: '',
  },
  {
    name: 'course',
    type: 'select',
    options: DEFAULT_OPTIONS,
    label: 'Course',
    value: '',
  },
  {
    name: 'group',
    type: 'select',
    options: DEFAULT_OPTIONS,
    label: 'Group',
    value: '',
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
  } = useForm(INPUTS);

  const { register } = useAuthStore();

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
  } = useStudyOptionsStore();

  const resetSelectInputs = (inputsNames: string[]) => {
    inputsNames.forEach((inputName) => {
      setNewInputValue(inputName, {
        options: DEFAULT_OPTIONS,
        value: '',
      });
    });
  };

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
    resetSelectInputs(['programName', 'course', 'group', 'subgroup']);
    if (studyTypeInputValue) {
      getAllProgramsOptions({ studyTypeId: +studyTypeInputValue });
    }
  }, [studyTypeInputValue]);

  useEffect(() => {
    resetSelectInputs(['course', 'group', 'subgroup']);
    if (studyTypeInputValue && programNameInputValue) {
      getAllCoursesOptions({
        studyTypeId: +studyTypeInputValue,
        studyProgramName: programNameInputValue,
      });
    }
  }, [programNameInputValue]);

  useEffect(() => {
    resetSelectInputs(['group', 'subgroup']);
    if (studyTypeInputValue && programNameInputValue && courseInputValue) {
      getAllGroupsOptions({
        studyTypeId: +studyTypeInputValue,
        studyProgramName: programNameInputValue,
        course: +courseInputValue,
      });
    }
  }, [courseInputValue]);

  useEffect(() => {
    resetSelectInputs(['subgroup']);
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
    const formInputs: formInputs = getSubmitInputs(inputs);

    register({
      email: formInputs.email,
      password: formInputs.password,
      firstName: formInputs.firstName,
      lastName: formInputs.lastName,
      programName: formInputs.programName,
      course: +formInputs.course,
      group: +formInputs.group,
      subgroup: +formInputs.subgroup,
    });

    resetInputValues();
  };

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
    </AuthPageWrapper>
  );
};

export default RegisterPage;
