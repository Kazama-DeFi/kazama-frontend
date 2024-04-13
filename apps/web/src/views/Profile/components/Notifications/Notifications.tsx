import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { getNotifications, markNotificationAsRead, markAllNotificationsAsRead, deleteNotification, deleteAllNotifications } from 'utils/apiRoutes';
import { useAccount } from 'wagmi';
import { 
  Text, 
  CloseIcon, 
  Button, 
  CheckmarkIcon, 
  DeleteOutlineIcon, 
  MarkReadIcon, 
  DeleteIcon, 
  NewFollowerIcon, 
  ChevronDownIcon, 
  ChevronUpIcon, 
  NotificationBellIcon,
  ChevronFilledIcon
} from '@kazamaswap/uikit';
import { useSignMessage } from '@kazamaswap/wagmi';
import ProgressBar from '@ramonak/react-progress-bar';
import { useUserData } from 'api/DataRetriever';

interface Notification {
  header: string,
  message: string;
  type: string;
  date: string;
  marked_as_readed: boolean;
  _id: string;
}

const Container = styled.div`
  position: relative;
`;

const MarkAsReadButton = styled.button`
display: flex;
align-items: center;
gap: 8px;  // Adjust the gap as needed
background-color: #0C77BC;
color: #ffffff;
padding: 6px 12px;
border: none;
border-radius: 4px;
cursor: pointer;
margin-right: 5px;
transition: background-color 0.3s ease, box-shadow 0.3s ease; /* Add transition effect */

&:hover {
  background-color: #0e91e5; /* Adjust the color on hover */
  box-shadow: 0 0 10px rgba(14, 147, 229, 0.596); /* Add glow effect on hover */
}
`;

const MarkAllAsReadButton = styled.button`
  background-color: #10D960; /* You can set your desired color */
  color: #ffffff;
  padding: 10px;
  margin-top: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
`;

const MarkAllButton = styled.button`
  width: 100%;
  background-color: #0C77BC;
  color: #ffffff;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center; // Center items vertically
  justify-content: center; // Center items horizontally
  gap: 6px; // Adjust the gap as needed
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  margin-right: 6px;

  &:hover {
    background-color: #0e91e5;
    box-shadow: 0 0 10px rgba(14, 147, 229, 0.596);
  }
`;

const DeleteButton = styled.button`
background-color: #142E4A;
color: #ffffff;
padding: 6px 12px;
border: none;
border-radius: 4px;
cursor: pointer;
display: flex;
align-items: center; // Center items vertically
justify-content: center; // Center items horizontally
gap: 6px; // Adjust the gap as needed
transition: background-color 0.3s ease, box-shadow 0.3s ease;

&:hover {
  background-color: #1b3f66; /* Adjust the color on hover */
  box-shadow: 0 0 10px rgba(27, 63, 102, 0.616); /* Add glow effect on hover */
}
`;

