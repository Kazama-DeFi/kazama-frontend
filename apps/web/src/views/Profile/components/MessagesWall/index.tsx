import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useSignMessage } from 'wagmi'
import { useWeb3React } from '@kazamaswap/wagmi'
import { Text, PollIcon, PhotoIcon, VideoIcon, HeartLikeIcon, HeartLikeFilledIcon, CommentsIcon, PinIcon } from '@kazamaswap/uikit';
import { getAvatar, getMessageWall, likeMessage, postWall } from 'utils/apiRoutes';
import WallAvatar from '../Banner/WallAvatar';
import PostAvatar from '../Banner/PostAvatar';

const WallContainer = styled.div`
padding: 20px 0px 5px 0px;
display: flex;
flex-direction: column;  // Display messages in a column
align-items: center;
justify-content: center;
width: 100%
`

const CreateContainer = styled.div`
  background: #1a1e23;
  border: 1px solid rgba(0, 0, 0, 0.35);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;

const OptionsBox = styled.div`
  background: #1a1e23;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 5px;
  width: 100%;
  padding: 10px;
`;

const InputContainer = styled.div`
  background: #21252b;
  padding: 10px 10px 10px 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  width: 100%;
`;

const Input = styled.input`
flex-grow: 2;
    -webkit-box-align: center;
    align-items: center;
    min-height: 40px;
    width: 100%;
    padding: 6px 5px 6px 15px;
    border-radius: 0.25rem 0px 0px 0.25rem;
    border: 1px solid transparent;
    background: #21252b;
    transition: background 0.1s ease 0s;
    position: relative;
    min-height: 50px;
    height: auto;
    color: #fff;
    font-size: 15px;
    flex: 1;
}
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #2a2f43;
  color: #ffffff;
  border: none;
  cursor: pointer;
`;

const MessageBox = styled.div`
background: #1a1e23;
margin-bottom: 5px;
padding: 10px 15px 10px 15px;
display: block;
width: 100%;
border-radius: 5px;
border: 1px solid rgba(0, 0, 0, 0.35);
`

const MessageContent = styled.div`
  margin-bottom: 10px;
`;

const MessageMeta = styled.div`
  font-size: 12px;
  color: gray;
`;

const WarningText = styled(Text)`
color: #ED4B9E;
font-weight: 200;
`

const PollImage = styled(PollIcon)`
fill: #2b344f;
cursor: pointer;
transition: fill 0.3s;
&:hover {
    fill: #fff;
  }
`

const LikeImage = styled(HeartLikeIcon)`
fill: #2b344f;
cursor: pointer;
transition: fill 0.3s;
`

const LikeFilledImage = styled(HeartLikeFilledIcon)`
fill: #d7443e;
cursor: pointer;
transition: fill 0.3s;
`

const PhotoImage = styled(PhotoIcon)`
fill: #2b344f;
cursor: pointer;
transition: fill 0.3s;
&:hover {
    fill: #fff;
  }
`

const CommentsImage = styled(CommentsIcon)`
fill: #2b344f;
cursor: pointer;
transition: fill 0.3s;
&:hover {
    fill: #fff;
  }
`

const VideoImage = styled(VideoIcon)`
fill: #2b344f;
cursor: pointer;
transition: fill 0.3s;
&:hover {
    fill: #fff;
  }
