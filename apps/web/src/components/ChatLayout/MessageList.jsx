/* eslint-disable */
import { useState, useEffect, useRef } from 'react'
import { 
  Flex, 
  Text, 
  TipUserIcon, 
  useModal,
  HeartLikeIcon,
  HeartLikeFilledIcon,
  ExpandDotsIcon,
  ReplyIcon,
  CoinStackIcon,
  useToast 
} from '@kazamaswap/uikit'
import styled from 'styled-components'
import truncateHash from '@kazamaswap/utils/truncateHash'
import { NextLinkFromReactRouter } from 'components/NextLink'
import { PieChart, Pie} from "recharts";
import { useWeb3React } from '@kazamaswap/wagmi'
import Linkify from "linkify-react";
import "linkify-plugin-mention";
import "linkify-plugin-hashtag";
import TipUser from 'views/Profile/components/Tipping';
import OptionsModal from './components/OptionsModal';
import { useUserData } from 'api/DataRetriever';
import { useRainData } from 'api/RainDataRetriever'
import { useSocket } from 'api/SocketManager'
import RankingStyle from './styling/Ranks'
import RainBox from './components/Rain/RainBox'

const TipIcon = styled(TipUserIcon)`
fill: #a6a7aa !important;
:hover {
  fill: rgba(255, 255, 255, 0.884) !important;
}
`

const AvatarWrapper = styled.div`
width: 46px;
height: 46px;
background-position: center;
background-repeat: no-repeat;
margin-left: -48px;
margin-top: 2px;
padding: 3px;
overflow: hidden;
`

const RankIconWrapper = styled.div`
background: #262a31;
border: 2px solid #1d2126;
border-radius: 50%;
width: 25px;
height: 25px;
margin-top: -15px;
text-align: center;
z-index: 100;
margin-left: 3px;
`

const OnlineDotBox = styled.div`
height: 13px;
width: 13px;
background: rgba(0, 224, 86, .3);
border-radius: 50%;
margin-right: 3px;
display: inline-block;
position: relative;
z-index: 100;
margin-bottom: -16px;
`

const OnlineDot = styled.div`
height: 5px;
width: 5px;
background: #10D960;
border-radius: 50%;
/* margin-right: 12px; */
margin-left: 4px;
display: inline-block;
/* border: 2px solid #11141e; */
position: relative;
z-index: 100;
/* margin-top: -10px; */
box-shadow: 0 0 0 0 rgba(16, 217, 96, 0.486);
margin-bottom: 0.25rem;
`

const OfflineDot = styled.div`
height: 13px;
width: 13px;
background: #ED4B9E;
border-radius: 50%;
margin-right: 3px;
display: inline-block;
border: 2px solid #11141e;
position: relative;
z-index: 100;
margin-bottom: -16px;
box-shadow: 0 0 0 0 rgba(255, 88, 88, 0.604);
`

const ChatLink = styled(NextLinkFromReactRouter)`
color: #fff;
font-size: 14px;
font-family: Flama Bold;
&:hover {
  text-decoration: underline;
}
`

const ChatDiv = styled.div`
@media screen and (max-width: 60px) {
  display: none !important;
`

const AccountDiv = styled.div`
-webkit-box-align: center;
    align-items: center;
    cursor: pointer;
    column-gap: 6.00858px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: inline-flex;
    vertical-align: middle;
    margin-right: 5px;
    max-width: 100%;
`

const MessageContent = styled.div`
  margin-top: 7px;
  margin-left: 5px;
  margin-right: 7px;
  padding-left: 10px;
  background: #262a31;
  border-radius: 0.25rem;
  width: 100%;
  max-width: 269px;


  .message-header {
    display: block;
    align-items: center;
    padding: 10px 1px;
  }
  .message-content {
    display: flex;
    padding-bottom: 5px;
    padding-right: 5px;
    width: 100%;
    .smaller-text {
      font-size: 11px;
      font-weight: 400;
      padding-top: 4px;
      color: #a6a7aa;
    }
    .normal-text {
      color: #a6a7aa;
      word-wrap: break-word;
      overflow-wrap: break-word;
      overflow: hidden;
      font-size: .9rem;
      font-family: Flama;
      line-height: 16px;
    }
  }

  .spacenaut-badge {
    border-radius: 4px;
    padding: 0 8px;
    border: 2px solid transparent;
    height: 16px;
    background: #534CD1;
    box-shadow: none;
    color: #fff;
    margin-left: 8px;
    font-size: 11px;
    letter-spacing: 1px;
  }
}
`

