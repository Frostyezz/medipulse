import { CreateProfileInput } from "@/services/graphql/schemas/profile.schema";
import { ROLES } from "@/services/graphql/types/enums";
import { useAppSelector } from "@/services/redux/hooks";
import { useForm } from "@mantine/form";
import { useTranslation } from "react-i18next";

const useCreateProfileForm = () => {
  const { t } = useTranslation();
  const isPatient =
    useAppSelector((store) => store.user.role) === ROLES.PATIENT;

  const form = useForm<CreateProfileInput>({
    initialValues: {
      firstName: "",
      lastName: "",
      medicalProof: !isPatient ? "" : "none",
    },
    validateInputOnBlur: true,
    validate: {
      firstName: (value) =>
        value ? undefined : t("createProfile.error.firstName"),
      lastName: (value) =>
        value ? undefined : t("createProfile.error.lastName"),
      medicalProof: (value) =>
        value ? undefined : t("createProfile.error.proof"),
    },
  });

  return form;
};

export default useCreateProfileForm;
