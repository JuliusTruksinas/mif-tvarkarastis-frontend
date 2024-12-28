import { useEffect } from 'react';
import { ReactSVG } from 'react-svg';
import styles from './UserEventLocation.module.scss';
import { LectureEvent } from '../../domain/lectureEvent';
import busIcon from '../../assets/icons/busIcon.svg';
import carIcon from '../../assets/icons/carIcon.svg';
import { Faculty, generateNavigationLink } from '../../helpers/Navigation.ts';
import { useAuthStore } from '../../stores/auth/auth.store';

type Props = {
  lectureEvent: LectureEvent;
  faculty: Faculty;
};

const UserEventLocation = ({ lectureEvent, faculty }: Props) => {
  const { currentUser, getCurrentUser } = useAuthStore();

  useEffect(() => {
    getCurrentUser();
  }, []);

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

export default UserEventLocation;
