import { ReactSVG } from 'react-svg';
import Modal from '../../common/Modal/Modal';
import styles from './LectureEventModal.module.scss';
import { LectureEvent } from '../../domain/lectureEvent';
import { extractDate, extractTime } from '../../helpers/time';
import busIcon from '../../assets/icons/busIcon.svg';
import carIcon from '../../assets/icons/carIcon.svg';
import {
  generateGoogleMapsLink,
  tryGetFaculty,
} from '../../helpers/googleMaps';
import UserEventLocation from '../UserEventLocation/UserEventLocation';

type Props = {
  onClose: () => void;
  lectureEvent: LectureEvent;
  setSelectedLectureEvent: (lectureEvent: LectureEvent | null) => void;
};

const LectureEventModal = ({
  onClose,
  lectureEvent,
  setSelectedLectureEvent,
}: Props) => {
  const faculty = tryGetFaculty(lectureEvent?.location);

  const INFO = [
    {
      label: 'Start:',
      value: `${extractDate(lectureEvent.startDateTime)} ${extractTime(
        lectureEvent.startDateTime,
      )}`,
    },
    {
      label: 'End:',
      value: `${extractDate(lectureEvent.endDateTime)} ${extractTime(
        lectureEvent.endDateTime,
      )}`,
    },
    {
      label: 'Group:',
      value: lectureEvent?.group,
    },
    {
      label: 'Subgroup:',
      value: lectureEvent?.subgroup,
    },
    {
      label: 'Lecturer:',
      value: lectureEvent?.lecturer,
    },
    {
      label: 'Types:',
      value: lectureEvent?.lectureTypes.join(', '),
    },
    {
      label: 'Comment:',
      value: lectureEvent?.comment,
    },
    {
      label: 'Location:',
      value: faculty ? (
        <UserEventLocation lectureEvent={lectureEvent} faculty={faculty} />
      ) : (
        lectureEvent?.location
      ),
    },
  ];

  return (
    <Modal
      onClose={() => {
        onClose();
        setSelectedLectureEvent?.(null);
      }}
      elementClassName={styles.modalBody}
    >
      <div className={styles.lectureEventModalContentContainer}>
        <h1 className={styles.modalTitle}>{lectureEvent?.title}</h1>
        <div className={styles.lectureInfoContainer}>
          {INFO.filter((info) => info.value).map((info) => (
            <div className={styles.infoContainer}>
              <p className={styles.label}>{info.label}</p>
              {typeof info.value === 'string' ? (
                <p className={styles.value}>{info.value}</p>
              ) : (
                info.value
              )}
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default LectureEventModal;
