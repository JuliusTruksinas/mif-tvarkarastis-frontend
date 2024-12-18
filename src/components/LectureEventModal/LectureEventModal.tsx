import Modal from '../../common/Modal/Modal';
import styles from './LectureEventModal.module.scss';
import { LectureEvent } from '../../domain/lectureEvent';
import { extractDate, extractTime } from '../../helpers/time';

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
      label: 'Groups:',
      value: lectureEvent?.groups.map((group) => group.toString()).join(', '),
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
      value: lectureEvent?.location,
    },
    {
      label: 'Room:',
      value: lectureEvent?.room,
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
              <p className={styles.value}>{info.value}</p>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default LectureEventModal;
