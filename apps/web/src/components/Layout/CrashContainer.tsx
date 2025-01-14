import { Box, BoxProps } from '@kazamaswap/uikit';

const CrashContainer: React.FC<React.PropsWithChildren<BoxProps>> = ({ children, ...props }) => (
  <Box px={['16px', '24px']} mx="auto" maxWidth="1325px" {...props}>
    {children}
  </Box>
)

export default CrashContainer
