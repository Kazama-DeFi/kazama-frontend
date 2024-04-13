import React, { useEffect, useState, useRef } from 'react';
import { styled, css } from "styled-components";
import memoize from 'lodash/memoize'
import { SearchIcon, CloseIcon, ChevronUpIcon, ChevronDownIcon } from '@kazamaswap/uikit';

interface User {
  _id: string;
  username: string;
  avatar_image: string;
}

const Container = styled.div`
position: relative;
`

const Dropdown = styled.div<{ isOpen: boolean }>`
position: absolute;
display: block;
overflow: hidden;
width: 349px;
z-index: 49999;
margin-left: -1px;
margin-bottom: -1px;
bottom: 100%;
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

const Taglist: React.FC<{ selectedUsername: string; handleUsernameSelection: (username: string) => void; taglistInput: string }> = ({
  selectedUsername,
  handleUsernameSelection,
  taglistInput,
}) => {
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [sortedFilteredUsers, setSortedFilteredUsers] = useState<User[]>([]);
  const [isTaglistOpen, setIsTaglistOpen] = useState(true);
  const dropdownRef = useRef(null);

  // Function to handle username click
  const handleUserClick = (username) => {
    handleUsernameSelection(username);
    setIsTaglistOpen(false); // Close the taglist after username selection
  };

  const truncateHash = memoize(
    (address: string, startLength = 5, endLength = 5) => {
      if (!address) return ''
      return `${address.substring(0, startLength)} ... ${address.substring(address.length - endLength)}`
    },
    (address, startLength, endLength) => `${address}#${startLength}#${endLength}`,
  )

  // Start fetching
  useEffect(() => {
    // Fetch online users data from the API endpoint
    const fetchData = async () => {
        const response = await fetch('https://api.kazama.io/api/onlineUsers')
        const {onlineUsers} = await response.json()
        setOnlineUsers(onlineUsers)
      }
      fetchData()
  }, []);

  // Search
  useEffect(() => {
    // Filter online users based on the taglistInput
    const filtered = onlineUsers.filter((user) =>
    taglistInput && taglistInput.length > 0
      ? user.username.toLowerCase().includes(taglistInput.toLowerCase())
      : true
  );
  setFilteredUsers(filtered);
  }, [taglistInput, onlineUsers]);

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
        setIsTaglistOpen(false);
      }
    };

    // Attach the event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Function to retrieve updates when dropdown is open
  const updateList = async () => {
    const response = await fetch('https://api.kazama.io/api/onlineUsers')
    const {onlineUsers} = await response.json()
    setOnlineUsers(onlineUsers)
  }

 // Only activate interval when component is open and stop unnecessary intervals while closed
 useEffect(() => {
  let intervalId_updateList: NodeJS.Timeout | null = null;

  if (isTaglistOpen) {
    intervalId_updateList = setInterval(updateList, 5000); // Start updatelist interval if dropdown is open
  }

  return () => {
    if (intervalId_updateList !== null) {
      clearInterval(intervalId_updateList);
    }
  };
}, [isTaglistOpen]);

  return (
    <Container>
      {isTaglistOpen && (
        <Dropdown isOpen={true}>
         <DropdownTop>
            <div style={{ display: 'inline-flex', alignItems: 'center' }}>Tag User</div>
             <CloseIcon onClick={() => setIsTaglistOpen(false)} />
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
                    <div
                      key={user._id}
                      className="userrow"
                      onClick={() => handleUserClick(user.username)} // Handle username click
                      >
                      <UserAvatar src={user.avatar_image} alt={user.username} />
                      @ {user.username.length > 20 ? truncateHash(user.username) : user.username}
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

export default Taglist;