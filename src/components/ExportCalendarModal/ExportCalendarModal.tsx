import Modal from '../../common/Modal/Modal';
import TextField from '../../common/TextField/TextField';
import { useForm } from '../../hooks/useForm';
import styles from './ExportCalendarModal.module.scss';
import Button from '../../common/Button/Button';
import { useCalendarStore } from '../../stores/calendar/calendar.store';

type Props = {
  onClose: () => void;
};

type formInputs = {
  fromDate: string;
  toDate: string;
  areUserEventsIncluded: string;
  areSelectableLecturesIncluded: string;
};

const INPUTS = [
  {
    name: 'fromDate',
    type: 'date',
    label: 'From',
    value: '',
  },
  {
    name: 'toDate',
    type: 'date',
    label: 'To',
    value: '',
  },
  {
    name: 'areUserEventsIncluded',
    type: 'checkbox',
    label: 'Include user events?',
    value: '1',
  },
  {
    name: 'areSelectableLecturesIncluded',
    type: 'checkbox',
    label: 'Include selectable lectures? (not recommended)',
    value: '0',
  },
];

const ExportCalendarModal = ({ onClose }: Props) => {
  const { inputs, onInputChange, getSubmitInputs, onCheckboxChange } =
    useForm<formInputs>(INPUTS);

  const { exportCalendar } = useCalendarStore();

  const handleSubmit = () => {
    const submitInputs: formInputs = getSubmitInputs(inputs);

    exportCalendar({
      fromDate: submitInputs?.fromDate,
      toDate: submitInputs?.toDate,
      areUserEventsIncluded: submitInputs?.areUserEventsIncluded === '1',
      areSelectableLecturesIncluded:
        submitInputs?.areSelectableLecturesIncluded === '1',
    });
  };

  return (
    <Modal
      onClose={() => {
        onClose();
      }}
      elementClassName={styles.modalBody}
    >
      <div className={styles.exportCalendarModalContentContainer}>
        <p className={styles.modalTitle}>Export calendar</p>
        <div className={styles.allInputsContainer}>
          {inputs.map((input) => (
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
      </div>
      <div className={styles.modalFooter}>
        <Button label="Cancel" variant="info" onClick={() => onClose()} />
        <Button
          label="Export"
          variant="primary"
          onClick={() => {
            handleSubmit();
            onClose();
          }}
        />
      </div>
    </Modal>
  );
};

export default ExportCalendarModal;
