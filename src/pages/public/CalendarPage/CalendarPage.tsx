import { useState } from 'react';
import classNames from 'classnames';
import Calendar from '../../../components/Calendar/Calendar';
import styles from './CalendarPage.module.scss';
import addIcon from '../../../assets/icons/add.svg';
import { ReactSVG } from 'react-svg';
import UserEventModal from '../../../components/UserEventModal/UserEventModal';
import { useAuthStore } from '../../../stores/auth/auth.store';
import { UserEvent } from '../../../domain/userEvent';
import { LectureEvent } from '../../../domain/lectureEvent';
import LectureEventModal from '../../../components/LectureEventModal/LectureEventModal';

const CalendarPage = () => {
  const [isUserEventModalOpen, setIsUserEventModalOpen] =
    useState<boolean>(false);
  const [isLectureEventModalOpen, setIsLectureEventModalOpen] =
    useState<boolean>(false);
  const [selectedUserEvent, setSelectedUserEvent] = useState<UserEvent | null>(
    null,
  );
  const [selectedLectureEvent, setSelectedLectureEvent] =
    useState<LectureEvent | null>(null);
  const { currentUser } = useAuthStore();

  return (
    <>
      <div className={styles.calendarPageContainer}>
        <div className={styles.headerContainer}>
          <div className={styles.textContainer}>
            <h1 className={styles.pageTitle}>
              Welcome back, {currentUser?.firstName}
            </h1>
            <p className={styles.pageSubtitle}>
              View both your personal and friends’ calendars, and create custom
              events
            </p>
          </div>
          <button
            className={classNames('btn', styles.addEventBtn)}
            onClick={() => setIsUserEventModalOpen(true)}
          >
            <ReactSVG src={addIcon} />
            <p>Add event</p>
          </button>
        </div>
        <Calendar
          setSelectedUserEvent={setSelectedUserEvent}
          setIsUserEventModalOpen={setIsUserEventModalOpen}
          setSelectedLectureEvent={setSelectedLectureEvent}
          setIsLectureEventModalOpen={setIsLectureEventModalOpen}
        />
      </div>
      {isUserEventModalOpen && (
        <UserEventModal
          onClose={() => setIsUserEventModalOpen(false)}
          userEvent={selectedUserEvent}
          setSelectedUserEvent={setSelectedUserEvent}
        />
      )}
      {isLectureEventModalOpen && selectedLectureEvent && (
        <LectureEventModal
          onClose={() => setIsLectureEventModalOpen(false)}
          lectureEvent={selectedLectureEvent}
          setSelectedLectureEvent={setSelectedLectureEvent}
        />
      )}
    </>
  );
};

export default CalendarPage;
