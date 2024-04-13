import { ReactNode } from 'react'
import { Flex, Box, FlexProps, Image } from '@kazamaswap/uikit'
import StyledBannerImageWrapper from './BannerImage'

interface BannerHeaderProps extends FlexProps {
  bannerImage: string
  bannerAlt?: string
  avatar?: ReactNode
}

const BannerHeader: React.FC<React.PropsWithChildren<BannerHeaderProps>> = ({
  bannerImage,
  bannerAlt,
  avatar,
  children,
  ...props
}) => {
  return (
    <Flex flexDirection="column" mb="24px" {...props}>
      <Box position="relative" pb="56px">
        <StyledBannerImageWrapper>
          <Image src={bannerImage} alt={bannerAlt} width={100} height={100}/>
        </StyledBannerImageWrapper>
        <Box position="absolute" bottom={0} left={-4}>
          <Flex alignItems="flex-end">
            {avatar}
            {children}
          </Flex>
        </Box>
      </Box>
    </Flex>
  )
}

export default BannerHeader
