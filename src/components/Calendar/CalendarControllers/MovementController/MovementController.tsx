import FullCalendar from '@fullcalendar/react';
import { ReactSVG } from 'react-svg';
import leftArrowIcon from '../../../../assets/icons/left-arrow.svg';
import rightArrowIcon from '../../../../assets/icons/right-arrow.svg';

type Props = {
  calendarRef: React.RefObject<FullCalendar>;
  setTitle: (string) => void;
};

const MovementController = ({ calendarRef, setTitle }: Props) => {
  const handleTodayClick = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.today();
      setTitle(calendarApi.view.title);
    }
  };

  const handlePrevClick = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.prev();
      setTitle(calendarApi.view.title);
    }
  };

  const handleNextClick = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.next();
      setTitle(calendarApi.view.title);
    }
  };

  return (
    <div className="join join-horizontal">
      <button className="btn join-item" onClick={handlePrevClick}>
        <ReactSVG src={leftArrowIcon} />
      </button>
      <button className="btn join-item" onClick={handleTodayClick}>
        Today
      </button>
      <button className="btn join-item" onClick={handleNextClick}>
        <ReactSVG src={rightArrowIcon} />
      </button>
    </div>
  );
};

export default MovementController;
