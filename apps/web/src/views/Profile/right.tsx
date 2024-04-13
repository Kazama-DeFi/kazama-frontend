import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useSignMessage } from 'wagmi'
import { useWeb3React } from '@kazamaswap/wagmi'
import { Text, PollIcon, PhotoIcon, VideoIcon, HeartLikeIcon, HeartLikeFilledIcon, CommentsIcon } from '@kazamaswap/uikit';

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

const RightPart: React.FC<{ address: string }> = ({ address }) => {

  return (
    <WallContainer>
        right
  </WallContainer>
);
};

export default RightPart;