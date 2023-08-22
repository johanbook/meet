import React from "react";

import { Fade, Step, StepLabel, Stepper } from "@mui/material";

import { CreateProfileCommand } from "src/api";
import { Center } from "src/components/ui/Center";
import { useTranslation } from "src/core/i18n";

import { ProfileCreationPageNav } from "./ProfileCreationPage.nav";
import { DateOfBirthForm } from "./components/DateOfBirth.form";
import { DescriptionForm } from "./components/Description.form";
import { NameForm } from "./components/Name.form";
import { WelcomeForm } from "./components/Welcome.form";

export interface ProfileCreationPageComponentProps {
  form: CreateProfileCommand;
  onCreateProfile: () => Promise<void>;
  setForm: (value: CreateProfileCommand) => void;
}

export function ProfileCreationPageComponent({
  form,
  onCreateProfile,
  setForm,
}: ProfileCreationPageComponentProps): React.ReactElement {
  const { t } = useTranslation("profile-creation");

  const [step, setStep] = React.useState(0);

  return (
    <ProfileCreationPageNav>
      <Center>
        <Stepper activeStep={step} sx={{ marginBottom: 3 }}>
          <Step>
            <StepLabel>{t("steps.welcome")}</StepLabel>
          </Step>

          <Step>
            <StepLabel>{t("steps.name")}</StepLabel>
          </Step>

          <Step>
            <StepLabel>{t("steps.date-of-birth")}</StepLabel>
          </Step>

          <Step>
            <StepLabel>{t("steps.description")}</StepLabel>
          </Step>
        </Stepper>
      </Center>

      <Fade in={step === 3} mountOnEnter timeout={2000} unmountOnExit>
        <div>
          <DescriptionForm
            onChange={(description) => setForm({ ...form, description })}
            onNext={() => onCreateProfile()}
            value={form.description}
          />
        </div>
      </Fade>

      <Fade in={step === 2} mountOnEnter timeout={2000} unmountOnExit>
        <div>
          <DateOfBirthForm
            onChange={(dateOfBirth) => setForm({ ...form, dateOfBirth })}
            onNext={() => setStep(3)}
            value={form.dateOfBirth}
          />
        </div>
      </Fade>

      <Fade in={step === 1} timeout={2000} unmountOnExit>
        <div>
          <NameForm
            onChange={(name) => setForm({ ...form, name })}
            onNext={() => setStep(2)}
            value={form.name}
          />
        </div>
      </Fade>

      <Fade in={step === 0} timeout={2000} unmountOnExit>
        <div>
          <WelcomeForm onNext={() => setStep(1)} />
        </div>
      </Fade>
    </ProfileCreationPageNav>
  );
}
