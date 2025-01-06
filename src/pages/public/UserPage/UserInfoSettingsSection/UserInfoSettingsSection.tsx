import { ChangeEvent, useEffect } from 'react';
import { FormInput } from '../../../../domain/form';
import SettingsSection from '../../../../components/SettingsSection/SettingsSection';
import styles from './UserInfoSettingsSection.module.scss';
import TextField from '../../../../common/TextField/TextField';
import { useAuthStore } from '../../../../stores/auth/auth.store';
import { FALLBACK_PROFILE_PHOTO_URL } from '../../../../constants';

type Props = {
  inputs: FormInput[];
  onInputChange: (e: ChangeEvent) => void;
};

const UserInfoSettingsSection = ({ inputs, onInputChange }: Props) => {
  const { currentUser, getCurrentUser, currentUserIsUpdateNeeded } =
    useAuthStore();

  useEffect(() => {
    if (!currentUser || currentUserIsUpdateNeeded) {
      getCurrentUser();
    }
  }, [currentUser, currentUserIsUpdateNeeded]);

  return (
    <SettingsSection title="Personal info">
      <div className={styles.settingsInnerSectionContainer}>
        <div className={styles.profilePhotoContainer}>
          <img
            src={currentUser?.profilePhotoUrl || FALLBACK_PROFILE_PHOTO_URL}
            alt="User Avatar"
            className={styles.profilePhoto}
            onError={(e) => {
              e.currentTarget.src = FALLBACK_PROFILE_PHOTO_URL;
            }}
          />
        </div>

        <div className={styles.programBoxSection}>
          {inputs
            .filter((input) =>
              ['firstName', 'lastName', 'email', 'profilePhotoUrl'].includes(
                input.name,
              ),
            )
            .map((input) => (
              <TextField
                key={input.name}
                name={input.name}
                value={input.value}
                type={input.type}
                label={input.label}
                onChange={onInputChange}
                elementClassName={styles.inputField}
                labelClassName={styles.inputLabel}
                options={input.options}
                isLoading={input.isLoading}
              />
            ))}
        </div>
        <div className={styles.programBoxSection}>
          {inputs
            .filter((input) => ['password', 'programName'].includes(input.name))
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
    </SettingsSection>
  );
};

export default UserInfoSettingsSection;
