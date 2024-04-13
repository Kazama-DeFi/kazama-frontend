import {
    FIXED_STAKING_SUPPORTED_CHAINS, LIQUID_STAKING_SUPPORTED_CHAINS, SUPPORT_BUY_CRYPTO,
    SUPPORT_FARMS, SUPPORT_ONLY_BSC
} from 'config/constants/supportChains';
import { getPerpetualUrl } from 'utils/getPerpetualUrl';
import { nftsBaseUrl } from 'views/Nft/market/constants';

import { ContextApi } from '@kazamaswap/localization';
import { SUPPORTED_CHAIN_IDS as POOL_SUPPORTED_CHAINS } from '@kazamaswap/pools';
import {
    DropdownMenuItemType, EarnFillIcon, EarnIcon, MenuItemsType, MoreIcon,
    NftFillIcon, NftIcon, PancakeProtectorIcon, SwapFillIcon, SwapIcon
} from '@kazamaswap/uikit';

import { DropdownMenuItems } from '@kazamaswap/uikit/src/components/DropdownMenu/types';

export type ConfigMenuDropDownItemsType = DropdownMenuItems & { hideSubNav?: boolean }
export type ConfigMenuItemsType = Omit<MenuItemsType, 'items'> & { hideSubNav?: boolean; image?: string } & {
  items?: ConfigMenuDropDownItemsType[]
}

const addMenuItemSupported = (item, chainId) => {
  if (!chainId || !item.supportChainIds) {
    return item
  }
  if (item.supportChainIds?.includes(chainId)) {
    return item
  }
  return {
    ...item,
    disabled: true,
  }
}

const config: (
  t: ContextApi['t'],
  isDark: boolean,
  languageCode?: string,
  chainId?: number,
) => ConfigMenuItemsType[] = (t, isDark, languageCode, chainId) =>
  [
    {
      label: t('Exchange'),
      icon: PancakeProtectorIcon,
      fillIcon: SwapFillIcon,
      href: '/swap',
      showItemsOnMobile: false,
      initialOpenState: true,
      items: [
        {
          label: t('Swap'),
          href: '/swap',
          itemIcon: PancakeProtectorIcon,
        },
        {
          label: t('Cross Chain'),
          href: '/liquidity',
          itemIcon: PancakeProtectorIcon,
        },
        {
          label: t('Xchange Bot'),
          href: 'https://bridge.pancakeswap.finance/',
          itemIcon: PancakeProtectorIcon,
          type: DropdownMenuItemType.EXTERNAL_LINK,
        },
      ].map((item) => addMenuItemSupported(item, chainId)),
    },
    {
      label: 'Launchpads',
      href: '/info',
      icon: PancakeProtectorIcon,
      hideSubNav: true,
      initialOpenState: true,
      items: [
        {
          label: t('Launchpads List'),
          href: '/launchpads',
          itemIcon: PancakeProtectorIcon,
          supportChainIds: SUPPORT_ONLY_BSC,
          image: '/images/ifos/ifo-bunny.png',
        },
        {
          label: t('Create Launchpad'),
          href: '/create/launchpad',
          itemIcon: PancakeProtectorIcon,
        },
        {
          label: t('Create Fair launch'),
          href: '/create/fairlaunch',
          itemIcon: PancakeProtectorIcon,
          supportChainIds: SUPPORT_ONLY_BSC,
          image: '/images/ifos/ifo-bunny.png',
        },
        {
          label: t('Dutch Auction'),
          href: '/create/dutchauction',
          itemIcon: PancakeProtectorIcon,
          supportChainIds: SUPPORT_ONLY_BSC,
          image: '/images/ifos/ifo-bunny.png',
        },
        {
          label: t('Leaderboards'),
          href: '/leaderboard',
          itemIcon: PancakeProtectorIcon,
          supportChainIds: SUPPORT_ONLY_BSC,
          image: '/images/ifos/ifo-bunny.png',
        },
      ].map((item) => addMenuItemSupported(item, chainId)),
    },
    {
      label: t('Earning'),
      href: '/farms',
      icon: PancakeProtectorIcon,
      fillIcon: EarnFillIcon,
      image: '/images/decorations/pe2.png',
      supportChainIds: SUPPORT_FARMS,
      initialOpenState: false,
      items: [
        {
          label: t('Liquidity Farms'),
          href: '/farms',
          itemIcon: PancakeProtectorIcon,
          supportChainIds: SUPPORT_FARMS,
        },
        {
          label: t('Staking Pools'),
          href: '/pools',
          itemIcon: PancakeProtectorIcon,
          supportChainIds: POOL_SUPPORTED_CHAINS,
        },
        {
          label: t('Simple Staking'),
          href: '/simple-staking',
          itemIcon: PancakeProtectorIcon,
          supportChainIds: FIXED_STAKING_SUPPORTED_CHAINS,
        },
      ].map((item) => addMenuItemSupported(item, chainId)),
    },
    {
      label: t('Win Kazama'),
      icon: PancakeProtectorIcon,
      hideSubNav: true,
      href: 'https://protectors.pancakeswap.finance',
      initialOpenState: true,
      items: [
        {
          label: t('Crash Game'),
          href: '/crash',
          itemIcon: PancakeProtectorIcon,
          image: '/images/decorations/prediction.png',
        },
        {
          label: t('Multiplayer Poker'),
          href: '/poker',
          itemIcon: PancakeProtectorIcon,
          image: '/images/decorations/lottery.png',
        },
        {
          label: t('Horse Racing'),
          href: '/horse-racing',
          itemIcon: PancakeProtectorIcon,
          image: '/images/decorations/lottery.png',
        },
        {
          label: t('Gang Wars'),
          href: '/wars',
          itemIcon: PancakeProtectorIcon,
          image: '/images/decorations/lottery.png',
        },
        {
          label: t('Roulette'),
          href: '/roulette',
          itemIcon: PancakeProtectorIcon,
          image: '/images/decorations/lottery.png',
        },
        {
          label: t('Original Dice'),
          href: '/lottery',
          itemIcon: PancakeProtectorIcon,
          image: '/images/decorations/lottery.png',
        },
        {
          label: t('Daily Lottery'),
          href: '/pottery',
          itemIcon: PancakeProtectorIcon,
          image: '/images/decorations/lottery.png',
        },
      ],
    },
    {
      label: t('NFT Market'),
      href: `${nftsBaseUrl}`,
      icon: PancakeProtectorIcon,
      fillIcon: NftFillIcon,
      supportChainIds: SUPPORT_ONLY_BSC,
      image: '/images/decorations/nft.png',
      items: [
        {
          label: t('Overview'),
          href: `${nftsBaseUrl}`,
          itemIcon: PancakeProtectorIcon,
        },
        {
          label: t('Collections'),
          href: `${nftsBaseUrl}/collections`,
          itemIcon: PancakeProtectorIcon,
        },
        {
          label: t('Activity'),
          href: `${nftsBaseUrl}/activity`,
          itemIcon: PancakeProtectorIcon,
        },
      ],
    },
  ].map((item) => addMenuItemSupported(item, chainId))

export default config
