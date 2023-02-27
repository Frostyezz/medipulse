import { VerifyEmailInput } from "@/services/graphql/schemas/user.schema";
import { useForm } from "@mantine/form";
import { useTranslation } from "react-i18next";

const useVerifyEmailForm = () => {
  const { t } = useTranslation();

  const form = useForm<VerifyEmailInput>({
    validateInputOnBlur: true,
    validate: {
      validationCode: (value) =>
        value >= 1000 && value <= 9999
          ? undefined
          : t("verify.errors.invalidCode"),
    },
  });

  return form;
};

export default useVerifyEmailForm;
