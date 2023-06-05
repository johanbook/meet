import React from "react";

import { Step, StepLabel, Stepper } from "@mui/material";

import { CreateProfileCommand } from "src/api";
import { Center } from "src/components/ui/Center";

import { ProfileCreationPageNav } from "./ProfileCreationPage.nav";
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
            <StepLabel>Description</StepLabel>
          </Step>
        </Stepper>
      </Center>

      {step === 0 && (
        <NameForm
          onChange={(name) => setForm({ ...form, name })}
          onNext={() => setStep(1)}
          value={form.name}
        />
      )}

      {step === 1 && (
        <DescriptionForm
          onChange={(description) => setForm({ ...form, description })}
          onNext={() => onCreateProfile()}
          value={form.description}
        />
      )}
    </ProfileCreationPageNav>
  );
}
