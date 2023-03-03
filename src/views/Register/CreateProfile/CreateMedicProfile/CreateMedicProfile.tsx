import React from "react";
import { Flex, Title, Text, TextInput, Button } from "@mantine/core";
import useCreateMedicForm from "./hooks/useCreateMedicForm";
import AvatarUpload from "@/common/components/AvatarUpload/AvatarUpload";
import { useTranslation } from "react-i18next";
import DropzoneButton from "@/common/components/DropzoneButton/DropzoneButton";
import useCreateMedicProfile from "./hooks/useCreateMedicProfile";

const CreateMedicProfile: React.FC = () => {
  const form = useCreateMedicForm();
  const { t } = useTranslation();
  const { createMedicProfile, loading } = useCreateMedicProfile();

  return (
    <form
      onSubmit={form.onSubmit(async (values) => {
        await createMedicProfile({ variables: { input: values } });
      })}
    >
      <Flex
        direction="column"
        gap={24}
        mt={24}
        sx={(theme) => ({
          maxWidth: "600px",
          [theme.fn.smallerThan("md")]: {
            maxWidth: "100%",
          },
        })}
      >
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
              {t("createProfile.medic.label.avatar")}
            </Title>
            <Text>{t("createProfile.medic.desc.avatar")}</Text>
          </Flex>
        </Flex>
        <Flex gap={12} sx={{ width: "100%" }}>
          <TextInput
            sx={{ width: "50%" }}
            placeholder={t("createProfile.medic.label.firstName") as string}
            label={t("createProfile.medic.label.firstName")}
            withAsterisk
            {...form.getInputProps("firstName")}
          />
          <TextInput
            sx={{ width: "50%" }}
            placeholder={t("createProfile.medic.label.lastName") as string}
            label={t("createProfile.medic.label.lastName")}
            withAsterisk
            {...form.getInputProps("lastName")}
          />
        </Flex>
        <DropzoneButton
          {...form.getInputProps("medicalProof")}
          onUpload={(value: string) =>
            form.setFieldValue("medicalProof", value)
          }
          title={
            form.values.medicalProof
              ? t("createProfile.medic.label.proof.uploaded")
              : t("createProfile.medic.label.proof")
          }
          subtitle={
            form.values.medicalProof
              ? t("createProfile.medic.desc.proof.uploaded")
              : t("createProfile.medic.desc.proof")
          }
        />
        <Button
          loading={loading}
          type="submit"
          disabled={!form.isValid()}
          mb={20}
        >
          {t("createProfile.button")}
        </Button>
      </Flex>
    </form>
  );
};

export default CreateMedicProfile;
