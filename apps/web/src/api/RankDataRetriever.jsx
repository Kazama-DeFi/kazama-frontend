import React, { createContext, useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import truncateHash from '@kazamaswap/utils/truncateHash';
import axios from 'axios';
import { useWeb3React } from '@kazamaswap/wagmi';
import { Text, Image, PaperStackIcon } from '@kazamaswap/uikit';
import { toast } from 'kazama-defi-react-toasts';
import 'kazama-defi-react-toasts/dist/KazamaToasts.css';
import { Zoom } from 'kazama-defi-react-toasts';
import { NextLinkFromReactRouter } from 'components/NextLink'
import { useUserData } from 'api/DataRetriever'

// Create a new context with initial state as defaultValue
const RankDataContext = createContext({
  imagePath: `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/unranked.png`,
  background: "rgba(79, 91, 142, 0.363)",
  progressColor: "#4f5b8e",
  rankWidth: "0xp",
  rankHeight: "0px",
  rank_data: {
    rank: "Unranked",
    level: 0,
    xp: 0,
    rank_progress: 0
  }
});

// Custom hook to access the rain data context
export const useRankStylingData = () => useContext(RankDataContext);

const KazamaToastHeader = styled.div`
color: #a6a7aa;
font-size: 15px;
font-weight: bold;
margin-bottom: 3px;
margin-left: 8px;
`

// Provider component that wraps your AccountDataRetriever component
export const RankDataProvider = ({ children }) => {
  const account = useWeb3React();
  const rankData = useUserData();

  // Styling storage
  const [styling] = useState({
    imagePath: `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/unranked.png`,
    background: "rgba(79, 91, 142, 0.363)",
    progressColor: "#4f5b8e",
    rankWidth: "0xp",
    rankHeight: "0px"
  })

  // Styling
  const fetchStyles = () => {
    let newStyling = { ...styling };
    if (rankData.rank_data.level === 0) {
      newStyling = {
        ...newStyling,
      imagePath: `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/unranked.png`,
      background: 'rgba(79, 91, 142, 0.363)',
      progressColor: '#4f5b8e',
      rankWidth: 18
      }
    } else if (rankData.rank_data.level === 1) {
      newStyling = {
        ...newStyling,
      imagePath: `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_1.png`,
      background: 'rgba(79, 91, 142, 0.363)',
      progressColor: '#4f5b8e',
      rankWidth: 20
      }
    } else if (rankData.rank_data.level === 2) {
      newStyling = {
        ...newStyling,
      imagePath: `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_2.png`,
      background: 'rgba(79, 91, 142, 0.363)',
      progressColor: '#4f5b8e',
      rankWidth: 28
      }
    } else if (rankData.rank_data.level === 3) {
      newStyling = {
        ...newStyling,
      imagePath: `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_3.png`,
      background: 'rgba(79, 91, 142, 0.363)',
      progressColor: '#4f5b8e',
      rankWidth: 28
      }
    } else if (rankData.rank_data.level === 4) {
      newStyling = {
        ...newStyling,
      imagePath: `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_4.png`,
      background: 'rgba(79, 91, 142, 0.363)',
      progressColor: '#4f5b8e',
      rankWidth: 28
      }
    } else if (rankData.rank_data.level === 5) {
      newStyling = {
        ...newStyling,
      imagePath: `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_5.png`,
      background: 'rgba(79, 91, 142, 0.363)',
      progressColor: '#4f5b8e',
      rankWidth: 28
      }
    } else if (rankData.rank_data.level === 6) {
      newStyling = {
        ...newStyling,
      imagePath: `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_6.png`,
      background: 'rgba(244, 147, 43, 0.445)',
      progressColor: '#F4932B',
      rankWidth: 20
      }
    } else if (rankData.rank_data.level === 7) {
      newStyling = {
        ...newStyling,
      imagePath: `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_7.png`,
      background: 'rgba(244, 147, 43, 0.445)',
      progressColor: '#F4932B',
      rankWidth: 28
      }
    } else if (rankData.rank_data.level === 8) {
      newStyling = {
        ...newStyling,
      imagePath: `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_8.png`,
      background: 'rgba(244, 147, 43, 0.445)',
      progressColor: '#F4932B',
      rankWidth: 28
      }
    } else if (rankData.rank_data.level === 9) {
      newStyling = {
        ...newStyling,
      imagePath: `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_9.png`,
      background: 'rgba(244, 147, 43, 0.445)',
      progressColor: '#F4932B',
      rankWidth: 28
      }
    } else if (rankData.rank_data.level === 10) {
      newStyling = {
        ...newStyling,
      imagePath: `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_10.png`,
      background: 'rgba(244, 147, 43, 0.445)',
      progressColor: '#F4932B',
      rankWidth: 24
      }
    } else if (rankData.rank_data.level === 11) {
      newStyling = {
        ...newStyling,
      imagePath: `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_11.png`,
      background: 'rgba(12, 186, 41, 0.404)',
      progressColor: '#0CBA28',
      rankWidth: 24
      }
    } else if (rankData.rank_data.level === 12) {
      newStyling = {
        ...newStyling,
      imagePath: `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_12.png`,
      background: 'rgba(12, 186, 41, 0.404)',
      progressColor: '#0CBA28',
      rankWidth: 24
      }
    } else if (rankData.rank_data.level === 13) {
      newStyling = {
        ...newStyling,
      imagePath: `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_13.png`,
      background: 'rgba(54, 155, 255, 0.432)',
      progressColor: '#369CFF',
      rankWidth: 22,
      rankHeight: 15
      }
    } else if (rankData.rank_data.level === 14) {
      newStyling = {
        ...newStyling,
      imagePath: `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_14.png`,
      background: 'rgba(54, 155, 255, 0.432)',
      progressColor: '#369CFF',
      rankWidth: 22,
      rankHeight: 15
      }
    } else if (rankData.rank_data.level === 15) {
      newStyling = {
        ...newStyling,
      imagePath: `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_15.png`,
      background: 'rgba(12, 186, 41, 0.404)',
      progressColor: '#0CBA28',
      rankWidth: 22,
      rankHeight: 15
      }
    } else if (rankData.rank_data.level === 16) {
      newStyling = {
        ...newStyling,
      imagePath: `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_16.png`,
      background: 'rgba(12, 186, 41, 0.404)',
      progressColor: '#0CBA28',
      rankWidth: 22,
      rankHeight: 15
      }
    } else if (rankData.rank_data.level === 17) {
      newStyling = {
        ...newStyling,
      imagePath: `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_17.png`,
      background: 'rgba(12, 186, 41, 0.404)',
      progressColor: '#0CBA28',
      rankWidth: 22,
      rankHeight: 15
      }
    } else if (rankData.rank_data.level === 18) {
      newStyling = {
        ...newStyling,
      imagePath: `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_18.png`,
      background: 'rgba(12, 186, 41, 0.404)',
      progressColor: '#0CBA28',
      rankWidth: 22,
      rankHeight: 15
      }
    } else if (rankData.rank_data.level === 19) {
      newStyling = {
        ...newStyling,
      imagePath: `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_19.png`,
      background: 'rgba(12, 186, 41, 0.404)',
      progressColor: '#0CBA28',
      rankWidth: 22,
      rankHeight: 15
      }
    } else if (rankData.rank_data.level === 20) {
      newStyling = {
        ...newStyling,
      imagePath: `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/unranked.png`,
      background: 'rgba(79, 91, 142, 0.363)',
      progressColor: '#4f5b8e'
      }
    } else if (rankData.rank_data.level === 21) {
      newStyling = {
        ...newStyling,
      imagePath: `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/unranked.png`,
      background: 'rgba(79, 91, 142, 0.363)',
      progressColor: '#4f5b8e',
      }
    } else if (rankData.rank_data.level === 22) {
      newStyling = {
        ...newStyling,
      imagePath: `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/unranked.png`,
      background: 'rgba(79, 91, 142, 0.363)',
      progressColor: '#4f5b8e'
      }
    } else if (rankData.rank_data.level === 23) {
      newStyling = {
        ...newStyling,
      imagePath: `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/unranked.png`,
      background: 'rgba(79, 91, 142, 0.363)',
      progressColor: '#4f5b8e'
      }
    } else if (rankData.rank_data.level === 24) {
      newStyling = {
        ...newStyling,
      imagePath: `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/unranked.png`,
      background: 'rgba(79, 91, 142, 0.363)',
      progressColor: '#4f5b8e'
      }
    } else if (rankData.rank_data.level === 25) {
      newStyling = {
        ...newStyling,
      imagePath: `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/unranked.png`,
      background: 'rgba(79, 91, 142, 0.363)',
      progressColor: '#4f5b8e'
      }
    } else if (rankData.rank_data.level === 26) {
      newStyling = {
        ...newStyling,
      imagePath: `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/unranked.png`,
      background: 'rgba(79, 91, 142, 0.363)',
      progressColor: '#4f5b8e'
      }
    } else if (rankData.rank_data.level === 27) {
      newStyling = {
        ...newStyling,
      imagePath: `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/unranked.png`,
      background: 'rgba(79, 91, 142, 0.363)',
      progressColor: '#4f5b8e'
      }
    } else if (rankData.rank_data.level === 28) {
      newStyling = {
        ...newStyling,
      imagePath: `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/unranked.png`,
      background: 'rgba(79, 91, 142, 0.363)',
      progressColor: '#4f5b8e'
      }
    } else if (rankData.rank_data.level === 29) {
      newStyling = {
        ...newStyling,
      imagePath: `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/unranked.png`,
      background: 'rgba(79, 91, 142, 0.363)',
      progressColor: '#4f5b8e'
      }
    } else if (rankData.rank_data.level === 30) {
      newStyling = {
        ...newStyling,
      imagePath: `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/unranked.png`,
      background: 'rgba(79, 91, 142, 0.363)',
      progressColor: '#4f5b8e'
      }
    }
  }

  // Execute retrieving
  useEffect(() => {
    if (account) {
      fetchStyles();
    }
  }, [account, rankData]);

  return (
    <RankDataContext.Provider value={styling}>
      {children}
    </RankDataContext.Provider>
  );
};