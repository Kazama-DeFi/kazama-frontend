import React, { useEffect, useState, useRef } from 'react';
import { styled, css } from "styled-components";
import memoize from 'lodash/memoize'
import { useWeb3React } from '@kazamaswap/wagmi';
import { SearchIcon, CloseIcon, ChevronUpIcon, ChevronDownIcon } from '@kazamaswap/uikit';
import { blocklist } from 'utils/apiRoutes';

interface User {
  _id: string;
  username: string;
  avatarImage: string;
}

const Container = styled.div`
position: relative;
display: inline-block;
padding: 15px;
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
bottom: 100%;
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
  max-width: 325px;

  .userrow:nth-of-type(odd) {
    background-color:#1a1e23;
    align-items: center;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 15px;
    display: flex;
    }
        
    .userrow:nth-of-type(even) {
    background-color:transparent;
    align-items: center;
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
color: #999;
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

const Blocklist: React.FC = () => {
  const { account } = useWeb3React()
  const [blockedUsers, setBlockedUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [sortedFilteredUsers, setSortedFilteredUsers] = useState<User[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const truncateHash = memoize(
    (address: string, startLength = 5, endLength = 5) => {
      if (!address) return ''
      return `${address.substring(0, startLength)} ... ${address.substring(address.length - endLength)}`
    },
    (address, startLength, endLength) => `${address}#${startLength}#${endLength}`,
  )

  // Start fetching
  useEffect(() => {
    // Fetch blocklist for connected wallet
    if (account) {
    const fetchData = async () => {
      const response = await fetch(`${blocklist}/${account}`)
      const data = await response.json();
      if (data.blocklist) {
        setBlockedUsers(data.blocklist);
      }
    }
    fetchData()
    }
  }, [account]);

  // Search
  useEffect(() => {
    // Filter online users based on the searchQuery
    if (blockedUsers) {
      const filtered = blockedUsers.filter((user) =>
        user.username?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchQuery, blockedUsers]);

  useEffect(() => {
    // Sort the filtered users alphabetically by username
    const sortedFiltered = [...filteredUsers];
    sortedFiltered.sort((a, b) => (a.user || '').localeCompare(b.user || ''));
    setSortedFilteredUsers(sortedFiltered);
  }, [filteredUsers]);

  useEffect(() => {
    // Function to close the dropdown when a click occurs outside of it
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    // Attach the event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Update blocked list if dropdown is opened
  const updateBlockList = async () => {
    const response = await fetch(`${blocklist}/${account}`)
    console.log(response)
    const data = await response.json();
    console.log(data); // Log the API response data
    if (data.blocklist) {
      setBlockedUsers(data.blocklist);
      console.log('Updating updateBlockList intervalId ..');
    }
  }

 // Only activate interval when component is open and stop unnecessary intervals while closed
 useEffect(() => {
  let intervalId_updateBlockList: NodeJS.Timeout | null = null;

  if (isDropdownOpen) {
    intervalId_updateBlockList = setInterval(updateBlockList, 5000); // Start updatelist interval if dropdown is open
  }

  return () => {
    if (intervalId_updateBlockList !== null) {
      clearInterval(intervalId_updateBlockList);
    }
  };
 }, [isDropdownOpen]);


  return (
    <Container>
      <div onClick={toggleDropdown}>
Blocklist {isDropdownOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
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
          style={{width: "100%"}}
        />
      </Searchbar>
      <Usersbox>
      {sortedFilteredUsers.length > 0 ? (
  <Selectbox>
    {sortedFilteredUsers.map((user) => (
      <div key={user._id} className="userrow">
        <UserAvatar src={user.avatarImage} alt={user.username} />
        {user.username.length > 20 ? truncateHash(user.username) : user.username}
      </div>
    ))}
  </Selectbox>
) : (
  <NoMatches>No matches</NoMatches>
)}
      </Usersbox>
    </Dropdown>
      )}
    </Container>
  );
};

export default Blocklist;