const StyledDotsIcon = styled(ExpandDotsIcon)`
fill: #a6a7aa;
width: 17px;

&:hover {
  fill: #fff;
  cursor: pointer;
}
`

const StyledReplyIcon = styled(ReplyIcon)`
fill: #a6a7aa;
width: 17px;

&:hover {
  fill: #fff;
  cursor: pointer;
}
`

const StyledCoinStack = styled(CoinStackIcon)`
fill: #a6a7aa;
width: 17px;

&:hover {
  fill: #fff;
  cursor: pointer;
}
`

const LikeMsgBox = styled.div`
display: flex;
border-radius: 3px;
background: #1a1e23;
border: 2px solid #21252b;
padding: 5px;
`

const LikeIcon = styled(HeartLikeIcon)`
fill: rgb(255, 73, 73) !important;

&:hover {
  box-shadow: 0 0 10px rgba(14, 147, 229, 0.596);
}
`

const LikedIcon = styled(HeartLikeFilledIcon)`
fill: rgb(255, 73, 73) !important;

&:hover {
  box-shadow: 0 0 10px rgba(14, 147, 229, 0.596);
}
`

const MessageList = ({ scrollRef, messages }) => {

  // Set constants
  const { toastError, toastSuccess } = useToast()
  const { account } = useWeb3React()
  const [connectedUser, setConnectedUser] =  useState('')
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [receiverUsername, setReceiverUsername] = useState(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [dismiss, setDismiss] = useState(false);
  const userData = useUserData();
  const rainData = useRainData()
  const socket = useSocket()
  const [tipModal] = useModal(
    receiverUsername ? <TipUser receiverUsername={receiverUsername} socket={socket} /> : null
 );

  // link render component
  const renderLink = ({ attributes, content }) => {
    const { href, ...props } = attributes;
    return <ChatLink to={href} {...props}>{content}</ChatLink>;
  };

  // Render options
  const urlRenderOptions = {
    render: {
      url: renderLink,
      mention: renderLink,
      hashtag: renderLink,
    },
  };

  useEffect(() => {
    if (userData && userData.general_data) {
      setConnectedUser(userData.general_data.username);
    }
  }, [account]);

// Msg received socket
useEffect(() => {
  if (socket && socket.current) {
    socket.current.on("msg-recieved", (msg) => {
      setArrivalMessage({
        fromSelf: false,
        message: msg.message,
        sender: msg.sender,
        likes: msg.likes.count,
        updatedAt: msg.updatedAt
      });
    });
  }
}, [socket]);

  // Define Toasts
  const newRegisteredToast = () => {
    toast.success('New user registered', {
      position: "top-right",
      zIndex: "1000",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Slide
    });
  };

  // Message date
  const timeFormat = (time) => {
    let result = time
    if (time < 10) {
      result = '0' + time
    }
    return result
  }

  // Handle tips
  const handleTipClick = (username) => {
    setReceiverUsername(username);
  };

  // Handle dropdown
  const handleOptions = (username) => {
    setReceiverUsername(username);
  };

  // Handle receiving username
  useEffect(() => {
    if (receiverUsername) {
       tipModal();
      // Toggle the dismiss state
      setDismiss(prevDismiss => !prevDismiss);
    }
  }, [receiverUsername]);

  useEffect(() => {
    setReceiverUsername(null)
  }, [dismiss])

  // Set default level bg
  let levelBackground = "#282f48";

  const RainBox = () => {
    if (rainData.rain_active) {
      return (
        <Text>Rain active</Text>
      )
    }
    return (
      <Text>No Rain active</Text>
    )
  }
  
  // Return list
  return (
    <>
    <div style={{background: "black"}}>
      {RainBox()}
    </div>
    <div className="chat-messages" onContentSizeChange={() => this.scrollView.scrollToEnd({ animated: true })}>

        {messages.map((message) => {
          const sender = message.sender
          const likes = message.likes
          const isOnline = sender?.online_status.is_online
          const rankStyle = RankingStyle(sender?.rank_data.level);

          const RankProgress = [
            { name: "Progress", value: sender?.rank_data.rank_progress },
            { name: "Completed", value: 23, fill: rankStyle.background }
          ]

          // Chat message return
          const ReturnMessage = () => {

            // Check for @everyone tag
            if (message.message.includes('@Everyone')) {
              // Check if sender is admin or mod
              if (sender?.role === "admin" || sender?.role === "mod") {
                return (
                  <div className="message-content" style={{ background: "#2c3551", marginLeft: "-10px", marginBottom: "5px", paddingLeft: "10px", paddingTop: "8px", paddingBottom: "8px" }}>
                    <p className="normal-text">
                      {message.message}
                    </p>
                  </div>
                )
                // If not admin or mod, return message
              } else {
                return null
              }
            }

            // Check for tagged user
            if (message.message.includes(`@${connectedUser}`)) {
              return (
                <div className="message-content" style={{ background: "red !important", marginLeft: "-10px", marginBottom: "5px", paddingLeft: "10px", paddingTop: "8px", paddingBottom: "8px" }}>
                  <p className="normal-text">
                    <Linkify options={urlRenderOptions}>
                      {message.message}
                    </Linkify>
                  </p>
                </div>
              )
            }

            // Check for GIF
            if (message.message.startsWith('http') && message.message.endsWith('.gif')) {
              return (
                <div className="message-content gif-preview" style={{ overflow: "hidden" }}>
                  <img style={{ borderRadius: "3px", width: "100%", overflow: "hidden" }} src={message.message} />
                </div>
              )
            }

            // Normal message
            return (
              <div className="message-content">
                {message.message.endsWith('.gif') && message.message.startsWith('https://') ? (
                  <p className="normal-text">{message.message}</p>
                ) : (
                  <p className="normal-text">
                    <Linkify options={urlRenderOptions}>
                      {message.message}
                    </Linkify>
                  </p>
                )}
              </div>
            )
          }

          return (
            <ChatDiv key={message.id} ref={scrollRef}>
              <Flex flexDirection="row">
                <Flex ml="7px" mr="5px" mt="9px" alignItems="center">
                  <Flex flexDirection="column">
                    {isOnline ? (
                      <OnlineDotBox>
                        <OnlineDot />
                      </OnlineDotBox>
                    ) : (
                      <OfflineDot />
                    )}
                    <Flex>
                      <PieChart width={49} height={49}>
                        <Pie
                          dataKey="value"
                          data={RankProgress}
                          cx={19}
                          stroke="transparent"
                          startAngle={-55} // Adjusted start angle to start from bottom
                          endAngle={310} // Adjusted end angle to complete the circle
                          cy={20}
                          innerRadius={21}
                          outerRadius={24}
                          fill={rankStyle.progressColor} />
                       </PieChart>

                      <AvatarWrapper>
                        <img style={{ borderRadius: '50%', padding: '1px' }} src={sender?.general_data.avatar_image} />
                      </AvatarWrapper>

                    </Flex>
                    <Flex justifyContent="center" alignItems="center">
                      <RankIconWrapper style={{ backgroundColor: levelBackground }}>
                        <Text fontSize="0.71rem" fontFamily="Industry-Black" marginTop="0.093rem" marginLeft="0.08rem">{sender?.rank_data.level}</Text>
                      </RankIconWrapper>

                    </Flex>
                  </Flex>
                </Flex>

                <Flex width="100%">
                  <MessageContent>
                    <div className="message-header">
                      <Flex flexDirection="row">
                        <AccountDiv>
                          <Flex style={{ overflow: 'visible' }}>
                            <img src={rankStyle.imagePath} width={rankStyle.rankWidth} />
                          </Flex>
                          <Flex>
                            <div>
                              <NextLinkFromReactRouter to={`/${sender.general_data.username}`}>
                                <p style={{ marginBottom: '2px', fontSize: '15px', color: '#fff', fontFamily: 'Industry-Black' }}>
                                  {sender?.general_data.username.length > 20 ? truncateHash(sender?.general_data.username) : sender?.general_data.username}
                                </p>
                              </NextLinkFromReactRouter>
                            </div>
                          </Flex>
                          <Flex>
                            {/* Badge rendering logic */}
                            {/* {sender?.kazama_holder_ranks.spacenaut && (<> <p className="spacenaut-badge">👨‍🚀 SPACENAUT</p> </> )} */}
                          </Flex>
                        </AccountDiv>
                        <Flex ml="auto" mr="5px" pb="5px">
                          <StyledCoinStack onClick={() => handleTipClick(sender?.general_data.username)} />
                          <StyledDotsIcon ml="5px" onClick={() => handleOptions(sender?.general_data.username)} />
                        </Flex>
                      </Flex>
                    </div>
                    <div className="message-content">
                      {ReturnMessage()}
                    </div>
                    {/* <LikeMsgBox>
                  <div>
                  <LikeIcon width={14} /> <LikedIcon width={14} />
                  </div>
                  <div>
                  <p className="normal-text">{likes}</p>
                  </div>
                </LikeMsgBox> */}
                  </MessageContent>
                </Flex>
              </Flex>
            </ChatDiv>
          )
        })}
      </div></>
  )  
}

export default MessageList