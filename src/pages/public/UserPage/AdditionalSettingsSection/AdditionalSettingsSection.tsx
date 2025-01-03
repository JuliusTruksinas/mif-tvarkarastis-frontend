import { ReactSVG } from 'react-svg';
import classNames from 'classnames';
import SettingsSection from '../../../../components/SettingsSection/SettingsSection';
import styles from './AdditionalSettingsSection.module.scss';
import googleMapsIcon from '../../../../assets/icons/googleMapsIcon.svg';
import wazeIcon from '../../../../assets/icons/wazeIcon.svg';
import { PreferredNavigationApp } from '../../../../domain/navigation';

type Props = {
  preferredNavigationApp: PreferredNavigationApp;
  setPreferredNavigationApp: (
    preferredNavigationApp: PreferredNavigationApp,
  ) => void;
};

const AdditionalSettingsSection = ({
  preferredNavigationApp,
  setPreferredNavigationApp,
}: Props) => {
  return (
    <SettingsSection title="Additional settings">
      <div className={styles.additionalSettingsContainer}>
        <p className={styles.preferredNavigationAppTitle}>
          Preferred navigation app:
        </p>
        <ReactSVG
          src={googleMapsIcon}
          className={classNames(styles.icon, {
            [styles.outlinedIcon]: preferredNavigationApp === 'googleMaps',
            [styles.googleMapsOutlinedIcon]:
              preferredNavigationApp === 'googleMaps',
          })}
          onClick={() => setPreferredNavigationApp('googleMaps')}
        />
        <ReactSVG
          src={wazeIcon}
          className={classNames(styles.icon, {
            [styles.outlinedIcon]: preferredNavigationApp === 'waze',
            [styles.wazeOutlinedIcon]: preferredNavigationApp === 'waze',
          })}
          onClick={() => setPreferredNavigationApp('waze')}
        />
      </div>
    </SettingsSection>
  );
};

export default AdditionalSettingsSection;
