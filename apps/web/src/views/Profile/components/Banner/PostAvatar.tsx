import { styled } from 'styled-components'

interface PostAvatarProps {
  src: string
  borderColor?: string
  alt?: string
}

const PostAvatar = styled.div.attrs<PostAvatarProps>(({ alt }) => ({
  alt,
}))<PostAvatarProps>`
  background: url('${({ src }) => src}');
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 50%;
  position: relative;
  width: 32px;
  height: 32px;

  & > img {
    border-radius: 50%;
  }
`

export default PostAvatar