const DeleteAllButton = styled.button`
width: 100%;
background-color: #142E4A;
color: #ffffff;
padding: 6px 12px;
border: none;
border-radius: 4px;
cursor: pointer;
display: flex;
align-items: center; // Center items vertically
justify-content: center; // Center items horizontally
gap: 6px; // Adjust the gap as needed
transition: background-color 0.3s ease, box-shadow 0.3s ease;

&:hover {
  background-color: #1b3f66; /* Adjust the color on hover */
  box-shadow: 0 0 10px rgba(27, 63, 102, 0.616); /* Add glow effect on hover */
}
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 5px;
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const Dropdown = styled.div<{ isOpen: boolean }>`
position: absolute;
width: 375px;
z-index: 49999;
margin-left: -1px;
right: -170px;
top: 100%;
margin-top: 18px;
background: #21252b;
border: 1px solid rgba(0, 0, 0, 0.35);
box-shadow: rgba(0, 0, 0, 0.25) 0px 5px 8px -4px, rgba(0, 0, 0, 0.18) 0px 0px 20px 0px, rgba(0, 0, 0, 0.35) 0px 40px 34px -16px;
border-radius: 0.25rem;
word-wrap: break-word;  /* Breaks word when necessary to prevent overflow */
overflow-wrap: break-word; /* Handles overflow in a better way */
`;

const NotiDiv = styled.div`
min-height: 250px;
max-height: 400px;
overflow-y: auto;
padding: 10px;
margin-bottom: 50px;
`

const DropdownTop = styled.div`
  background-image: linear-gradient(to right, #DF1E84 , #0C77BC);
  padding: 15px;
  justify-content: space-between;
  display: flex;
  align-items: center;
  border-radius: 0.25rem 0.25rem 0 0;
`;

const CloseImage = styled(CloseIcon)`
  cursor: pointer;
  color: #fff;
  fill: #fff;
`;

const NotiBox = styled.div`
align-items: center;
    cursor: pointer;
    display: inline-flex;
    height: 40px;
    padding-left: 13px;
    padding-right: 10px;
    position: relative;
    margin-right: 5px;
    border-radius: 6px;
`

const NotificationItem = styled.div<{ unread: boolean }>`
  padding: 7px 10px 7px 10px;
  position: relative;
  background: #1a1e23;
  border-radius: 0.25rem;
  margin-bottom: 5px;
  &:hover {
    background-color: #1f2539; /* Adjust the color on hover */
  }
`;

const NewBadge = styled.div`
top: 50%;
left: 0;
padding: 4px 8px 4px 8px;
background-color: #142E4A;
color: #0C77BC;
border-radius: 25px;
font-size: 11px;
margin-right: 8px;
display: inline-block;
z-index: 1;
`

const StackIcon = styled.img`
  left: 0;
  z-index: 102;
  height: auto;
`;

const NotificationDot = styled.div`
position: absolute;
    background-image: linear-gradient(#10D960, #0b9e46);
    border: 2px solid #1a1e23;
    border-radius: 6px;
    width: 22px;
    height: 22px;
    margin-top: -10px;
    text-align: center;
    z-index: 1000;
    left: 3px;
`;

const DropdownSelect = styled.select`
  padding: 5px;
`;

const NotiStorageDiv = styled.div`
border-radius: 0.25rem;
border: 1px solid #1a1e23;
margin: 10px;
padding: 5px;
`

const HeaderText = styled(Text)`
font-size: 16px;
color: rgb(255, 255, 255);
font-weight: bold;
margin-left: 25px;
`

const IntroText = styled(Text)`
font-size: 16px;
color: rgb(255, 255, 255);
font-weight: bold;
`

const MarkIcon = styled(MarkReadIcon)`
fill: #fff !important;
width: 16px;
`

const DelIcon = styled(DeleteIcon)`
fill: #fff !important;
width: 16px;
`

const OptionsBox = styled.div`
display: flex;
align-items: flex-end;
padding: 5px 5px 5px 0px;
margin-left: 25px;
`;

const StyledChevronClosed = styled(ChevronFilledIcon)`
  width: 12px;
  margin-left: 5px;
`

const StyledChevronOpen = styled(ChevronFilledIcon)`
  transform: rotate(180deg);
  width: 12px;
  margin-left: 5px;
`

const NotificationIcon = styled(NotificationBellIcon)`
  fill: #3d444f;
`;

const NotificationsDropdown: React.FC = ({}) => {
  const { address: account } = useAccount();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { signMessageAsync } = useSignMessage();
  const [filterOption, setFilterOption] = useState('Show All');
  const userData = useUserData()
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Fetch user data
  useEffect(() => {
    if (userData.notifications.length > 0) {
      setNotifications(userData.notifications);
      setLoading(false);
    }
  }, [userData.notifications, isOpen]);

  // Readable date format
  const formatJoinedDate = (joinedAt: string): string => {
    const joinedDate = new Date(joinedAt);
    const currentDate = new Date();
  
    const timeDifference = currentDate.getTime() - joinedDate.getTime();
    const secondsDifference = Math.floor(timeDifference / 1000);
    const minutesDifference = Math.floor(secondsDifference / 60);
    const hoursDifference = Math.floor(minutesDifference / 60);
    const daysDifference = Math.floor(hoursDifference / 24);
  
    if (daysDifference === 0) {
      if (hoursDifference >= 1) {
        return `${hoursDifference} hour${hoursDifference > 1 ? 's' : ''} ago`;
      } else if (minutesDifference >= 1) {
        return `${minutesDifference} minute${minutesDifference > 1 ? 's' : ''} ago`;
      } else {
        return 'Just now';
      }
    } else if (daysDifference === 1) {
      return '1 day ago';
    } else if (daysDifference < 7) {
      return `${daysDifference} days ago`;
    } else if (daysDifference < 30) {
      const weeksDifference = Math.floor(daysDifference / 7);
      return `${weeksDifference} week${weeksDifference > 1 ? 's' : ''} ago`;
    } else if (daysDifference < 365) {
      const monthsDifference = Math.floor(daysDifference / 30);
      return `${monthsDifference} month${monthsDifference > 1 ? 's' : ''} ago`;
    } else {
      const yearsDifference = Math.floor(daysDifference / 365);
      return `${yearsDifference} year${yearsDifference > 1 ? 's' : ''} ago`;
    }
  };

  const formatCompleteDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
  
    const formattedDate = new Date(dateString).toLocaleString('en-US', options);
    return formattedDate;
  };

  const unreadCount = notifications.filter((notification) => !notification.marked_as_readed).length;

  // Function to mark as read
  const handleMarkAsRead = async (notificationId: string) => {
    try {
      const signature = await signMessageAsync({ message: account });
      await axios.post(
        markNotificationAsRead,
        { address: account, notificationId, signature },
        { headers: { 'Content-Type': 'application/json' } }
      );
      // Update the local state to mark the notification as read without refreshing the entire list
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification._id === notificationId ? { ...notification, marked_as_readed: true } : notification
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  // Function to mark all as readed
  const handleMarkAllAsRead = async () => {
    try {
      const signature = await signMessageAsync({ message: account });
      await axios.post(
        markAllNotificationsAsRead,
        { address: account, signature },
        { headers: { 'Content-Type': 'application/json' } }
      );

      // Update the local state to mark all notifications as read without refreshing the entire list
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.marked_as_readed ? notification : { ...notification, marked_as_readed: true }
        )
      );
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  // Handle notification delete
  const handleDeleteNotification = async (notificationId: string) => {
    try {
      const signature = await signMessageAsync({ message: account });
      await axios.post(
        deleteNotification,
        { address: account, notificationId, signature },
        { headers: { 'Content-Type': 'application/json' } }
      );

      // Update the local state to remove the deleted notification without refreshing the entire list
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification._id !== notificationId)
      );
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  // Handle delete all notifications
  const handleDeleteAllNotifications = async () => {
    try {
      const signature = await signMessageAsync({ message: account });
      await axios.post(
        deleteAllNotifications,
        { address: account, signature },
        { headers: { 'Content-Type': 'application/json' } }
      );

      // Update the local state to remove all notifications without refreshing the entire list
      setNotifications([]);
    } catch (error) {
      console.error('Error deleting all notifications:', error);
    }
  };

  const filteredNotifications = () => {
    switch (filterOption) {
      case 'Show All':
        return notifications;
      case 'Only Unread':
        return notifications.filter(notification => !notification.marked_as_readed);
      case 'Only Read':
        return notifications.filter(notification => notification.marked_as_readed);
      default:
        return notifications;
    }
  };

  const getNotificationInfo = (notificationType: string) => {
    switch (notificationType) {
      case 'new_follower':
        return {
          text: 'New follower',
          icon: <NewFollowerIcon width={26} fill="red !important" />,
        };
      case 'tip_received':
        return {
          text: 'You received a tip',
          icon: <NewFollowerIcon />,
        };
      case 'welcome_message':
        return {
          text: 'Welcome',
          icon: <NewFollowerIcon />,
        };
      default:
        return {
          text: 'New Notification!',
          icon: <NewFollowerIcon />,
        };
    }
  };

  return (
    <Container>
      <div onClick={() => setIsOpen(!isOpen)}>
        <NotiBox>
        <NotificationIcon unreadCount={unreadCount} width={24} />
        {isOpen ? (
          <StyledChevronOpen />
        ) : (
          <StyledChevronClosed />
        )}
        {unreadCount > 0 && <NotificationDot>
          <Text fontFamily="Industry-Black" fontSize="0.71rem" color="#1a1e23">
          {unreadCount}
          </Text>
        </NotificationDot>}
        </NotiBox>

        </div>
      {isOpen && (
        <Dropdown ref={dropdownRef} isOpen={isOpen}>
          <DropdownTop>
            <Text style={{fontSize: "15px", fontFamily: "Industry-Black"}}>
            NOTIFICATIONS
            </Text>
            <CloseImage onClick={() => setIsOpen(false)} />
          </DropdownTop>
          <NotiStorageDiv>
          <ProgressBar className="glowing-progress-bar" baseBgColor="rgba(79, 91, 142, 0.363)" margin="5px 0px 0px 0px" transitionTimingFunction="ease-in-out" 
          bgColor="#4f5b8e" height="8px" width="100%" borderRadius="2px" isLabelVisible={false} completed={notifications.length} maxCompleted={100} customLabel={notifications.length.toString()} />
          </NotiStorageDiv>

          {/* <DropdownSelect value={filterOption} onChange={(e) => setFilterOption(e.target.value)}>
            <option value="Show All">Show All</option>
            <option value="Only Unread">Only Unread</option>
            <option value="Only Read">Only Read</option>
          </DropdownSelect> */}
          <NotiDiv>
          <div>
            {notifications && notifications.length > 0 ? (
              notifications.map((notification) => (
                <NotificationItem key={notification._id} unread={!notification.marked_as_readed}>
<HeaderText>
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {!notification.marked_as_readed ? (
        <NewBadge>
          NEW
        </NewBadge>
      ) : (
        null
      )}
      <div style={{fontFamily: "Industry-Black"}}>{getNotificationInfo(notification.type).text}</div>
    </div>
    <Text style={{ fontSize: "12px", color: "#a6a7aa", marginLeft: '8px' }}>
      {formatJoinedDate(notification.date)}
    </Text>
  </div>
</HeaderText>
                  
<div style={{ display: 'flex', alignItems: 'center', marginTop: "10px" }}>
        <div>{getNotificationInfo(notification.type).icon}</div> {/* Render the icon here */}
        <div style={{ marginLeft: '8px', flexDirection: "row" }}>
          {/* <IntroText>
          {notification.header}
          </IntroText> */}

          <div>
          <Text fontSize="0.9rem" lineHeight="15px" marginTop="3px">
          <div style={{fontSize: "13px !important"}} dangerouslySetInnerHTML={{ __html: notification.message }} />
          </Text>
          </div>
          </div>
      </div>
      <div style={{marginTop: "15px", marginLeft: "25px"}}>
          <Text style={{ fontSize: "12px", color: "#a6a7aa" }}>
          {formatCompleteDate(notification.date)}
        </Text>
      </div>
                  <OptionsBox>
                  {!notification.marked_as_readed && (
                  <MarkAsReadButton onClick={() => handleMarkAsRead(notification._id)}>
                   <MarkIcon /> Mark as Read
                  </MarkAsReadButton>
                )}
                                                  <DeleteButton onClick={() => handleDeleteNotification(notification._id)}>
                   <DelIcon /> Delete
                  </DeleteButton>
                  </OptionsBox>
                </NotificationItem>
              ))
            ) : (
              <Text>No notifications</Text>
            )}
          </div>
          </NotiDiv>
          <ButtonsContainer>
            <MarkAllButton onClick={handleMarkAllAsRead} disabled={unreadCount === 0}>
            <MarkIcon /> Mark All Read
              </MarkAllButton>
              <DeleteAllButton onClick={handleDeleteAllNotifications} disabled={notifications.length === 0}>
              <DelIcon /> Delete All
              </DeleteAllButton>
            </ButtonsContainer>
        </Dropdown>
      )}
    </Container>
  );
};

export default NotificationsDropdown;