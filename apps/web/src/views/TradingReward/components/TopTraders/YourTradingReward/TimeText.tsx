import { Text } from '@kazamaswap/uikit'

const TimeText = ({ text }: { text: string }) => {
  return (
    <Text bold color="white" fontSize={['14px', '14px', '14px', '20px']} as="span" ml="4px">
      {text}
    </Text>
  )
}
export default TimeText
