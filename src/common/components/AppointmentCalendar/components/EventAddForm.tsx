import React, { useEffect, useMemo, useState } from "react";
import { EventAddArg } from "@fullcalendar/core";
import { useTranslation } from "react-i18next";
import { Flex, TextInput, Select, Autocomplete } from "@mantine/core";
import { useAppSelector } from "@/services/redux/hooks";
import {
  APPOINTMENT_IMPORTANCE,
  APPOINTMENT_STATUS,
  ROLES,
} from "@/services/graphql/types/enums";
import SelectPatientItem from "./SelectPatientItem";

const EventAddForm: React.FC<EventAddArg> = ({ event }) => {
  const [rerender, setRerender] = useState(0);
  const [autocomplete, setAutocomplete] = useState("");
  const { t } = useTranslation();
  const { contextId, medicId, role } = useAppSelector((store) => store.profile);
  const { patients } = useAppSelector((store) => store.patients);

  const isMedic = useMemo(() => role === ROLES.MEDIC, [role]);

  useEffect(() => {
    event.setExtendedProp("start", event.startStr);
    event.setExtendedProp("end", event.endStr);
    event.setExtendedProp("title", t("appointments.details.title.default"));
    event.setExtendedProp("medicId", isMedic ? contextId : medicId);
    event.setExtendedProp("patientId", isMedic ? "" : contextId);
    event.setExtendedProp("importance", APPOINTMENT_IMPORTANCE.NORMAL);
    event.setExtendedProp(
      "status",
      isMedic ? APPOINTMENT_STATUS.ACCEPTED : APPOINTMENT_STATUS.PENDING
    );
  }, [isMedic, contextId, medicId]);

  return (
    <Flex direction="column" gap={12}>
      <TextInput
        placeholder={t("appointments.details.title") as string}
        label={t("appointments.details.title")}
        withAsterisk
        value={event?.extendedProps?.title}
        onChange={(e) => {
          event.setExtendedProp("title", e.target.value);
          setRerender(rerender + 1);
        }}
      />
      <Select
        label={t("appointments.details.importance") as string}
        placeholder={t("appointments.details.importance") as string}
        value={event?.extendedProps?.importance}
        onChange={(value) => {
          event.setExtendedProp("importance", value);
          setRerender(rerender + 1);
        }}
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
      />
      {isMedic && (
        <Autocomplete
          maxDropdownHeight={200}
          label={t("roles.PATIENT")}
          placeholder={t("roles.PATIENT") as string}
          itemComponent={SelectPatientItem}
          data={patients.map((patient) => ({
            ...patient,
            value: [patient.firstName, patient.lastName].join(" "),
          }))}
          filter={(value, item) =>
            item.value.toLowerCase().includes(value.toLowerCase().trim())
          }
          value={autocomplete}
          onChange={(value) => {
            const found = patients.find(
              ({ firstName, lastName }) =>
                [firstName, lastName].join(" ") === value
            )?.contextId;
            event.setExtendedProp(
              found ? "patientId" : "patientName",
              found ? found : value
            );
            setAutocomplete(value);
          }}
          withAsterisk
        />
      )}
    </Flex>
  );
};

export default EventAddForm;
