import { BasicUserInfo } from '../../domain/common';
import styles from './FriendsTable.module.scss';
import FriendsTableRow from './FriendsTableRow/FriendsTableRow';

type Props = {
  selectedTab: string;
  users: BasicUserInfo[];
};

const FriendsTable = ({ users, selectedTab }: Props) => {
  return (
    <div className={styles.friendsTable}>
      <table className="table">
        <thead className={styles.tableHeader}>
          <tr className={styles.tableRow}>
            <th>Full name</th>
            <th>Program name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <FriendsTableRow
              key={user.id}
              userInfo={user}
              action={selectedTab === 'allFriends' ? 'view' : 'add'}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FriendsTable;
