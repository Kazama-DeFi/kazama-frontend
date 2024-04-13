import { useTranslation } from "@kazamaswap/localization";
import { Text } from "@kazamaswap/uikit";

export function NoLiquidity() {
  const { t } = useTranslation();

  return (
    <Text color="textSubtle" textAlign="center">
      {t("No liquidity found.")}
    </Text>
  );
}
