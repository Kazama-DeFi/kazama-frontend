import { useTranslation } from "@kazamaswap/localization";
import { Text } from "@kazamaswap/uikit";
import { ActionContent, ActionTitles, StyledActionContainer } from "./styles";

const AccountNotConnect = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation();

  return (
    <StyledActionContainer>
      <ActionTitles>
        <Text bold textTransform="uppercase" color="textSubtle" fontSize="12px">
          {t("Start Farming")}
        </Text>
      </ActionTitles>
      <ActionContent>{children}</ActionContent>
    </StyledActionContainer>
  );
};

export default AccountNotConnect;
