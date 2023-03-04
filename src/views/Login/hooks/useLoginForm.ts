import { LoginInput } from "@/services/graphql/schemas/user.schema";
import { useForm } from "@mantine/form";
import { useTranslation } from "react-i18next";
import validator from "validator";

const useLoginForm = () => {
  const { t } = useTranslation();

  const form = useForm<LoginInput>({
    initialValues: {
      email: "",
      password: "",
    },
    validateInputOnBlur: true,
    validate: {
      email: (value) => {
        if (validator.isEmpty(value ?? ""))
          return t("register.error.email.required");
        return validator.isEmail(value)
          ? undefined
          : t("register.error.email.isEmail");
      },
      password: (value) => {
        if (validator.isEmpty(value ?? ""))
          return t("register.error.password.required");
      },
    },
  });

  return form;
};

export default useLoginForm;
