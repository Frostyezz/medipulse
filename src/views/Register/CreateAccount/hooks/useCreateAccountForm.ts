import { useEffect } from "react";
import { LANGUAGES } from "@/services/graphql/types/enums";
import { useForm } from "@mantine/form";
import { useTranslation } from "react-i18next";
import validator from "validator";

export interface CreateAccountFormValues {
  email: string;
  password: string;
  language: LANGUAGES;
}

const useCreateAccountForm = () => {
  const { t, i18n } = useTranslation();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      language: LANGUAGES.EN,
    },
    validateInputOnBlur: true,
    validate: {
      email: (value) => {
        if (validator.isEmpty(value ?? ""))
          return t("register.error.email.required");
        return validator.isEmail(value)
          ? ""
          : t("register.error.email.isEmail");
      },
      password: (value) => {
        if (validator.isEmpty(value ?? ""))
          return t("register.error.password.required");
        return validator.isStrongPassword(value, { minLength: 6 })
          ? ""
          : t("register.error.email.passwordTooWeak");
      },
      language: (value) =>
        validator.isEmpty(value ?? "")
          ? t("register.error.language.required")
          : "",
    },
  });

  useEffect(() => {
    if (form.values.language) i18n.changeLanguage(form.values.language);
  }, [form.values.language, i18n]);

  return form;
};

export default useCreateAccountForm;
