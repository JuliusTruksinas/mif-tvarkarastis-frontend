import classNames from 'classnames';
import styles from './FriendsPage.module.scss';
import threeDotsIcon from '../../../assets/icons/threedots.svg';
import { ReactSVG } from 'react-svg';

const FriendsPage = () => {
  return (
    <div className={styles.friendsPageContainer}>
      <div className={styles.friendsFormContainer}>
        <div>
          <h1 className={styles.title}>Friends</h1>
          <p className={styles.pageSubtitle}>
            View your current friends and add new ones
          </p>
        </div>
        <div
          role="tablist"
          className={classNames('tabs tabs-bordered', styles.tabListElement)}
        >
          <a
            role="tab"
            className={classNames('tab', styles.tab, styles.selectedTab)}
          >
            All friends
          </a>
          <a role="tab" className={classNames('tab', styles.tab)}>
            Add friends
          </a>
        </div>
        <input
          className={classNames(
            'input input-bordered w-full focus:outline-none focus:ring-0',
            styles.inputField,
          )}
          type="name"
        />
      </div>
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
            <tr className={styles.tableRow}>
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
                        src="https://img.daisyui.com/images/profile/demo/5@94.webp"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div className={styles.nameContainer}>
                    <div className="font-bold">Yancy Tear</div>
                  </div>
                </div>
              </td>
              <td className={styles.tableData}>
                Programų sistemos
                <br />
                <span
                  className={classNames(
                    'badge badge-ghost badge-sm',
                    styles.courseElement,
                  )}
                >
                  3 kursas
                </span>
              </td>
              {/* <td className={classNames(styles.tableData, styles.alignTdRight)}>
                <div className={styles.addBtnContainer}>
                  <button className={classNames('btn', styles.addBtn)}>
                    Add
                  </button>
                </div>
              </td> */}
              <td className={classNames(styles.tableData, styles.alignTdRight)}>
                <div className={styles.threeDotsIconContainer}>
                  <button>
                    <ReactSVG src={threeDotsIcon} />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FriendsPage;
