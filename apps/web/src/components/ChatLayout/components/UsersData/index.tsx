import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { styled, css } from "styled-components";
import memoize from 'lodash/memoize'
import { SearchIcon, CloseIcon, ChevronUpIcon, ChevronDownIcon, Image, ChevronFilledIcon } from '@kazamaswap/uikit';
import { useOnlineUsersData} from 'api/OnlineUsersRetriever';

const Container = styled.div`
position: relative;
display: inline-block;
padding: 8px;
`

const Dropdown = styled.div<{ isOpen: boolean }>`
position: absolute;
border: 1px solid #ccc;
overflow: hidden;
margin-top: 14px;
width: 350px;
z-index: 49999;
margin-left: -16px;
background: #21252b;
border: 1px solid rgba(0, 0, 0, 0.35);
  ${({ isOpen }) => isOpen && ` /* Add styles for when the dropdown is open */ `}
`;

const Searchbar = styled.div`
position: sticky;
top: 0;
background: #21252b;
display: flex;
z-index: 1;
padding: 8px;
border-top: 1px solid rgba(0, 0, 0, 0.35);
border-bottom: 1px solid rgba(0, 0, 0, 0.35);
`

const Usersbox = styled.div`
  height: 700px;
  max-height: 500px;
  overflow-y: auto;

  .userrow:nth-of-type(odd) {
    background-color:#1a1e23;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 15px;
    display: flex;
    }
        
    .userrow:nth-of-type(even) {
    background-color:transparent;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 15px;
    display: flex;
    }
`;

const UserRow = styled.div`
  width: 100%;
  border: none;
  padding-left: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
  outline: none;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Selectbox = styled.div`
width: 100%;
border: none;
outline: none;
background-color: transparent;
cursor: pointer;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
`

const NoMatches = styled.div`
display: flex;
align-items: center;
justify-content: center;
height: 100%;
padding: 8px;
color: #a6a7aa;
font-family: Industry-Black;
font-size: 22px;
`

const DropdownTop = styled.div`
background-color: #1a1e23;
padding: 15px;
justify-content: space-between;
display: flex;
align-items: center;
`

const SearchInput = styled.input`
background: #21252b;
border: 1px transparent;
`

const UserAvatar = styled.img` // Create a styled component for the user avatar
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 10px;
`;

const OnlineWrapper = styled.div`
margin-right: 10px;
padding: 12px;
border-radius: 0.3rem;
height: 40px;
background: #21252b;
min-width: 105px;
max-width: 175px; /* Set maximum width */
width: auto; /* Let the width adjust to the content */
`

const TimerContainer = styled.div`
width: auto;
max-width: 60px;
text-align: center;
padding: 0 10px;
`

const Dot = styled.div`
  height: 9px;
  width: 9px;
  background-color: #10D960;
  border-radius: 50%;
  margin-bottom: 2px;
  display: inline-block;
  box-shadow: 0 0 0 0 rgba(16, 217, 96, 0.486);
  transform: scale(1);
  animation: pulse 1.3s infinite;
  @keyframes pulse {
    0% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(16, 217, 96, 0.486);
    }
  
    70% {
      transform: scale(1);
      box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
    }
  
    100% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    }
  }
`

const StyledChevronClosed = styled(ChevronFilledIcon)`
  width: 12px;
  margin-left: 5px;
`

const StyledChevronOpen = styled(ChevronFilledIcon)`
  transform: rotate(180deg);
  width: 12px;
  margin-left: 5px;
