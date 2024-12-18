import classNames from 'classnames';
import Modal from '../../common/Modal/Modal';
import TextField from '../../common/TextField/TextField';
import { useForm } from '../../hooks/useForm';
import styles from './UserEventModal.module.scss';
import { useUserEventStore } from '../../stores/user-event/userEvent.store';
import { UserEvent } from '../../domain/userEvent';
import { extractDate, extractTime } from '../../helpers/time';

type Props = {
  onClose: () => void;
  userEvent: UserEvent;
  setSelectedUserEvent: (userEvent: UserEvent | null) => void;
};

type formInputs = {
  date: string;
  startTime: string;
  endTime: string;
  title: string;
  note?: string;
  location?: string;
};

const UserEventModal = ({
  onClose,
  userEvent,
  setSelectedUserEvent,
}: Props) => {
  const INPUTS = [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      value: userEvent?.title || '',
    },
    {
      name: 'location',
      type: 'text',
      label: 'Location',
      value: userEvent?.location || '',
    },
    {
      name: 'date',
      type: 'date',
      label: 'Date',
      value: userEvent?.startDateTime
        ? extractDate(userEvent.startDateTime)
        : '',
    },
    {
      name: 'startTime',
      type: 'time',
      label: 'Start time',
      value: userEvent?.startDateTime
        ? extractTime(userEvent.startDateTime)
        : '',
    },
    {
      name: 'endTime',
      type: 'time',
      label: 'End time',
      value: userEvent?.endDateTime ? extractTime(userEvent.endDateTime) : '',
    },
    {
      name: 'note',
      type: 'textArea',
      label: 'Notes',
      value: userEvent?.note || '',
    },
  ];

  const { inputs, onInputChange, getSubmitInputs } =
    useForm<formInputs>(INPUTS);

  const { createUserEvent, updateUserEvent, deleteUserEvent } =
    useUserEventStore();

  const handleSubmit = () => {
    const submitInputs: formInputs = getSubmitInputs(inputs);

    if (userEvent) {
      updateUserEvent(userEvent.id, {
        startDateTime:
          submitInputs.date && submitInputs.startTime
            ? `${submitInputs.date}T${submitInputs.startTime}:00`
            : null,
        endDateTime:
          submitInputs.date && submitInputs.endTime
            ? `${submitInputs.date}T${submitInputs.endTime}:00`
            : null,
        title: submitInputs.title,
        note: submitInputs.note || null,
        location: submitInputs.location || null,
      });
      return;
    }

    createUserEvent({
      startDateTime:
        submitInputs.date && submitInputs.startTime
          ? `${submitInputs.date}T${submitInputs.startTime}:00`
          : null,
      endDateTime:
        submitInputs.date && submitInputs.endTime
          ? `${submitInputs.date}T${submitInputs.endTime}:00`
          : null,
      title: submitInputs.title,
      note: submitInputs.note || null,
      location: submitInputs.location || null,
    });
  };

  return (
    <Modal
      onClose={() => {
        onClose();
        setSelectedUserEvent?.(null);
      }}
      elementClassName={styles.modalBody}
    >
      <div className={styles.customEventModalContentContainer}>
        <p className={styles.modalTitle}>
          {userEvent ? 'Update event' : 'Add event'}
        </p>
        <div className={styles.allInputsContainer}>
          {inputs
            .filter(
              (input) => !['startTime', 'endTime', 'note'].includes(input.name),
            )
            .map((input) => (
              <TextField
                key={input.name}
                name={input.name}
                value={input.value}
                label={input.label}
                type={input.type}
                onChange={onInputChange}
              />
            ))}
          <div className={styles.timesContainer}>
            {inputs
              .filter((input) => ['startTime', 'endTime'].includes(input.name))
              .map((input) => (
                <TextField
                  key={input.name}
                  name={input.name}
                  value={input.value}
                  label={input.label}
                  type={input.type}
                  onChange={onInputChange}
                  containerClassName={styles.timeContainer}
                />
              ))}
          </div>
          {inputs
            .filter((input) => ['note'].includes(input.name))
            .map((input) => (
              <TextField
                key={input.name}
                name={input.name}
                value={input.value}
                label={input.label}
                type={input.type}
                onChange={onInputChange}
              />
            ))}
        </div>
      </div>
      <div className={styles.modalFooter}>
        {userEvent && (
          <button
            className={classNames(
              'btn',
              styles.eventModalBtn,
              styles.deleteBtn,
            )}
            onClick={() => {
              deleteUserEvent(userEvent?.id);
              setSelectedUserEvent?.(null);
              onClose();
            }}
          >
            Delete
          </button>
        )}
        <button
          className={classNames('btn', styles.eventModalBtn, styles.cancelBtn)}
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          onClick={() => {
            handleSubmit();
            setSelectedUserEvent?.(null);
            onClose();
          }}
          className={classNames('btn', styles.eventModalBtn, styles.addBtn)}
        >
          {userEvent ? 'Update' : 'Add'}
        </button>
      </div>
    </Modal>
  );
};

export default UserEventModal;
