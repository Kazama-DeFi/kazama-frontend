import React, { useState } from 'react';
import BigNumber from 'bignumber.js';
import {
  HOLDER,
  SHRIMP,
  CRAB,
  FISH,
  TURTLE,
  DOLPHIN,
  ORCA,
  SHARK,
  WHALE,
  KRAKEN,
  SPACENAUT
} from './config/KazamaRank/Constants';

// Interface
interface AccountProps {
  kazamaBalance: BigNumber;
}

// Return type of the component
interface RankResult {
  userRank: string;
  rankData: Record<string, boolean>;
}

// Get kazama balance
export const FetchKazamaRank = ({ kazamaBalance }: AccountProps): RankResult => {
  const ranks = [
    { rank: 'Spacenaut', threshold: SPACENAUT },
    { rank: 'Kraken', threshold: KRAKEN },
    { rank: 'Whale', threshold: WHALE },
    { rank: 'Shark', threshold: SHARK },
    { rank: 'Orca', threshold: ORCA },
    { rank: 'Dolphin', threshold: DOLPHIN },
    { rank: 'Turtle', threshold: TURTLE },
    { rank: 'Fish', threshold: FISH },
    { rank: 'Crab', threshold: CRAB },
    { rank: 'Shrimp', threshold: SHRIMP },
    { rank: 'Holder', threshold: HOLDER },
  ];

  const rankData: Record<string, boolean> = {};

  let userRank = 'Non Holder'; // Default value

  ranks.forEach(({ rank, threshold }) => {
    if (userRank === 'Non Holder' && kazamaBalance.isGreaterThanOrEqualTo(threshold)) {
      userRank = rank;
      rankData[rank.toLowerCase()] = true;
    } else {
      rankData[rank.toLowerCase()] = false;
    }
  });

  // Return user rank and rank data
  return { userRank, rankData };
};