`

interface User {
  _id: string;
  username: string;
  avatar_image: string;
  online_since: string;
}

const OnlineUsers: React.FC = () => {
  const onlineUsersData = useOnlineUsersData();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [sortedFilteredUsers, setSortedFilteredUsers] = useState<User[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<number>(Date.now());
  const [userCurrentTimes, setUserCurrentTimes] = useState<Record<string, number>>({});
  const dropdownRef = useRef(null);

  const truncateHash = memoize(
    (address: string, startLength = 5, endLength = 5) => {
      if (!address) return ''
      return `${address.substring(0, startLength)} ... ${address.substring(address.length - endLength)}`
    },
    (address, startLength, endLength) => `${address}#${startLength}#${endLength}`,
  );

  // Search
  useEffect(() => {
    const filtered = onlineUsersData.onlineUsers.filter((user) =>
      searchQuery && searchQuery.length > 0
        ? user.username.toLowerCase().includes(searchQuery.toLowerCase())
        : true
    );
    setFilteredUsers(filtered);
  }, [searchQuery, onlineUsersData.onlineUsers]);

  useEffect(() => {
    const sortedFiltered = [...filteredUsers];
    sortedFiltered.sort((a, b) => (a.user || '').localeCompare(b.user || ''));
    setSortedFilteredUsers(sortedFiltered);
  }, [filteredUsers]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const calculateOnlineDuration = (cameOnlineAt: string, userId: string): string => {
    const cameOnlineTimestamp = new Date(cameOnlineAt).getTime();
    const currentTime = userCurrentTimes[userId] || Date.now();
    const durationInSeconds = Math.floor((currentTime - cameOnlineTimestamp) / 1000);
    const hours = String(Math.floor(durationInSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((durationInSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(durationInSeconds % 60).padStart(2, '0');

    return `${hours} : ${minutes} : ${seconds}`;
  };

  const updateCurrentTime = () => {
    requestAnimationFrame(() => {
      setCurrentTime(Date.now());
    });
  };

  useEffect(() => {
    let intervalId_timeOnline: NodeJS.Timeout | null | undefined;

    if (isDropdownOpen) {
      intervalId_timeOnline = setInterval(updateCurrentTime, 1000);
    }

    return () => {
      if (intervalId_timeOnline) {
        clearInterval(intervalId_timeOnline);
      }
    };
  }, [isDropdownOpen]);

  return (
    <Container>
      <div onClick={toggleDropdown} style={{ cursor: "pointer", alignItems: "center", display: "flex" }}>
        <OnlineWrapper>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
  <div style={{ display: "flex", alignItems: "center" }}>
    <div>
      <Image
        src={`/images/chat/online.svg`}
        width={24}
        height={24}
      />
    </div>
    <div style={{ color: "#fff", marginRight: "4px" }}>
      <Dot /> 
    </div>
  </div>
  <div style={{ display: "flex", alignItems: "center" }}>
    <div style={{ color: "#10D960", marginRight: "4px", fontFamily: "Flama Bold", fontSize: "12px" }}>
      {onlineUsersData.onlineAmount}
    </div>
    <div style={{ color: "rgba(255, 255, 255, .7)", fontSize: "12px", fontFamily: "Flama Bold", marginRight: "4px" }}>
      / {onlineUsersData.totalUsers}
    </div>
    {isDropdownOpen ? <StyledChevronOpen /> : <StyledChevronClosed />}
  </div>
</div>
        </OnlineWrapper>
      </div>
      {isDropdownOpen && (
        <Dropdown isOpen={isDropdownOpen} ref={dropdownRef}>
          <DropdownTop>
            <div style={{ display: 'inline-flex', alignItems: 'center' }}>Online list</div>
            <CloseIcon onClick={() => setIsDropdownOpen(false)} />
          </DropdownTop>
          <Searchbar>
            <SearchIcon mr="7px" ml="7px" />
            <SearchInput
              type="text"
              placeholder="Search online users"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: "100%" }}
            />
          </Searchbar>
          <Usersbox>
            {sortedFilteredUsers.length > 0 ? (
              <Selectbox>
                {sortedFilteredUsers.map((user) => (
                  <div key={user._id} className="userrow" style={{ justifyContent: "space-between", display: "flex", fontSize: "13px" }}>
                    <div style={{ alignItems: "center", display: "flex" }}>
                      <UserAvatar src={user.avatar_image} alt={user.username} />
                      {user.username.length > 20 ? truncateHash(user.username) : user.username}
                    </div>
                    <div style={{ alignItems: "center", display: "flex", padding: "0px 0px 0px 0px", width: "auto", minWidth: "75px", overflow: "hidden" }}>
  {calculateOnlineDuration(user.online_since, currentTime.toString())}
</div>
                  </div>
                ))}
              </Selectbox>
            ) : (
              <NoMatches>NO USERS FOUND</NoMatches>
            )}
          </Usersbox>
        </Dropdown>
      )}
    </Container>
  );
};

export default OnlineUsers;