`

const IconBox = styled.div`
margin-right: 15px;
`

interface Message {
    _id: string;
    message: string;
    date: Date;
    likes: number;
    pinned: boolean;
    reactions: {
      type: string; // Assuming reactions have a type. You can adjust accordingly
      count: number;
    }[];
    poll?: {
      main_question: string;
      options: { text: string; votes: number }[];
    };
  }

interface MessageData {
  messages: Message[];
}

const MessageWall: React.FC<{ address: string }> = ({ address }) => {
    // Const for updating live wall
    const [updated, setUpdated] = useState(0)

    // Remain
    const { signMessageAsync } = useSignMessage();
    const { account } = useWeb3React(); // Removed isConnected as it was unused
    const [owner, setOwner] = useState(false);
    const [avatar, setAvatar] = useState('')
    const [messageWall, setMessageWall] = useState<MessageData | null>(null);
    const [newMessageText, setNewMessageText] = useState<string>('');
    const [isCreatingPoll, setIsCreatingPoll] = useState(false);
    const [pollQuestion, setPollQuestion] = useState("");
    const [pollOptions, setPollOptions] = useState(Array(10).fill(""));
    const [loading, setLoading] = useState<boolean>(true);
    const [characterCount, setCharacterCount] = useState(0);
    const [replyingToMessageId, setReplyingToMessageId] = useState<string | null>(null);
    const [replyText, setReplyText] = useState<string>('');

  // Fetch wall data
  useEffect(() => {
    const fetchWallData = async () => {
      try {
        const response = await axios.get(`${getMessageWall}/${address}`);
        
        // Separate pinned and unpinned messages
        const pinnedMessages = response.data.messages.filter(message => message.pinned);
        const unpinnedMessages = response.data.messages.filter(message => !message.pinned);

        // Sort unpinned messages by date in descending order
        const sortedUnpinnedMessages = unpinnedMessages.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        // Combine pinned and sorted unpinned messages
        const combinedMessages = [...pinnedMessages, ...sortedUnpinnedMessages];

        setMessageWall({ ...response.data, messages: combinedMessages });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setLoading(false);
      }
    };

    fetchWallData();
  }, [address, account, updated]);

  // Fetch avatar
  useEffect(() => {
    const fetchAvatar = async() => {
        await axios.get(`${getAvatar}/${account}`).then((response) => {
            setAvatar(response.data.general_data.avatar_image)
        })
    }

    fetchAvatar()
  }, [account])

  // Handle post message
  const postMessage = async (messageText: string, pollData: { main_question: string; options: any[] } | null = null) => {
    try {
      if (characterCount > 2000) {
        return null
      }
      const signature = await signMessageAsync({ message: account });
      const requestBody = {
        address: account,
        messageContent: messageText,
        signature: signature,
        pollData: pollData  // Directly include pollData here
      };

      const response = await axios.post(`${postWall}`, requestBody);
      console.log('Post Message Response:', response.data);
    } catch (error) {
      console.error('Error Posting Message:', error);
    }
  };

  // Check if wall belongs to owner
  useEffect(() => {
    if (account === address) {
      setOwner(true);
    } else {
      setOwner(false);
    }
  }, [address, account]);

  // Handle poll creation
  const createPoll = () => {
    setIsCreatingPoll(true);
  };

  const cancelPoll = () => {
    setIsCreatingPoll(false);
    setPollQuestion("");
    setPollOptions(Array(10).fill(""));
  };

  // Submit message
  const submitMessage = () => {
    if (isCreatingPoll) {
      const pollData = {
        main_question: pollQuestion,
        options: pollOptions.map((optionText) => ({ text: optionText, votes: 0 })).filter(option => option.text.trim() !== "")
      };
      postMessage(newMessageText, pollData);
      setIsCreatingPoll(false);
    } else {
      postMessage(newMessageText);
      setUpdated(prevUpdated => prevUpdated + 1);
    }
  };

  // Handle likes
  const likeMessageId = async(messageId: string) => {
    try {
      const signature = await signMessageAsync({ message: account });
      const requestBody = {
        address: account,
        messageId: messageId,
        signature: signature,
      };
      console.log('Request Body:', requestBody);
      const response = await axios.post(`${likeMessage}`, requestBody);
      console.log('Like messageId response:', response.data);
    } catch (error) {
      console.error('Error liking messageId:', error);
    }
  }

  // Handle character count
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setNewMessageText(text); // Update your message text state
    setCharacterCount(text.length); // Update character count
  };

  // Handle replies
  const handleReply = (messageId: string) => {
    setReplyingToMessageId(messageId);
  };

  // Handle new message
  const newMessage = () => {
    return (
      <CreateContainer>
        <InputContainer>
        <WallAvatar src={avatar}/>
        <Input 
          type="text" 
          placeholder="Enter your message here" 
          value={newMessageText} 
          onChange={handleInputChange}
        />
        </InputContainer>

      <div>
        {characterCount > 2000  ? (
            <WarningText>
                {characterCount} / 2000
            </WarningText>
        ) : (
            <Text>
                {characterCount} / 2000
            </Text>
        )}
      </div>
        {isCreatingPoll ? (
          <>
            <Input 
              type="text" 
              placeholder="Enter poll question" 
              value={pollQuestion} 
              onChange={(e) => setPollQuestion(e.target.value)} 
            />
            {pollOptions.map((option, index) => (
              <Input 
                key={index}
                type="text" 
                placeholder={`Option ${index + 1}`} 
                value={option} 
                onChange={(e) => {
                  const updatedOptions = [...pollOptions];
                  updatedOptions[index] = e.target.value;
                  setPollOptions(updatedOptions);
                }} 
              />
            ))}
            <Button onClick={submitMessage}>
              Post Message with Poll
            </Button>
            <Button onClick={cancelPoll}>
              Cancel
            </Button>
          </>
        ) : (
          <Button onClick={() => postMessage(newMessageText)}>
            Post Message
          </Button>
        )}
        <OptionsBox>

            <IconBox>
            <PollImage onClick={createPoll} width={20} />
            </IconBox>
            <IconBox>
            <PhotoImage width={20} />
            </IconBox>
            <IconBox>
            <VideoImage width={20} />
            </IconBox>

            <div style={{marginLeft: "auto"}}>
            <Button onClick={() => postMessage(newMessageText)}>
            Post Message
          </Button>
            </div>
        </OptionsBox>
      </CreateContainer>
    );
  };

  // Format time
  const formatTime = (date: Date): string => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const amOrPm = hours >= 12 ? 'PM' : 'AM';
  
    hours = hours % 12;
    hours = hours ? hours : 12; // 12-hour clock, so 0 should be 12
  
    minutes = minutes < 10 ? '0' + minutes : minutes; // Add leading zero for minutes
  
    return `${hours}:${minutes} ${amOrPm}`;
  };

  if (loading) {
    return <div>Loading profile data...</div>;
  }

  const renderPoll = (poll: any) => {
    return (
      <div>
        <p>{poll.main_question}</p>
        {poll.options.map((option: any, index: number) => (
          <div key={index}>
            <input type="radio" name={`poll-${index}`} disabled />
            {option.text} ({option.votes} votes)
          </div>
        ))}
      </div>
    );
  };

  return (
    <WallContainer>
      {owner ? (
        <div style={{ width: '100%', marginBottom: '5px' }}>{newMessage()}</div>
      ) : null}
      {messageWall?.messages.length ? (
        messageWall.messages.map((message, index) => {
          const messageDate = new Date(message.date);
          const currentDate = new Date();
          const timeDifference = currentDate.getTime() - messageDate.getTime();
          const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

          let displayDate = '';
          if (messageDate.toDateString() === currentDate.toDateString()) {
            displayDate = 'Today';
          } else if (daysDifference === 1) {
            displayDate = 'Yesterday';
          } else if (daysDifference < 7) {
            displayDate = `${daysDifference} days ago`;
          } else {
            displayDate = messageDate.toLocaleDateString();
          }

          return (
            <MessageBox key={index}>
              {owner ? (
                <PinIcon />
              ) : (
                null
              )}
              {/* ... (your existing code) */}
              <p>{message.message}</p>
              {message.poll ? renderPoll(message.poll) : null}
              {/* ... (your existing code) */}
            </MessageBox>
          );
        })
      ) : (
        <div>No messages on timeline</div>
      )}
    </WallContainer>
  );
};

export default MessageWall;