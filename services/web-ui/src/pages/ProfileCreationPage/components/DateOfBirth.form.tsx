import React, { useState } from "react";

import { Box, Button, Typography } from "@mui/material";
import dayjs from "dayjs";

import { Center } from "src/components/ui/Center";
import { DatePicker } from "src/components/ui/DatePicker";
import { VerticalCenter } from "src/components/ui/VerticalCenter";
import { useTranslation } from "src/core/i18n";

const MIN_AGE = 14;

const checkifDateIsBefore = (date: Date, years: number): boolean => {
  const currentDate = dayjs();
  const inputDate = dayjs(date);
  const diffInYears = currentDate.diff(inputDate, "year");
  return diffInYears >= years;
};

export interface DateOfBirthFormProps {
  onChange: (value: Date) => void;
  onNext: () => void;
  value: Date;
}

export function DateOfBirthForm({
  onChange,
  onNext,
  value,
}: DateOfBirthFormProps): React.ReactElement {
  const { t } = useTranslation("profile-creation");
  const [isTouched, setIsTouched] = useState(false);

  const dateIsValid = checkifDateIsBefore(value, MIN_AGE);

  return (
    <VerticalCenter>
      <Center>
        <Typography color="primary" variant="h5" sx={{ paddingBottom: 2 }}>
          {t("date-of-birth.header")}
        </Typography>
      </Center>

      <Typography sx={{ paddingBottom: 2 }}>
        {t("date-of-birth.description")}
      </Typography>

      <DatePicker
        fullWidth
        label={t("date-of-birth.label")}
        onChange={(event) => {
          onChange(event || new Date());
          setIsTouched(true);
        }}
        sx={{ paddingBottom: 1 }}
        value={value}
      />

      <Box sx={{ paddingBottom: 1 }}>
        {isTouched && !dateIsValid && (
          <Typography color="error" gutterBottom>
            {t("date-of-birth.min-age", { minAge: MIN_AGE })}
          </Typography>
        )}
      </Box>

      <Center>
        <Button
          disabled={!value || !dateIsValid}
          onClick={onNext}
          variant="contained"
        >
          {t("date-of-birth.continue")}
        </Button>
      </Center>
    </VerticalCenter>
  );
}
