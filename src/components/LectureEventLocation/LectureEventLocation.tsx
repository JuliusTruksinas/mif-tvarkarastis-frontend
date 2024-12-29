import { useEffect } from 'react';
import { ReactSVG } from 'react-svg';
import styles from './LectureEventLocation.module.scss';
import { LectureEvent } from '../../domain/lectureEvent.ts';
import busIcon from '../../assets/icons/busIcon.svg';
import carIcon from '../../assets/icons/carIcon.svg';
import {
  Faculty,
  generateNavigationLink,
} from '../../helpers/navigationHelper.ts';
import { useAuthStore } from '../../stores/auth/auth.store.ts';

type Props = {
  lectureEvent: LectureEvent;
  faculty: Faculty;
};

const LectureEventLocation = ({ lectureEvent, faculty }: Props) => {
  const { currentUser, getCurrentUser, currentUserIsUpdateNeeded } =
    useAuthStore();

  useEffect(() => {
    if (!currentUser || currentUserIsUpdateNeeded) {
      getCurrentUser();
    }
  }, [currentUser, currentUserIsUpdateNeeded]);

  return (
    <div className={styles.locationClassWithIconsConteiner}>
      <p>{lectureEvent?.location}</p>
      <div className={styles.iconsContainer}>
        <ReactSVG
          src={busIcon}
          className={styles.icon}
          onClick={() => {
            window.open(
              generateNavigationLink(
                faculty,
                lectureEvent.startDateTime,
                'bus',
                currentUser.preferredNavigationApp,
              ),
              '_blank',
            );
          }}
        />
        <ReactSVG
          src={carIcon}
          className={styles.icon}
          onClick={() => {
            window.open(
              generateNavigationLink(
                faculty,
                lectureEvent.startDateTime,
                'car',
                currentUser.preferredNavigationApp,
              ),
              '_blank',
            );
          }}
        />
      </div>
    </div>
  );
};

export default LectureEventLocation;
