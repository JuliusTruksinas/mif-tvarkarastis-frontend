import styles from './AreWeekendsIncludedController.module.scss';

type Props = {
  areWeekendsShown: boolean;
  setAreWeekendsShown: (boolean) => void;
};

const AreWeekendsIncludedController = ({
  areWeekendsShown,
  setAreWeekendsShown,
}: Props) => {
  return (
    <div className={styles.areWeekendsIncludedContainer}>
      <label>Include weekends?</label>
      <input
        type="checkbox"
        className="checkbox"
        checked={areWeekendsShown}
        onChange={() => {
          setAreWeekendsShown(!areWeekendsShown);
        }}
      />
    </div>
  );
};

export default AreWeekendsIncludedController;
