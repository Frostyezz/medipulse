import { Stepper, Title } from "@mantine/core";
import React from "react";
import { useTranslation } from "react-i18next";

const RegisterStepper: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Stepper
      active={0}
      onStepClick={() => null}
      breakpoint="md"
      allowNextStepsSelect={false}
    >
      {[1, 2, 3].map((idx) => (
        <Stepper.Step
          key={idx}
          label={t(`register.step.label.${idx}`)}
          description={t(`register.step.description.${idx}`)}
        >
          <Title mt={12} color="dark.4" order={2}>
            {t(`register.step.title.${idx}`)}
          </Title>
        </Stepper.Step>
      ))}
      <Stepper.Completed>
        <Title mt={12} color="dark.4" order={2}>
          {t("register.step.title.completed")}
        </Title>
      </Stepper.Completed>
    </Stepper>
  );
};

export default RegisterStepper;
