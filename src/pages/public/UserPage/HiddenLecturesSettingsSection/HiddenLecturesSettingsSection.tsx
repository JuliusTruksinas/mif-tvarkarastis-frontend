import { useEffect, useState } from 'react';
import SettingsSection from '../../../../components/SettingsSection/SettingsSection';
import styles from './HiddenLecturesSettingsSection.module.scss';
import { useLectureEventStore } from '../../../../stores/lecture-event/lectureEvent.store';
import { useCalendarControlStore } from '../../../../stores/calendar-control/calendarControl.store';
import { useAuthStore } from '../../../../stores/auth/auth.store';

type Props = {
  selectedLectures: string[];
  setSelectedLectures: React.Dispatch<React.SetStateAction<string[]>>;
};

const HiddenLecturesSettingsSection = ({
  selectedLectures,
  setSelectedLectures,
}: Props) => {
  const [uniqueLectureTitlesList, setUniqueLectureTitlesList] = useState<
    string[]
  >([]);

  const { currentUser, currentUserIsUpdateNeeded, getCurrentUser } =
    useAuthStore();
  const { userIdCalendar } = useCalendarControlStore();
  const { fetchUniqueLectureTitles, uniqueLectureTitles } =
    useLectureEventStore();

  useEffect(() => {
    if (!currentUser || currentUserIsUpdateNeeded) {
      getCurrentUser();
      fetchUniqueLectureTitles(userIdCalendar || currentUser.id);
    }
  }, [currentUser, currentUserIsUpdateNeeded]);

  useEffect(() => {
    fetchUniqueLectureTitles(userIdCalendar || currentUser.id);
  }, []);

  useEffect(() => {
    setUniqueLectureTitlesList(Object.keys(uniqueLectureTitles));
  }, [uniqueLectureTitles]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setSelectedLectures((prevSelectedLectures) =>
      checked
        ? [...prevSelectedLectures, value]
        : prevSelectedLectures.filter((lecture) => lecture !== value),
    );
  };

  return (
    <SettingsSection title="Hidden Lectures">
      <div className={styles.HiddenLecturesSettingsContainer}>
        <div className={styles.checkboxesContainer}>
          {uniqueLectureTitlesList.map((lecture) => (
            <div key={lecture} className={styles.checkboxContainer}>
              <input
                type="checkbox"
                className="checkbox checkbox-primary"
                value={lecture}
                checked={selectedLectures.includes(lecture)}
                onChange={handleCheckboxChange}
              />
              <label>{lecture}</label>
            </div>
          ))}
        </div>
      </div>
    </SettingsSection>
  );
};

export default HiddenLecturesSettingsSection;
