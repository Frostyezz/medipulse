import React, { useRef } from "react";
import { Flex, Button, Title, Text, TextInput, Select } from "@mantine/core";
import AvatarUpload from "@/common/components/AvatarUpload/AvatarUpload";
import { useTranslation } from "react-i18next";
import useUpdateProfileForm from "./hooks/useUpdateProfileForm";
import TimetableCalendar from "@/common/components/TimetableCalendar/TimetableCalendar";
import { LANGUAGES } from "@/services/graphql/types/enums";
import FullCalendar from "@fullcalendar/react";
import useUpdateProfile from "./hooks/useUpdateProfile";
import { useAppSelector } from "@/services/redux/hooks";

const UpdateProfile: React.FC = () => {
  const { t } = useTranslation();
  const form = useUpdateProfileForm();
  const { loading, updateProfile } = useUpdateProfile(form.values.language);
  const { role } = useAppSelector((store) => store.user) ?? {};
  const ref = useRef<FullCalendar | null>(null);

  return (
    <form
      onSubmit={form.onSubmit(async (values) => {
        await updateProfile({
          variables: {
            input: {
              ...values,
              schedule: ref.current
                ?.getApi()
                .getEvents()
                .map(({ extendedProps }) => extendedProps),
            },
          },
        });
      })}
    >
      <Flex direction="column" gap={12}>
        <Flex
          gap={12}
          sx={(theme) => ({
            [theme.fn.smallerThan("md")]: {
              flexDirection: "column-reverse",
            },
          })}
        >
          <AvatarUpload
            onUpload={(value: string) => form.setFieldValue("avatar", value)}
            {...form.getInputProps("avatar")}
          />
          <Flex direction="column" justify="center">
            <Title weight={500} order={4} mb={4}>
              {t("createProfile.label.avatar")}
            </Title>
            <Text>{t("createProfile.desc.avatar")}</Text>
          </Flex>
        </Flex>
        <Flex wrap="wrap" gap={12} mb={12}>
          <TextInput
            sx={{ width: "200px" }}
            placeholder={t("createProfile.label.firstName") as string}
            label={t("createProfile.label.firstName")}
            withAsterisk
            {...form.getInputProps("firstName")}
          />
          <TextInput
            sx={{ width: "200px" }}
            placeholder={t("createProfile.label.lastName") as string}
            label={t("createProfile.label.lastName")}
            withAsterisk
            {...form.getInputProps("lastName")}
          />
          <Select
            label={t("register.label.language") as string}
            placeholder={t("register.label.language") as string}
            data={[
              { value: LANGUAGES.en, label: t("languages.en") as string },
              { value: LANGUAGES.ro, label: t("languages.ro") as string },
            ]}
            withAsterisk
            {...form.getInputProps("language")}
          />
        </Flex>
        <Title weight={500} order={4}>
          {t(`update.label.schedule.${role}`)}
        </Title>
        {/* @ts-ignore */}
        <TimetableCalendar
          ref={ref}
          language={form.values.language}
          currentDate={ref.current?.getApi().getDate()}
        />
        <Button
          loading={loading}
          type="submit"
          disabled={!form.isValid()}
          mb={20}
        >
          {t("update.submit")}
        </Button>
      </Flex>
    </form>
  );
};

export default UpdateProfile;
