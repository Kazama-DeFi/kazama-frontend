import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useModal, Button, Flex, EmojiIcon, GifIcon } from '@kazamaswap/uikit';
import EmojiPicker from 'emoji-picker-react';
import GifPicker, { TenorImage } from 'gif-picker-react';
import useActiveWeb3React from 'hooks/useActiveWeb3React';

import SetChatName from 'views/ChatUsername/setChatName';
import SetProfileAvatar from '../../views/ChatAvatar/setAvatar';
import ConnectToChat from 'components/ConnectToChat';
import Blocklist from 'views/Profile/components/Blocklist';
import Taglist from './Taglist';

const EmojiPickerIcon = styled(EmojiIcon)`
  fill: #a6a7aa !important;
  :hover {
    cursor: pointer;
    fill: rgba(255, 255, 255, 0.884) !important;
  }
`;

const SendButton = styled(Button)<{ isInputActive: boolean }>`
  box-shadow: 
  rgb(238 26 121 / 40%) 0px 0px 15px, 
  rgb(255 255 255 / 20%) 0px 1px 0px inset, 
  rgb(0 0 0 / 15%) 0px -3px 0px inset,
  rgb(238 26 121) 0px 0px 12px inset;
  height: 40px;
  border-radius: 7px;
  background: rgb(238, 26, 120);
  font-family: 'Rajdhani', sans-serif;
  color: #fff;
  font-size: 15px;
  max-height: 30px;
  margin-left: 10px;
  display: ${({ isInputActive }) => (isInputActive ? "flex" : "none")};
`;

const ChatControls = styled.div`
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  position: relative;
  z-index: 10;
  width: 100%;
  margin-top: 0.75rem;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
`

const GifPickerIcon = styled(GifIcon)`
  fill: #a6a7aa !important;
  :hover {
    cursor: pointer;
    fill: rgba(255, 255, 255, 0.884) !important;
  }
`;

const Container = styled.div<{ isInputActive: boolean }>`
padding: 8px;
background-color: #1a1e23;
box-shadow: 0 -8px 45px #111923;
border-top: 1px solid rgba(0, 0, 0, 0.35);
z-index: 5;
width: ${({ isInputActive }) => (isInputActive ? `100%` : "auto")};
transition: width 22s;

.input-container {
  display: flex;
  align-items: center;
  
  input {
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
    height: auto;
    color: #fff;
    font-family: "Flama";
    font-size: 15px;
  }

  .icons-container {
    flex-grow: 1;
    display: flex;
    justify-content: flex-end;
    border-radius: 0px 0.25rem 0.25rem 0px;
    padding-right: 10px;
    background-color: #21252b;
    min-height: 40px;

    svg {
      width: 20px;
      height: 20px;
      margin-left: 10px;
    }
  }
 }
}
`

export default function MessageInput({ handleSendMsg }): JSX.Element {
  const { account } = useActiveWeb3React();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showGifPicker, setShowGifPicker] = useState(false);
  const [isInputActive, setInputActive] = useState(false);
  const [atSymbol, setAtSymbol] = useState(false);
  const [selectedUsername, setSelectedUsername] = useState('');
  const [taglistInput, setTaglistInput] = useState('');
  const [isTaglistOpen, setIsTaglistOpen] = useState(false);
  const [msg, setMsg] = useState('');
  const inputRef = useRef(null);
  const TENOR_API_KEY = 'AIzaSyCdRm-UH7PVl6V0NnQwz1b-TmIjw9I6vpI';

  const toggleInputActive = () => {
    setInputActive(true)
  };

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleGifPicker = () => {
    setShowGifPicker(!showGifPicker);
  };

  const handleEmojiClick = (e, emoji) => {
    let message = msg;
    message += e.emoji;
    setMsg(message);
  };

  const handleGifClick = (e) => {
    handleSendMsg(e.url);
    setShowGifPicker(!showGifPicker);
  };

  useEffect(() => {
    // Function to close the dropdown when a click occurs outside of it
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setInputActive(false);
      }
    };

    // Attach the event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Function to handle "@" symbol detection
  const handleInputChange = (e) => {
    const text = e.target.value;
    setMsg(text);
    if (text.endsWith('@')) {
      setAtSymbol(true);
    } else {
      setAtSymbol(false);
      // Extract text after "@" symbol and set it to taglistInput
      const atIndex = text.lastIndexOf('@');
      if (atIndex !== -1) {
        setTaglistInput(text.slice(atIndex + 1));
      } else {
        setTaglistInput('');
      }
    }
  };

  // Function to handle username selection from the taglist
  const handleUsernameSelection = (username) => {
    setSelectedUsername(username);
    setMsg(msg + `${username} `); // Append the selected username to the message
    setInputActive(true); // Keep the input active
  };

  const sendChat = (e) => {
    e.preventDefault();
    if (showEmojiPicker) setShowEmojiPicker(!showEmojiPicker);
    if (showGifPicker) setShowGifPicker(!showGifPicker);
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg('');
    }
  };

  const ShowInput = () => {
    if (!account) {
      return <ConnectToChat width="100%" />;
    }

    return (
      <Container isInputActive={isInputActive}>
      {showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiClick} width="100%" height={400} />}
      {showGifPicker && <GifPicker onGifClick={handleGifClick} tenorApiKey={TENOR_API_KEY} width="100%" height={400} />}
      <form className="input-container" ref={inputRef} onSubmit={(e) => sendChat(e)}>
        <input
          onClick={toggleInputActive}
          type="text"
          color="#ffffff"
          placeholder="Say something .."
          value={msg}
          onChange={handleInputChange}
        />
        <div className="icons-container">
          <Flex flexDirection="row">
            <Flex mr="5px">
              <EmojiPickerIcon width={20} onClick={handleEmojiPickerHideShow} />
            </Flex>
            <Flex mt="3px">
              <GifPickerIcon width={26} onClick={handleGifPicker} />
            </Flex>
          </Flex>
        </div>
        <SendButton type="submit" scale="sm" isInputActive={isInputActive}>Send</SendButton>
      </form>
      <ChatControls>
        <Flex>
         {/* <Blocklist /> */}
        </Flex>
        <Flex>
          2
        </Flex>
        <Flex>
          3
        </Flex>
        <Flex>
          4
        </Flex>
      </ChatControls>
    </Container>
    
  );
}

  return (
    <div>
      {atSymbol && <Taglist selectedUsername={selectedUsername} handleUsernameSelection={handleUsernameSelection} taglistInput={taglistInput} />}
      {ShowInput()}
    </div>
  );
}

