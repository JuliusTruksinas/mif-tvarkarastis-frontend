import Modal from '../../common/Modal/Modal';
import styles from './ViewUserEventModal.module.scss';
import { UserEvent } from '../../domain/userEvent';
import { extractDate, extractTime } from '../../helpers/time';

type Props = {
  onClose: () => void;
  userEvent: UserEvent;
  setSelectedUserEvent: (userEvent: UserEvent | null) => void;
};

const ViewUserEventModal = ({
  onClose,
  userEvent,
  setSelectedUserEvent,
}: Props) => {
  const INFO = [
    {
      label: 'Start:',
      value: `${extractDate(userEvent.startDateTime)} ${extractTime(
        userEvent.startDateTime,
      )}`,
    },
    {
      label: 'End:',
      value: `${extractDate(userEvent.endDateTime)} ${extractTime(
        userEvent.endDateTime,
      )}`,
    },
    {
      label: 'Location:',
      value: userEvent?.location,
    },
    {
      label: 'Notes:',
      value: userEvent?.note,
    },
  ];

  return (
    <Modal
      onClose={() => {
        onClose();
        setSelectedUserEvent?.(null);
      }}
      elementClassName={styles.modalBody}
    >
      <div className={styles.viewUserEventModalContentContainer}>
        <h1 className={styles.modalTitle}>{userEvent?.title}</h1>
        <div className={styles.lectureInfoContainer}>
          {INFO.filter((info) => info.value).map((info) => (
            <div className={styles.infoContainer} key={info.label}>
              <p className={styles.label}>{info.label}</p>
              <p className={styles.value}>{info.value}</p>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default ViewUserEventModal;
