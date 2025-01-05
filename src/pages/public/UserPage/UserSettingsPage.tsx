import { useEffect, useMemo, useState } from 'react';
import styles from './UserSettingsPage.module.scss';
import { useAuthStore } from '../../../stores/auth/auth.store';
import { useForm } from '../../../hooks/useForm';
import { useStudyOptionsStore } from '../../../stores/study-options/studyOptions.store';
import { useUserStore } from '../../../stores/user/user.store';
import AdditionalSettingsSection from './AdditionalSettingsSection/AdditionalSettingsSection';
import UserInfoSettingsSection from './UserInfoSettingsSection/UserInfoSettingsSection';
import Button from '../../../common/Button/Button';

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
  profilePhotoUrl: string;
};

const UserPage = () => {
  const { currentUser, getCurrentUser, currentUserIsUpdateNeeded } =
    useAuthStore();
  const {
    programsOptionsIsLoading,
    coursesOptionsIsLoading,
    groupsOptionsIsLoading,
    subgroupsOptionsIsLoading,
  } = useStudyOptionsStore();
  const [preferredNavigationApp, setPreferredNavigationApp] = useState(
    currentUser?.preferredNavigationApp,
  );

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
    {
      name: 'profilePhotoUrl',
      type: 'text',
      label: 'Profile photo URL',
      value: currentUser?.profilePhotoUrl || '',
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
    if (!currentUser || currentUserIsUpdateNeeded) {
      getCurrentUser();
    }
  }, [currentUser, currentUserIsUpdateNeeded]);

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
        studyType: +currentUser.studyType || null,
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
      course: +submitInputs.course || null,
      group: +submitInputs.group || null,
      subgroup: +submitInputs.subgroup || null,
      preferredNavigationApp,
      profilePhotoUrl: submitInputs.profilePhotoUrl || null,
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

    setPreferredNavigationApp(currentUser.preferredNavigationApp);
  };

  return (
    <div className={styles.userSettingsPage}>
      <h1 className={styles.title}>Settings</h1>
      <p className={styles.pageSubtitle}>
        View and manage your account settings
      </p>
      <div className={styles.settingsSectionsContainer}>
        <UserInfoSettingsSection
          inputs={inputs}
          onInputChange={onInputChange}
        />
        <AdditionalSettingsSection
          preferredNavigationApp={preferredNavigationApp}
          setPreferredNavigationApp={setPreferredNavigationApp}
        />
      </div>
      <div className={styles.ctaContainer}>
        <Button label="Cancel" variant="secondary" onClick={handleCancel} />
        <Button label="Save" variant="primary" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default UserPage;
