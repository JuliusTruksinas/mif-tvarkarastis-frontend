import { ChangeEvent } from 'react';
import { FormInput } from '../../../../domain/form';
import SettingsSection from '../../../../components/SettingsSection/SettingsSection';
import styles from './UserInfoSettingsSection.module.scss';
import TextField from '../../../../common/TextField/TextField';

type Props = {
  inputs: FormInput[];
  onInputChange: (e: ChangeEvent) => void;
};

const UserInfoSettingsSection = ({ inputs, onInputChange }: Props) => {
  return (
    <SettingsSection title="Personal info">
      <div className={styles.settingsInnerSectionContainer}>
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
