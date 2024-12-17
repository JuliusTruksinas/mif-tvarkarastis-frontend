import { useEffect, useMemo } from 'react';
import classNames from 'classnames';
import styles from './UserPage.module.scss';
import { useAuthStore } from '../../../stores/auth/auth.store';
import { useForm } from '../../../hooks/useForm';
import TextField from '../../../common/TextField/TextField';
import { useStudyOptionsStore } from '../../../stores/study-options/studyOptions.store';
import { useUserStore } from '../../../stores/user/user.store';

const DEFAULT_OPTIONS = [{ label: 'select', value: '' }];

type FormInputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  programName: string;
  course: string;
  group: string;
  subgroup: string;
};

const UserPage = () => {
  const { currentUser, getCurrentUser } = useAuthStore();
  const {
    programsOptionsIsLoading,
    coursesOptionsIsLoading,
    groupsOptionsIsLoading,
    subgroupsOptionsIsLoading,
  } = useStudyOptionsStore();

  const { updateUserInfo } = useUserStore();

  const INPUTS = [
    {
      name: 'firstName',
      type: 'text',
      label: 'First Name',
      value: currentUser?.firstName || '',
    },
    {
      name: 'lastName',
      type: 'text',
      label: 'Last Name',
      value: currentUser?.lastName || '',
    },
    {
      name: 'email',
      type: 'text',
      label: 'Email Address',
      value: currentUser?.email || '',
    },
    {
      name: 'password',
      type: 'password',
      label: 'New password',
      value: '',
    },
    {
      name: 'programName',
      type: 'select',
      options: DEFAULT_OPTIONS,
      isLoading: programsOptionsIsLoading,
      label: 'Program Name',
      value: currentUser?.programName || '',
      fieldsToClearOnChange: ['course', 'group', 'subgroup'],
    },
    {
      name: 'course',
      type: 'select',
      options: DEFAULT_OPTIONS,
      isLoading: coursesOptionsIsLoading,
      label: 'Course',
      value: currentUser?.course?.toString() || '',
      fieldsToClearOnChange: ['group', 'subgroup'],
    },
    {
      name: 'group',
      type: 'select',
      options: DEFAULT_OPTIONS,
      isLoading: groupsOptionsIsLoading,
      label: 'Group',
      value: currentUser?.group?.toString() || '',
      fieldsToClearOnChange: ['subgroup'],
    },
    {
      name: 'subgroup',
      type: 'select',
      options: DEFAULT_OPTIONS,
      isLoading: subgroupsOptionsIsLoading,
      label: 'Subgroup',
      value: currentUser?.subgroup?.toString() || '',
    },
  ];

  const { inputs, onInputChange, setNewInputValue, getSubmitInputs } =
    useForm<FormInputs>(INPUTS);

  const {
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
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (currentUser?.studyType) {
      getAllProgramsOptions({ studyType: currentUser.studyType });
    }
  }, []);

  useEffect(() => {
    if (currentUser?.studyType && programNameInputValue) {
      getAllCoursesOptions({
        studyType: currentUser.studyType,
        studyProgramName: programNameInputValue,
      });
    }
  }, [programNameInputValue]);

  useEffect(() => {
    if (currentUser?.studyType && programNameInputValue && courseInputValue) {
      getAllGroupsOptions({
        studyType: +currentUser.studyType,
        studyProgramName: programNameInputValue,
        course: +courseInputValue,
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

  useEffect(() => {
    return () => resetStudyOptionsStore();
  }, []);

  const handleSubmit = () => {
    const submitInputs: FormInputs = getSubmitInputs(inputs);

    updateUserInfo({
      firstName: submitInputs.firstName,
      lastName: submitInputs.lastName,
      email: submitInputs.email,
      studyType: 1,
      programName: submitInputs.programName,
      course: +submitInputs.course,
      group: +submitInputs.group,
      subgroup: +submitInputs.subgroup,
      ...(submitInputs?.password && { password: submitInputs.password }),
    });

    setNewInputValue('password', { value: '' });
  };

  const handleCancel = () => {
    const notIncludedProperties = [
      'programName',
      'course',
      'group',
      'subgroup',
    ];

    for (const notIncludedProperty of notIncludedProperties) {
      setNewInputValue(notIncludedProperty, {
        value: currentUser[notIncludedProperty],
      });
    }

    setNewInputValue('password', {
      value: '',
    });

    const filteredEntries = Object.entries(currentUser).filter(
      (entry) => !notIncludedProperties.includes(entry[0]),
    );

    for (const [key, value] of filteredEntries) {
      setNewInputValue(key, { value });
    }
  };

  return (
    <div className={styles.userPage}>
      <h1 className={styles.title}>Settings</h1>
      <p className={styles.pageSubtitle}>
        View and manage your account settings
      </p>
      <div className={styles.formContainer}>
        <div className={styles.myInfoContainer}>
          <p className={styles.infoText}>{currentUser?.firstName} info</p>
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
            {inputs
              .filter((input) =>
                ['firstName', 'lastName', 'email'].includes(input.name),
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
                  elementClassName={styles.inputField}
                  labelClassName={styles.inputLabel}
                  options={input.options}
                  isLoading={input.isLoading}
                />
              ))}
          </div>
          <div className={styles.programBoxSection}>
            {inputs
              .filter((input) =>
                ['password', 'programName'].includes(input.name),
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
                  elementClassName={styles.inputField}
                  labelClassName={styles.inputLabel}
                  options={input.options}
                  isLoading={input.isLoading}
                />
              ))}

            <div className={styles.programDetailsContainer}>
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
                    containerClassName={styles.smallInputContainer}
                    elementClassName={styles.inputField}
                    labelClassName={styles.inputLabel}
                    options={input.options}
                    isLoading={input.isLoading}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.ctaContainer}>
        <button
          className={classNames('btn', styles.cancelBtn)}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className={classNames('btn', styles.saveBtn)}
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default UserPage;
