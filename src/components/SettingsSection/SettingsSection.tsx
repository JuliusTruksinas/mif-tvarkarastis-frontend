import { ReactNode } from 'react';
import styles from './SettingsSection.module.scss';
import classNames from 'classnames';

type Props = {
  children: ReactNode;
  title: string;
  containerClassName?: string;
  titleContainerClassName?: string;
  titleClassName?: string;
  innerSectionClassName?: string;
};

const SettingsSection = ({
  children,
  title,
  containerClassName,
  titleContainerClassName,
  titleClassName,
  innerSectionClassName,
}: Props) => {
  return (
    <div className={classNames(containerClassName)}>
      <div
        className={classNames(
          styles.settingsSectionTitleContainer,
          titleContainerClassName,
        )}
      >
        <p className={classNames(styles.settingsSectionTitle, titleClassName)}>
          {title}
        </p>
      </div>
      <div
        className={classNames(
          styles.settingsInnerSectionContainer,
          innerSectionClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default SettingsSection;
