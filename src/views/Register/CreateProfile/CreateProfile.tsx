import React from "react";
import { Flex, Title, Text, TextInput, Button } from "@mantine/core";
import useCreatForm from "./hooks/useCreateProfileForm";
import AvatarUpload from "@/common/components/AvatarUpload/AvatarUpload";
import { useTranslation } from "react-i18next";
import DropzoneButton from "@/common/components/DropzoneButton/DropzoneButton";
import useCreateProfile from "./hooks/useCreateProfile";
import { useAppSelector } from "@/services/redux/hooks";
import { ROLES } from "@/services/graphql/types/enums";

const CreateProfile: React.FC = () => {
  const form = useCreatForm();
  const { t } = useTranslation();
  const { createProfile, loading } = useCreateProfile();
  const isPatient =
    useAppSelector((store) => store.user.role) === ROLES.PATIENT;

  return (
    <form
      onSubmit={form.onSubmit(async (values) => {
        await createProfile({ variables: { input: values } });
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
              {t("createProfile.label.avatar")}
            </Title>
            <Text>{t("createProfile.desc.avatar")}</Text>
          </Flex>
        </Flex>
        <Flex gap={12} sx={{ width: "100%" }}>
          <TextInput
            sx={{ width: "50%" }}
            placeholder={t("createProfile.label.firstName") as string}
            label={t("createProfile.label.firstName")}
            withAsterisk
            {...form.getInputProps("firstName")}
          />
          <TextInput
            sx={{ width: "50%" }}
            placeholder={t("createProfile.label.lastName") as string}
            label={t("createProfile.label.lastName")}
            withAsterisk
            {...form.getInputProps("lastName")}
          />
        </Flex>
        {!isPatient && (
          <DropzoneButton
            {...form.getInputProps("medicalProof")}
            onUpload={(value: string) =>
              form.setFieldValue("medicalProof", value)
            }
            title={
              form.values.medicalProof
                ? t("createProfile.label.proof.uploaded")
                : t("createProfile.label.proof")
            }
            subtitle={
              form.values.medicalProof
                ? t("createProfile.desc.proof.uploaded")
                : t("createProfile.desc.proof")
            }
          />
        )}
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

export default CreateProfile;
