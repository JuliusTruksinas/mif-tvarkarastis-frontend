import { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import styles from './FriendsPage.module.scss';
import { useForm } from '../../../hooks/useForm';
import TextField from '../../../common/TextField/TextField';
import { useUserStore } from '../../../stores/user/user.store';
import FriendsTable from '../../../components/FriendsTable/FriendsTable';
import { Tab } from '../../../domain/common';

type FormInputs = {
  userFriendSearch: string;
};

const INPUTS = [
  {
    name: 'userFriendSearch',
    type: 'text',
    value: '',
  },
];

const TABS: Tab[] = [
  {
    name: 'allFriends',
    label: 'All friends',
  },
  {
    name: 'addFriends',
    label: 'Add friends',
  },
];

const FriendsPage = () => {
  const { findUsers, foundUsers, getFriends, friends, resetUserStore } =
    useUserStore();
  const { foundUsersIsUpdateNeeded } = useUserStore();
  const [selectedTab, setSelectedTab] = useState<string>(TABS[0].name);

  useEffect(() => {
    resetUserStore();
    if (selectedTab === 'allFriends') {
      getFriends();
    }
  }, [selectedTab]);

  useEffect(() => {
    return () => resetUserStore();
  }, []);

  const handleSubmit = (submitInputs: FormInputs) => {
    if (selectedTab === 'addFriends') {
      findUsers({
        searchQuery: submitInputs.userFriendSearch,
      });
    }
  };

  const { inputs, onInputChange, setNewInputValue, getSubmitInputs } =
    useForm<FormInputs>(INPUTS, handleSubmit, {
      submitOnChange: true,
    });

  const searchFieldValue = useMemo(() => {
    const foundInput = inputs.find(
      (input) => input.name === 'userFriendSearch',
    );
    return foundInput?.value;
  }, [inputs]);

  const filteredFriends = useMemo(() => {
    return friends.filter((friend) =>
      `${friend.firstName} ${friend.lastName}`
        .toLowerCase()
        .includes(searchFieldValue.toLowerCase()),
    );
  }, [friends, searchFieldValue]);

  useEffect(() => {
    if (foundUsersIsUpdateNeeded) {
      handleSubmit(getSubmitInputs(inputs));
    }
  }, [foundUsersIsUpdateNeeded]);

  const handleTabChange = (tab: Tab) => {
    setSelectedTab(tab.name);
    setNewInputValue('userFriendSearch', {
      value: '',
    });
  };

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
          {TABS.map((tab) => (
            <p
              key={tab.name}
              role="tab"
              className={classNames('tab', styles.tab, {
                [styles.selectedTab]: tab.name === selectedTab,
              })}
              onClick={() => handleTabChange(tab)}
            >
              {tab.label}
            </p>
          ))}
        </div>
        {inputs.map((input) => (
          <TextField
            key={input.name}
            name={input.name}
            value={input.value}
            type={input.type}
            label={input.label}
            onChange={onInputChange}
            elementClassName={classNames(
              'input input-bordered w-full focus:outline-none focus:ring-0',
              styles.inputField,
            )}
          />
        ))}
      </div>
      {selectedTab === 'allFriends' && filteredFriends?.length > 0 && (
        <FriendsTable users={filteredFriends} selectedTab={selectedTab} />
      )}
      {selectedTab === 'addFriends' && foundUsers?.length > 0 && (
        <FriendsTable users={foundUsers} selectedTab={selectedTab} />
      )}
    </div>
  );
};

export default FriendsPage;
