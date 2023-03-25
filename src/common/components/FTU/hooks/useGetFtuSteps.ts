import { useMemo } from "react";
import { useAppSelector } from "@/services/redux/hooks";
import { Step } from "react-joyride";
import { ROLES } from "@/services/graphql/types/enums";
import { useTranslation } from "react-i18next";

const useGetFtuSteps = () => {
  const { role } = useAppSelector((store) => store.user) ?? {};
  const { t } = useTranslation();

  const steps = useMemo<Record<ROLES, Step[]>>(
    () => ({
      [ROLES.MEDIC]: [
        {
          target: ".start",
          title: t("ftu.nurse.step.1.title"),
          content: t("ftu.nurse.step.1.content"),
          disableBeacon: true,
        },
        {
          target: ".step0",
          title: t("ftu.nurse.step.1.title"),
          content: t("ftu.nurse.step.1.content"),
        },
        {
          target: ".step1",
          title: t("ftu.medic.step.2.title"),
          content: t("ftu.medic.step.2.content"),
        },
        {
          target: ".step2",
          title: t("ftu.nurse.step.2.title"),
          content: t("ftu.nurse.step.2.content"),
        },
        {
          target: ".step3",
          title: t("ftu.nurse.step.3.title"),
          content: t("ftu.nurse.step.3.content"),
        },
        {
          target: ".step4",
          title: t("ftu.nurse.step.4.title"),
          content: t("ftu.nurse.step.4.content"),
        },
        {
          target: ".step5",
          title: t("ftu.nurse.step.5.title"),
          content: t("ftu.nurse.step.5.content"),
        },
      ],
      [ROLES.NURSE]: [
        {
          target: ".start",
          title: t("ftu.nurse.step.1.title"),
          content: t("ftu.nurse.step.1.content"),
          disableBeacon: true,
        },
        {
          target: ".step0",
          title: t("ftu.nurse.step.1.title"),
          content: t("ftu.nurse.step.1.content"),
        },
        {
          target: ".step1",
          title: t("ftu.nurse.step.2.title"),
          content: t("ftu.nurse.step.2.content"),
        },
        {
          target: ".step2",
          title: t("ftu.nurse.step.3.title"),
          content: t("ftu.nurse.step.3.content"),
        },
        {
          target: ".step3",
          title: t("ftu.nurse.step.4.title"),
          content: t("ftu.nurse.step.4.content"),
        },
        {
          target: ".step4",
          title: t("ftu.nurse.step.5.title"),
          content: t("ftu.nurse.step.5.content"),
        },
      ],
      [ROLES.PATIENT]: [
        {
          target: ".start",
          title: t("ftu.nurse.step.1.title"),
          content: t("ftu.nurse.step.1.content"),
          disableBeacon: true,
        },
        {
          target: ".step0",
          title: t("ftu.nurse.step.1.title"),
          content: t("ftu.nurse.step.1.content"),
        },
        {
          target: ".step1",
          title: t("ftu.medic.step.2.title"),
          content: t("ftu.medic.step.2.content"),
        },
        {
          target: ".step2",
          title: t("ftu.patient.step.3.title"),
          content: t("ftu.patient.step.3.content"),
        },
        {
          target: ".step3",
          title: t("ftu.patient.step.4.title"),
          content: t("ftu.patient.step.4.content"),
        },
        {
          target: ".step4",
          title: t("ftu.nurse.step.5.title"),
          content: t("ftu.nurse.step.5.content"),
        },
      ],
    }),
    [t]
  );

  return steps[role ?? ROLES.MEDIC];
};

export default useGetFtuSteps;
