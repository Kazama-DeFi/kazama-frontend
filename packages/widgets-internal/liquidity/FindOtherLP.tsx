import Link from "next/link";
import { useTranslation } from "@kazamaswap/localization";
import { Text, Button, AtomBox } from "@kazamaswap/uikit";

export function FindOtherLP({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();

  return (
    <AtomBox display="flex" flexDirection="column" alignItems="center" mt="24px">
      <Text color="textSubtle" mb="8px">
        {t("Don't see a pair you joined?")}
      </Text>
      <Link href="/find" passHref>
        <Button id="import-pool-link" variant="secondary" scale="sm">
          {t("Find other LP tokens")}
        </Button>
      </Link>
      {children}
    </AtomBox>
  );
}
