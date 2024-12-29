import { useEffect, useMemo } from 'react';
import { useForm } from '../../../../hooks/useForm';
import SelectTextField from '../../../../common/TextField/SelectTextField/SelectTextField';
import styles from './UserCalendarController.module.scss';
import { USER_CALENDAR_OPTIONS } from '../CalendarControllersConstants';
import { useUserStore } from '../../../../stores/user/user.store';
import { useAuthStore } from '../../../../stores/auth/auth.store';
import { useCalendarControlStore } from '../../../../stores/calendar-control/calendarControl.store';

type FormInputs = {
  userCalendarController: string;
};

const UserCalendarController = () => {
  const { userIdCalendar, setUserIdCalendar } = useCalendarControlStore();

  const INPUTS = [
    {
      name: 'userCalendarController',
      type: 'select',
      value: userIdCalendar,
      options: USER_CALENDAR_OPTIONS,
    },
  ];

  const { inputs, onInputChange, setNewInputValue } =
    useForm<FormInputs>(INPUTS);
  const { getFriends, friends, friendsIsUpdateNeeded } = useUserStore();
  const { currentUser, getCurrentUser, currentUserIsUpdateNeeded } =
    useAuthStore();

  useEffect(() => {
    getFriends();
  }, []);

  useEffect(() => {
    if (!currentUser || currentUserIsUpdateNeeded) {
      getCurrentUser();
    }
  }, [currentUser, currentUserIsUpdateNeeded]);

  useEffect(() => {
    if (friendsIsUpdateNeeded) {
      getFriends();
    }
  }, [friendsIsUpdateNeeded]);

  const friendsOptions = useMemo(() => {
    if (!currentUser) {
      return [];
    }

    const friendsOptions = friends.map((friend) => ({
      label: `${friend.firstName} ${friend.lastName}`,
      value: friend.id,
    }));

    return [{ label: 'My calendar', value: currentUser.id }, ...friendsOptions];
  }, [friends, currentUser]);

  useEffect(() => {
    setNewInputValue('userCalendarController', { options: friendsOptions });
  }, [friendsOptions]);

  return (
    <>
      {inputs.map((input) => (
        <SelectTextField
          key={input.name}
          name={input.name}
          value={input.value}
          options={input.options}
          onChange={(e) => {
            onInputChange(e);
            setUserIdCalendar(e.target.value);
          }}
          elementClassName={styles.userCalendarControllerRoot}
        />
      ))}
    </>
  );
};

export default UserCalendarController;
