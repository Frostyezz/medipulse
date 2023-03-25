import React, { useCallback, useEffect } from "react";
import { Button, Flex, Select, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Appointment } from "@/services/graphql/schemas/appointment.schema";
import { useTranslation } from "react-i18next";
import {
  APPOINTMENT_IMPORTANCE,
  APPOINTMENT_STATUS,
} from "@/services/graphql/types/enums";
import DropzoneButton from "../../DropzoneButton/DropzoneButton";
import useUpdateAppointment from "@/common/hooks/useUpdateAppointment";
import { modals } from "@mantine/modals";
import useDeleteAppointment from "@/common/hooks/useDeleteAppointment";

const AppointmentEditBody: React.FC<Partial<Appointment>> = (appointment) => {
  const { t } = useTranslation();

  const updateAppointment = useUpdateAppointment();
  const deleteAppointment = useDeleteAppointment();

  const form = useForm<Partial<Appointment> & { id?: string }>({
    initialValues: {
      id: appointment._id,
      title: appointment.title,
      files: appointment.files,
      importance: appointment.importance,
      notes: appointment.notes,
      status: APPOINTMENT_STATUS.ACCEPTED,
    },
    validateInputOnBlur: true,
    validate: {
      title: (value) =>
        value ? undefined : t("appointments.details.title.required"),
    },
  });

  const onSubmit = useCallback(async () => {
    await updateAppointment({
      variables: {
        input: {
          ...form.values,
          files: form.values.files?.[0] ? form.values.files : [""],
        },
      },
    });
    modals.closeAll();
  }, [form.values]);

  return (
    <Flex direction="column" gap={12} sx={{ width: "100%" }}>
      <TextInput
        label={t("appointments.details.title")}
        placeholder={t("appointments.details.title") as string}
        withAsterisk
        {...form.getInputProps("title")}
      />
      <Select
        label={t("appointments.details.importance") as string}
        placeholder={t("appointments.details.importance") as string}
        data={[
          {
            value: APPOINTMENT_IMPORTANCE.LOW,
            label: t("appointment.importance.LOW") as string,
          },
          {
            value: APPOINTMENT_IMPORTANCE.NORMAL,
            label: t("appointment.importance.NORMAL") as string,
          },
          {
            value: APPOINTMENT_IMPORTANCE.URGENT,
            label: t("appointment.importance.URGENT") as string,
          },
        ]}
        withAsterisk
        {...form.getInputProps("importance")}
      />
      <Textarea
        label={t("appointments.details.notes")}
        placeholder={t("appointments.details.notes") as string}
        autosize
        minRows={2}
        maxRows={6}
        {...form.getInputProps("notes")}
      />
      <DropzoneButton
        {...form.getInputProps("files")}
        onUpload={(value: string) => form.setFieldValue("files", [value])}
        title={t("appointments.details.files.title")}
        subtitle={t("appointments.details.files.subtitle")}
      />
      <Flex mt={12} sx={{ marginLeft: "auto" }} gap={8}>
        {appointment.status === APPOINTMENT_STATUS.PENDING ? (
          <>
            <Button
              onClick={async () => {
                await deleteAppointment({
                  variables: { input: { _id: appointment._id } },
                });
                modals.closeAll();
              }}
              color="red"
            >
              {t("appointments.edit.reject")}
            </Button>
            <Button onClick={() => onSubmit()}>
              {t("appointments.edit.approve")}
            </Button>
          </>
        ) : (
          <>
            <Button onClick={() => modals.closeAll()} variant="default">
              {t("appointments.modal.add.cancel")}
            </Button>
            <Button onClick={() => onSubmit()}>
              {t("appointments.edit.submit")}
            </Button>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default AppointmentEditBody;
