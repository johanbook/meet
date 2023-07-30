import React from "react";

import { Fade, Step, StepLabel, Stepper } from "@mui/material";

import { CreateProfileCommand } from "src/api";
import { Center } from "src/components/ui/Center";

import { ProfileCreationPageNav } from "./ProfileCreationPage.nav";
import { DateOfBirthForm } from "./components/DateOfBirth.form";
import { DescriptionForm } from "./components/Description.form";
import { NameForm } from "./components/Name.form";

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
  const [step, setStep] = React.useState(0);

  return (
    <ProfileCreationPageNav>
      <Center>
        <Stepper activeStep={step} sx={{ marginBottom: 3 }}>
          <Step>
            <StepLabel>Name</StepLabel>
          </Step>

          <Step>
            <StepLabel>Date of birth</StepLabel>
          </Step>

          <Step>
            <StepLabel>Description</StepLabel>
          </Step>
        </Stepper>
      </Center>

      <Fade in={step === 2} mountOnEnter timeout={2000} unmountOnExit>
        <div>
          <DescriptionForm
            onChange={(description) => setForm({ ...form, description })}
            onNext={() => onCreateProfile()}
            value={form.description}
          />
        </div>
      </Fade>

      <Fade in={step === 1} mountOnEnter timeout={2000} unmountOnExit>
        <div>
          <DateOfBirthForm
            onChange={(dateOfBirth) => setForm({ ...form, dateOfBirth })}
            onNext={() => setStep(2)}
            value={form.dateOfBirth}
          />
        </div>
      </Fade>

      <Fade in={step === 0} timeout={2000} unmountOnExit>
        <div>
          <NameForm
            onChange={(name) => setForm({ ...form, name })}
            onNext={() => setStep(1)}
            value={form.name}
          />
        </div>
      </Fade>
    </ProfileCreationPageNav>
  );
}
