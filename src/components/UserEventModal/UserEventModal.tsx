import { useEffect, useMemo, useState } from 'react';
import Modal from '../../common/Modal/Modal';
import TextField from '../../common/TextField/TextField';
import { useForm } from '../../hooks/useForm';
import styles from './UserEventModal.module.scss';
import { useUserEventStore } from '../../stores/user-event/userEvent.store';
import { UserEvent } from '../../domain/userEvent';
import { extractDate, extractTime } from '../../helpers/time';
import Button from '../../common/Button/Button';

type Props = {
  onClose: () => void;
  userEvent: UserEvent;
  setSelectedUserEvent: (userEvent: UserEvent | null) => void;
};

export type OccurrenceType = 'day' | 'week' | 'month';
export type RepeatableUserEventUpdateType = 'single' | 'all' | 'future';

type formInputs = {
  date: string;
  startTime: string;
  endTime: string;
  title: string;
  isPrivate: string;
  isRepeatable: string;
  repeatableUserEventUpdateType: RepeatableUserEventUpdateType;
  note?: string;
  location?: string;
  occurrenceType?: OccurrenceType;
  repeatableUntil?: string;
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
    {
      name: 'isPrivate',
      type: 'switch',
      label: 'Private',
      value: userEvent?.isPrivate ? '1' : '0',
    },
    {
      name: 'isRepeatable',
      type: 'switch',
      label: 'Repeatable',
      value: '0',
    },
    {
      name: 'occurrenceType',
      type: 'select',
      label: 'Occurs every',
      value: 'week',
      options: [
        {
          label: 'day',
          value: 'day',
        },
        {
          label: 'week',
          value: 'week',
        },
        {
          label: 'month',
          value: 'month',
        },
      ],
    },
    {
      name: 'repeatableUntil',
      type: 'date',
      label: 'Repeatable until',
      value: '',
    },
    {
      name: 'repeatableUserEventUpdateType',
      type: 'select',
      label: 'Update',
      value: 'single',
      options: [
        {
          label: 'Single',
          value: 'single',
        },
        {
          label: 'All',
          value: 'all',
        },
        {
          label: 'Future',
          value: 'future',
        },
      ],
    },
  ];

  const [isRepeatableUntilInputShown, setIsRepeatableUntilInputShown] =
    useState<boolean>(false);
  const [isOccurrenceTypeInputShown, setIsOccurrenceTypeInputShown] =
    useState<boolean>(false);

  const { inputs, onInputChange, getSubmitInputs, onCheckboxChange } =
    useForm<formInputs>(INPUTS);

  const { createUserEvent, updateUserEvent, deleteUserEvent } =
    useUserEventStore();

  const [
    isRepeatableInput,
    occurrenceTypeInput,
    repeatableUntilInput,
    repeatableUserEventUpdateTypeInput,
  ] = useMemo(() => {
    return inputs.filter((input) =>
      [
        'isRepeatable',
        'occurrenceType',
        'repeatableUntil',
        'repeatableUserEventUpdateType',
      ].includes(input.name),
    );
  }, [inputs]);

  useEffect(() => {
    setIsRepeatableUntilInputShown(isRepeatableInput.value === '1');
    setIsOccurrenceTypeInputShown(isRepeatableInput.value === '1');
  }, [isRepeatableInput.value]);

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
        isPrivate: submitInputs.isPrivate === '1',
        repeatableUserEventUpdateType:
          submitInputs.repeatableUserEventUpdateType,
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
      isPrivate: submitInputs.isPrivate === '1',
      isRepeatable: submitInputs.isRepeatable === '1',
      note: submitInputs.note || null,
      location: submitInputs.location || null,
      occurrenceType: submitInputs.occurrenceType || null,
      repeatableUntil: submitInputs.repeatableUntil || null,
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
            .filter((input) =>
              ['title', 'location', 'date'].includes(input.name),
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
        <div className={styles.switchContainer}>
          {inputs
            .filter(
              (input) =>
                ['isPrivate', 'isRepeatable'].includes(input.name) &&
                (input.name !== 'isRepeatable' || !userEvent),
            )
            .map((input) => (
              <TextField
                key={input.name}
                name={input.name}
                value={input.value}
                label={input.label}
                type={input.type}
                onChange={onInputChange}
                onCheckboxChange={onCheckboxChange}
              />
            ))}
        </div>
        <div className={styles.repeatableDetailsContainer}>
          {isOccurrenceTypeInputShown && (
            <TextField
              key={occurrenceTypeInput.name}
              name={occurrenceTypeInput.name}
              value={occurrenceTypeInput.value}
              label={occurrenceTypeInput.label}
              type={occurrenceTypeInput.type}
              options={occurrenceTypeInput.options}
              onChange={onInputChange}
              onCheckboxChange={onCheckboxChange}
              containerClassName={styles.repeatableDetailsInputContainer}
            />
          )}
          {isRepeatableUntilInputShown && (
            <TextField
              key={repeatableUntilInput.name}
              name={repeatableUntilInput.name}
              value={repeatableUntilInput.value}
              label={repeatableUntilInput.label}
              type={repeatableUntilInput.type}
              onChange={onInputChange}
              onCheckboxChange={onCheckboxChange}
              containerClassName={styles.repeatableDetailsInputContainer}
            />
          )}
        </div>
        {userEvent?.repeatableUserEventsGroupId && (
          <TextField
            key={repeatableUserEventUpdateTypeInput.name}
            name={repeatableUserEventUpdateTypeInput.name}
            value={repeatableUserEventUpdateTypeInput.value}
            label={repeatableUserEventUpdateTypeInput.label}
            type={repeatableUserEventUpdateTypeInput.type}
            onChange={onInputChange}
            onCheckboxChange={onCheckboxChange}
            containerClassName={styles.repeatableDetailsInputContainer}
            options={repeatableUserEventUpdateTypeInput.options}
          />
        )}
      </div>
      <div className={styles.modalFooter}>
        {userEvent && (
          <Button
            label="Delete"
            variant="danger"
            onClick={() => {
              const submitInputs: formInputs = getSubmitInputs(inputs);
              deleteUserEvent(userEvent?.id, {
                repeatableUserEventUpdateType:
                  submitInputs.repeatableUserEventUpdateType || 'single',
              });
              setSelectedUserEvent?.(null);
              onClose();
            }}
          />
        )}
        <Button label="Cancel" variant="info" onClick={onClose} />
        <Button
          label={userEvent ? 'Update' : 'Add'}
          variant="primary"
          onClick={() => {
            handleSubmit();
            setSelectedUserEvent?.(null);
            onClose();
          }}
        />
      </div>
    </Modal>
  );
};

export default UserEventModal;
