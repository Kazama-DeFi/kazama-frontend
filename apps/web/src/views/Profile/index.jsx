import axios from 'axios'
import styled from 'styled-components'
import React, { useState, useEffect, useMemo, useRef } from 'react'
import { useRouter } from 'next/router'
import { Heading, Text } from '@kazamaswap/uikit'
import ProgressBar from '@ramonak/react-progress-bar'
import truncateHash from '@kazamaswap/utils/truncateHash'
import { useSignMessage } from 'wagmi'
import { useWeb3React } from '@kazamaswap/wagmi'
import ProfilePage from 'components/Layout/ProfilePage'
import { host, getUserData, followUser, unfollowUser, getUsername, addNotification } from 'utils/apiRoutes'
import AvatarImage from './components/Banner/AvatarImage'
import Ranking from './styled-components/Ranking'
import MessageWall from './components/MessagesWall'
import RightPart from './right'
import LeftPart from './left'
import { useSocket } from 'api/SocketManager'
import { io } from "socket.io-client";
import { useUserData } from 'api/DataRetriever'

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  background: ${({ image }) => `url(${image})`};
    background-size: cover;
    height: 300px;
    padding: 0 115px;
    border-radius: 5px 5px 0px 0px;
  `;

const AccountText = styled(Text)`
  font-family: Industry-Black;
  color: white;
  font-size: 36px;
  font-weight: 600;
  text-shadow: 
    -1px -1px 0 black,  
    2px -1px 0 black,
    -1px 2px 0 black,
    2px 2px 0 black;
  padding: 0px 0px 0px 8px;
  user-select: none;
  ::after {
    content: attr(data-text);
    pointer-events: auto;
  }
`

const MiscText = styled(Text)`
  font-size: 16px;
  font-weight: 600;
  padding-left: 8px;
  user-select: none;
`

const FollowText = styled(Text)`
  font-family: Industry-Black;
  color: white;
  font-size: 36px;
  font-weight: 600;
  text-shadow: 
    -1px -1px 0 black,  
    2px -1px 0 black,
    -1px 2px 0 black,
    2px 2px 0 black;
  padding: 8px;
  user-select: none;
`

const HeaderBar = styled.div`
background: #1a1e23;
border-radius: 0px 0px 5px 5px;
height: 50px;
`

const ProfileContainer = styled.div`
display: flex;

justify-content: space-between;
border-radius: 5px;
width: 100%;
`

const LeftColumn = styled.div`
  flex-basis: 23%;
`;

const WallColumn = styled.div`
  flex-basis: 55%;
  margin-right: 10px;
  margin-left: 10px;
`;

const RightColumn = styled.div`
  flex-basis: 23%;
`;

const AvatarSection = styled.div`
  flex: 1;
  display: flex;             // Use flexbox to control the layout
  align-items: center;       // Center align items vertically
`;

const UsernameWrapper = styled.div`
  margin-left: 8px;          // Optional: Add some margin between the avatar and the username
`;

const MiddleSection = styled.div`
  flex: 2;
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;             // Use flexbox to control the layout
  align-items: center;       // Center align items vertically
  justify-content: right;   // Center align items horizontally
  flex-direction: row;    // Stack the items vertically
  flex-wrap: wrap;

  @media screen and (max-width: 768px) { // Adjust the breakpoint as needed
    flex-direction: column; // Stack the flex items vertically
    align-items: flex-start; // Align items to the start of the container
    padding-top: 16px; // Optional: Add padding to the top of each item
  }
