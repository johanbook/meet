import { ReactElement } from "react";

import { Button, Typography } from "src/components/ui";
import { Center } from "src/components/ui/Center";
import { VerticalCenter } from "src/components/ui/VerticalCenter";
import { useTranslation } from "src/core/i18n";

export interface WelcomeFormProps {
  onNext: () => void;
}

export function WelcomeForm({ onNext }: WelcomeFormProps): ReactElement {
  const { t } = useTranslation("profile-creation");

  return (
    <VerticalCenter>
      <Center>
        <Typography color="primary" variant="h5" sx={{ paddingBottom: 2 }}>
          {t("welcome.header")}
        </Typography>
      </Center>

      <Typography sx={{ paddingBottom: 2 }}>
        {t("welcome.description")}
      </Typography>

      <Center>
        <Button onClick={onNext} variant="contained">
          {t("welcome.continue")}
        </Button>
      </Center>
    </VerticalCenter>
  );
}
