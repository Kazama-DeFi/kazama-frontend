import { styled } from 'styled-components'

interface WallAvatarProps {
  src: string
  borderColor?: string
  alt?: string
}

const WallAvatar = styled.div.attrs<WallAvatarProps>(({ alt }) => ({
  alt,
}))<WallAvatarProps>`
  background: url('${({ src }) => src}');
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 50%;
  position: relative;
  width: 48px;
  height: 48px;

  & > img {
    border-radius: 50%;
  }
`

export default WallAvatar
