import classNames from 'classnames';
import Modal from '../../common/Modal/Modal';
import TextField from '../../common/TextField/TextField';
import { FormInput } from '../../domain/form';
import { useForm } from '../../hooks/useForm';
import styles from './CustomEventModal.module.scss';

type Props = {
  onClose: () => void;
};

const INPUTS: FormInput[] = [
  {
    name: 'title',
    type: 'text',
    label: 'Title',
    value: '',
  },
  {
    name: 'location',
    type: 'text',
    label: 'Location',
    value: '',
  },
  {
    name: 'date',
    type: 'date',
    label: 'Date',
    value: '',
  },
  {
    name: 'startTime',
    type: 'time',
    label: 'Start time',
    value: '',
  },
  {
    name: 'endTime',
    type: 'time',
    label: 'End time',
    value: '',
  },
  {
    name: 'notes',
    type: 'textArea',
    label: 'Notes',
    value: '',
  },
];

const CustomEventModal = ({ onClose }: Props) => {
  const { inputs, onInputChange } = useForm(INPUTS);

  return (
    <Modal onClose={onClose} elementClassName={styles.modalBody}>
      <div className={styles.customEventModalContentContainer}>
        <p className={styles.modalTitle}>Add event</p>
        <div className={styles.allInputsContainer}>
          {inputs
            .filter(
              (input) =>
                !['startTime', 'endTime', 'notes'].includes(input.name),
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
            .filter((input) => ['notes'].includes(input.name))
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
        <button
          className={classNames('btn', styles.eventModalBtn, styles.cancelBtn)}
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className={classNames('btn', styles.eventModalBtn, styles.addBtn)}
        >
          Add
        </button>
      </div>
    </Modal>
  );
};

export default CustomEventModal;
