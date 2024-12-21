import { ReactSVG } from 'react-svg';
import styles from './UserEventLocation.module.scss';
import { LectureEvent } from '../../domain/lectureEvent';
import busIcon from '../../assets/icons/busIcon.svg';
import carIcon from '../../assets/icons/carIcon.svg';
import { Faculty, generateGoogleMapsLink } from '../../helpers/googleMaps';

type Props = {
  lectureEvent: LectureEvent;
  faculty: Faculty;
};

const UserEventLocation = ({ lectureEvent, faculty }: Props) => {
  return (
    <div className={styles.locationClassWithIconsConteiner}>
      <p>{lectureEvent?.location}</p>
      <ReactSVG
        src={busIcon}
        className={styles.iconsForGoogleMaps}
        onClick={() =>
          window.open(
            generateGoogleMapsLink(faculty, lectureEvent.startDateTime, 'bus'),
            '_blank',
          )
        }
      />
      <ReactSVG
        src={carIcon}
        className={styles.iconsForGoogleMaps}
        onClick={() =>
          window.open(
            generateGoogleMapsLink(faculty, lectureEvent.startDateTime, 'car'),
            '_blank',
          )
        }
      />
    </div>
  );
};

export default UserEventLocation;
