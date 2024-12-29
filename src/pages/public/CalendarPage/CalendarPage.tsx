import { useEffect, useState } from 'react';
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
import ViewUserEventModal from '../../../components/ViewUserEventModal/ViewUserEventModal';
import { useCalendarControlStore } from '../../../stores/calendar-control/calendarControl.store';

const CalendarPage = () => {
  const [isUserEventModalOpen, setIsUserEventModalOpen] =
    useState<boolean>(false);
  const [isViewUserEventModalOpen, setIsViewUserEventModalOpen] =
    useState<boolean>(false);
  const [isLectureEventModalOpen, setIsLectureEventModalOpen] =
    useState<boolean>(false);
  const [selectedUserEvent, setSelectedUserEvent] = useState<UserEvent | null>(
    null,
  );
  const [selectedLectureEvent, setSelectedLectureEvent] =
    useState<LectureEvent | null>(null);
  const { currentUser, getCurrentUser, currentUserIsUpdateNeeded } =
    useAuthStore();
  const { userIdCalendar, setUserIdCalendar } = useCalendarControlStore();

  useEffect(() => {
    if (!currentUser || currentUserIsUpdateNeeded) {
      getCurrentUser();
    }
  }, [currentUser, currentUserIsUpdateNeeded]);

  useEffect(() => {
    if (currentUser && !userIdCalendar) {
      setUserIdCalendar(currentUser.id);
    }
  }, [currentUser]);

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
          setIsViewUserEventModalOpen={setIsViewUserEventModalOpen}
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
      {isViewUserEventModalOpen && selectedUserEvent && (
        <ViewUserEventModal
          onClose={() => setIsViewUserEventModalOpen(false)}
          userEvent={selectedUserEvent}
          setSelectedUserEvent={setSelectedUserEvent}
        />
      )}
    </>
  );
};

export default CalendarPage;
