import { styled } from "styled-components";
import { kazamaDarkColors } from "../../theme/colors";
import { Box, Flex } from "../Box";
import SocialLinks from "./Components/SocialLinks";
import { kazamaBaseColors } from "../..";

export const StyledFooter = styled(Flex)`
  background: #262a30;
  border-top: 1px solid rgba(0, 0, 0, 0.35);
`;

export const StyledList = styled.ul`
  list-style: none;
  margin-bottom: 40px;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-bottom: 0px;
  }
`;

export const StyledListItem = styled.li`
  font-size: 15px;
  margin-bottom: 8px;
  text-transform: capitalize;

  &:first-child {
    color: ${kazamaDarkColors.secondary};
    font-weight: 600;
    text-transform: uppercase;
  }
`;

export const StyledIconMobileContainer = styled(Box)`
  margin-bottom: 24px;
`;

export const StyledToolsContainer = styled(Flex)`
  border-color: ${kazamaDarkColors.cardBorder};
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-style: solid;
  padding: 24px 0;
  margin-bottom: 24px;

  ${({ theme }) => theme.mediaQueries.sm} {
    border-top-width: 0;
    border-bottom-width: 0;
    padding: 0 0;
    margin-bottom: 0;
  }
`;

export const StyledSocialLinks = styled(SocialLinks)`
  border-bottom: 1px solid ${kazamaDarkColors.cardBorder};
`;

export const StyledText = styled.span`
  color: ${kazamaDarkColors.text};
`;
