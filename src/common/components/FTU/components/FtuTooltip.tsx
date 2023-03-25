import React from "react";
import { TooltipRenderProps } from "react-joyride";
import { Paper, Title, Flex, Button, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";
import useGetFtuSteps from "../hooks/useGetFtuSteps";

const FtuTooltip: React.FC<TooltipRenderProps> = ({
  continuous,
  index,
  step,
  backProps,
  primaryProps,
  tooltipProps,
}) => {
  const { t } = useTranslation();
  const steps = useGetFtuSteps();

  return (
    <Paper
      p={12}
      sx={{ width: "300px", textAlign: "center" }}
      {...tooltipProps}
    >
      {step.title && <Title order={4}>{step.title}</Title>}
      <Flex mt={8} justify="center">
        <Text ta="center" c="dimmed" fz="sm">
          {step.content}
        </Text>
      </Flex>
      <Flex justify="flex-end" mt={16} gap={12}>
        {index > 1 && (
          <Button variant="default" {...backProps}>
            {t("ftu.back")}
          </Button>
        )}
        {continuous && (
          <Button {...primaryProps}>
            {t(index === steps.length - 1 ? "ftu.finish" : "ftu.next")}
          </Button>
        )}
      </Flex>
    </Paper>
  );
};

export default FtuTooltip;