`;

// Kazama mongoose ENV's
const TOTAL_FOLLOWERS = process.env.NEXT_PUBLIC_KAZAMA_FOLLOWERS_AMOUNT_API
const TOTAL_FOLLOWING = process.env.NEXT_PUBLIC_KAZAMA_FOLLOWING_AMOUNT_API

const Profile = () => {

  // Constants
  const { account } = useWeb3React()
  const socket = useSocket();
  const { signMessageAsync } = useSignMessage()
  const profilePath = useRouter().query.accountAddress;
  const [spectator, setSpectator] = useState('')
  const [followers, setFollowers] = useState(0)
  const [following, setFollowing] = useState(0)
  const [profileData, setProfileData] = useState({
    address: '',
    general_data: {
      username: '',
      avatar_image: ''
    },
    profile_data: {
      header_image: ''
    },
    rank_data: {
      level: 0,
      rank_progress: 0,
    },
    joined_at: '',
  });

  // Changeable data
  let background = 'rgba(79, 91, 142, 0.363)';
  let progressColor = '#4f5b8e';

  // Retrieve data
  const fetchData = async() => {
    await axios.get(`${getUserData}/${profilePath}`).then((response) => {
      setProfileData(response.data)
    });
  }

  // Retrieve followers
  const fetchFollowers = async() => {
    await axios.get(`${TOTAL_FOLLOWERS}/${profilePath}`).then((response) => {
      setFollowers(response.data.totalFollowers)
    });
  }

  // Retrieve following
  const fetchFollowing = async() => {
    await axios.get(`${TOTAL_FOLLOWING}/${profilePath}`).then((response) => {
      setFollowing(response.data.totalFollowing)
    });
  }

  // Retrieve spectator username
  const fetchSpectator = async() => {
    await axios.get(`${getUsername}/${account}`).then((response) => {
      setSpectator(response.data.general_data.username)
    });
  }
  
  // Fetch all data
  useEffect(() => {
    fetchData()
  }, [profilePath, account])

  useEffect(() => {
    fetchFollowers()
  }, [profilePath, account])

  useEffect(() => {
    fetchFollowing()
  }, [profilePath, account])

  useEffect(() => {
    fetchSpectator()
  }, [profilePath, account])

  // Fetch truncate on address
  const nameDisplay = useMemo(() => {
    if (profileData.general_data.username !== profileData.address) {
      return `${profileData.general_data.username}`
    } else {
      return truncateHash(profileData.address, 5, 3)
    }
  }, [profileData, profilePath])

  // Fetch truncate on spectator
  const spectatorDisplay = useMemo(() => {
    if (spectator !== account) {
      return `${spectator}`
    } else {
      return truncateHash(account, 5, 3)
    }
  }, [profileData, profilePath])

// Handle follow
const handleFollow = async () => {
  try {
    const signature = await signMessageAsync({ message: account });
    const response = await fetch(followUser, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        followerAddress: account,
        followedAddress: profileData.address,
        address: account,
        signature
      }),
    })

    const data = await response.json();

    // Add notification after successful follow
    if (response.ok) {
      await postNotification('follow', profilePath);
      // Emit the follower data to the server
      socket.current.emit("update-followers-data", profilePath);
    }
  } catch (error) {
    console.error('Error Following User:', error);
  }
};

  // Handle unfollow
  const handleUnfollow = async () => {
    try {
      const signature = await signMessageAsync({ message: account });
      const response = await fetch(unfollowUser, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          followerAddress: account,
          followedAddress: profileData.address,
          address: account,
          signature
        }),
      })

      if (response.ok) {
        // Emit the follower data to the server
        socket.current.emit("update-followers-data", profilePath);
      }
    } catch (error) {
      console.error('Error Following User:', error);
    }
  };

  useEffect(() => {
    // Set up socket event listeners
    if (socket.current) {
      // Listen for the followers-data-updated event from the server
      socket.current.on("followers-data-updated", (data) => {
        // Update the followers count when the event is received
        const { followersCount } = data;
        setFollowers(followersCount);
      });
    }
  }, []);

// Function to add notification
const postNotification = async (type, identifier) => {
  try {
    const notificationHeader = `${spectatorDisplay} is now following you`
    const notificationMessage = (type === 'follow') ? `${spectatorDisplay} is now following you` : 'Someone has unfollowed you.';

    const response = await fetch(`${addNotification}/${identifier}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        header: notificationHeader,
        message: notificationMessage,
        type: "new_follower",
      }),
    });

    const result = await response.json();
    console.log('Add Notification Response:', result);
  } catch (error) {
    console.error('Error Adding Notification:', error);
  }
};

  // Function to format joined date
  const formatJoinedDate = (joinedAt) => {
    const joinedDate = new Date(joinedAt);
    const currentDate = new Date();
  
    const timeDifference = currentDate.getTime() - joinedDate.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  
    if (daysDifference === 1) {
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

        // Set styling data
        if (profileData.rank_data.level === 0) {
          background = 'rgba(79, 91, 142, 0.363)'
          progressColor = '#4f5b8e'
        } else if (profileData.rank_data.level === 1) {
          background = 'rgba(79, 91, 142, 0.363)'
          progressColor = '#4f5b8e'
        } else if (profileData.rank_data.level === 2) {
          background = 'rgba(79, 91, 142, 0.363)'
          progressColor = '#4f5b8e'
        } else if (profileData.rank_data.level === 3) {
          background = 'rgba(79, 91, 142, 0.363)'
          progressColor = '#4f5b8e'
        } else if (profileData.rank_data.level === 4) {
          background = 'rgba(79, 91, 142, 0.363)'
          progressColor = '#4f5b8e'
        } else if (profileData.rank_data.level === 5) {
          background = 'rgba(79, 91, 142, 0.363)'
          progressColor = '#4f5b8e'
        } else if (profileData.rank_data.level === 6) {
          background = 'rgba(244, 147, 43, 0.445)'
          progressColor = '#F4932B'
        } else if (profileData.rank_data.level === 7) {
          background = 'rgba(244, 147, 43, 0.445)'
          progressColor = '#F4932B'
        } else if (profileData.rank_data.level === 8) {
          background = 'rgba(244, 147, 43, 0.445)'
          progressColor = '#F4932B'
        } else if (profileData.rank_data.level === 9) {
          background = 'rgba(244, 147, 43, 0.445)'
          progressColor = '#F4932B'
        } else if (profileData.rank_data.level === 10) {
          background = 'rgba(244, 147, 43, 0.445)'
          progressColor = '#F4932B'
        } else if (profileData.rank_data.level === 11) {
          background = 'rgba(54, 155, 255, 0.432)'
          progressColor = '#369CFF'
        } else if (profileData.rank_data.level === 12) {
          background = 'rgba(54, 155, 255, 0.432)'
          progressColor = '#369CFF'
        } else if (profileData.rank_data.level === 13) {
          background = 'rgba(54, 155, 255, 0.432)'
          progressColor = '#369CFF'
        } else if (profileData.rank_data.level === 14) {
          background = 'rgba(54, 155, 255, 0.432)'
          progressColor = '#369CFF'
        } else if (profileData.rank_data.level === 15) {
          background = 'rgba(12, 186, 41, 0.404)'
          progressColor = '#0CBA28'
        } else if (profileData.rank_data.level === 16) {
          background = 'rgba(12, 186, 41, 0.404)'
          progressColor = '#0CBA28'
        } else if (profileData.rank_data.level === 17) {
          background = 'rgba(12, 186, 41, 0.404)'
          progressColor = '#0CBA28'
        } else if (profileData.rank_data.level === 18) {
          background = 'rgba(12, 186, 41, 0.404)'
          progressColor = '#0CBA28'
        } else if (profileData.rank_data.level === 19) {
          background = 'rgba(12, 186, 41, 0.404)'
          progressColor = '#0CBA28'
        } else if (profileData.rank_data.level === 20) {
          background = 'rgba(79, 91, 142, 0.363)'
          progressColor = '#4f5b8e'
        } else if (profileData.rank_data.level === 21) {
          background = 'rgba(79, 91, 142, 0.363)'
          progressColor = '#4f5b8e'
        } else if (profileData.rank_data.level === 22) {
          background = 'rgba(79, 91, 142, 0.363)'
          progressColor = '#4f5b8e'
        } else if (profileData.rank_data.level === 23) {
          background = 'rgba(79, 91, 142, 0.363)'
          progressColor = '#4f5b8e'
        } else if (profileData.rank_data.level === 24) {
          background = 'rgba(79, 91, 142, 0.363)'
          progressColor = '#4f5b8e'
        } else if (profileData.rank_data.level === 25) {
          background = 'rgba(79, 91, 142, 0.363)'
          progressColor = '#4f5b8e'
        } else if (profileData.rank_data.level === 26) {
          background = 'rgba(79, 91, 142, 0.363)'
          progressColor = '#4f5b8e'
        } else if (profileData.rank_data.level === 27) {
          background = 'rgba(79, 91, 142, 0.363)'
          progressColor = '#4f5b8e'
        } else if (profileData.rank_data.level === 28) {
          background = 'rgba(79, 91, 142, 0.363)'
          progressColor = '#4f5b8e'
        } else if (profileData.rank_data.level === 29) {
          background = 'rgba(79, 91, 142, 0.363)'
          progressColor = '#4f5b8e'
        } else if (profileData.rank_data.level === 30) {
          background = 'rgba(79, 91, 142, 0.363)'
          progressColor = '#4f5b8e'
        }

  return (
    <>
    <ProfilePage>
    <ProfileHeader image={profileData.profile_data.header_image}>
    <AvatarSection>
        <AvatarImage src={profileData.general_data.avatar_image} />
        <UsernameWrapper>
          <AccountText>
            {nameDisplay}
          </AccountText>
          <MiscText>
          Joined {formatJoinedDate(profileData.joined_at)}
          </MiscText>

        </UsernameWrapper>
      </AvatarSection>



      <RightSection>
        <FollowText>
          {followers}
          <Text onClick={handleFollow}>Follow</Text> 
        </FollowText>
        <FollowText>
          {following}
          <Text onClick={handleUnfollow}>Unfollow</Text>
        </FollowText>
      </RightSection>
      
    </ProfileHeader>
    <HeaderBar>
      Some shit
    </HeaderBar>
    {/* <HeaderBar>

          <Ranking level={profileData.rank_data.level} rankProgress={profileData.rank_data.rank_progress} />
      {profileData.rank_data.rank_progress}
    </HeaderBar> */}
    <ProfileContainer>
      <LeftColumn>
      <LeftPart address={profileData.address} />
      </LeftColumn>
      <WallColumn>
        <MessageWall address={profileData.address} />
      </WallColumn>
      <RightColumn>
      <RightPart address={profileData.address} />
      </RightColumn>
    </ProfileContainer>
    </ProfilePage>
    </>
  )
}

export default Profile
