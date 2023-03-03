import { CreateMedicInput } from "@/services/graphql/schemas/medic.schema";
import { useForm } from "@mantine/form";
import { useTranslation } from "react-i18next";
import validator from "validator";

const useCreateMedicForm = () => {
  const { t } = useTranslation();

  const form = useForm<CreateMedicInput>({
    initialValues: {
      firstName: "",
      lastName: "",
      medicalProof: "",
    },
    validateInputOnBlur: true,
    validate: {
      firstName: (value) =>
        value ? undefined : t("createProfile.medic.error.firstName"),
      lastName: (value) =>
        value ? undefined : t("createProfile.medic.error.lastName"),
      medicalProof: (value) =>
        value && validator.isURL(value)
          ? undefined
          : t("createProfile.medic.error.proof"),
    },
  });

  return form;
};

export default useCreateMedicForm;
