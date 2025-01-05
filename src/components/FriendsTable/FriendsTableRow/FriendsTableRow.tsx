import classNames from 'classnames';
import { ReactSVG } from 'react-svg';
import { useNavigate } from 'react-router';
import styles from './FriendsTableRow.module.scss';
import threeDotsIcon from '../../../assets/icons/threedots.svg';
import { BasicUserInfo } from '../../../domain/common';
import { useFriendStore } from '../../../stores/friend/friend.store';
import { routes } from '../../../config/Router/routes';
import { useCalendarControlStore } from '../../../stores/calendar-control/calendarControl.store';
import { FALLBACK_PROFILE_PHOTO_URL } from '../../../constants';

type Props = {
  userInfo: BasicUserInfo;
  action: 'add' | 'view';
};

const FriendsTableRow = ({ userInfo, action }: Props) => {
  const navigate = useNavigate();
  const { sendFriendRequest, removeFriend } = useFriendStore();
  const { setUserIdCalendar } = useCalendarControlStore();

  const handleRemove = (friendToRemoveId: string) => {
    removeFriend(friendToRemoveId);
  };

  return (
    <tr className={styles.tableRow} key={userInfo.id}>
      <td className={styles.tableData}>
        <div
          className={classNames(
            'flex items-center gap-3',
            styles.avatarNameContainer,
          )}
        >
          <div className={classNames('avatar', styles.avatar)}>
            <div
              className={classNames(
                'mask mask-squircle h-12 w-12',
                styles.imageContainer,
              )}
            >
              <img
                src={userInfo.profilePhotoUrl || FALLBACK_PROFILE_PHOTO_URL}
                alt=""
                onError={(e) => {
                  e.currentTarget.src = FALLBACK_PROFILE_PHOTO_URL;
                }}
              />
            </div>
          </div>
          <div className={styles.nameContainer}>
            <div className="font-bold">{`${userInfo.firstName} ${userInfo.lastName}`}</div>
          </div>
        </div>
      </td>
      <td className={styles.tableData}>
        {userInfo.programName}
        <br />
        <span
          className={classNames(
            'badge badge-ghost badge-sm',
            styles.courseElement,
          )}
        >
          {userInfo.course} course
        </span>
      </td>

      {action === 'add' ? (
        <td className={classNames(styles.tableData, styles.alignTdRight)}>
          <div className={styles.addBtnContainer}>
            <button
              className={classNames('btn', styles.addBtn)}
              onClick={() => {
                sendFriendRequest(userInfo.id);
              }}
            >
              Add
            </button>
          </div>
        </td>
      ) : (
        <td
          className={classNames(
            styles.tableData,
            styles.alignTdRight,
            styles.alignRight,
          )}
        >
          <div className="dropdown dropdown-left">
            <div className={styles.threeDotsIconContainer}>
              <button>
                <ReactSVG src={threeDotsIcon} />
              </button>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              <li onClick={() => handleRemove(userInfo.id)}>
                <p>Remove</p>
              </li>
              <li
                onClick={() => {
                  setUserIdCalendar(userInfo.id);
                  navigate(routes.calendar);
                }}
              >
                <p>View Calendar</p>
              </li>
            </ul>
          </div>
        </td>
      )}
    </tr>
  );
};

export default FriendsTableRow;
