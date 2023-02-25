import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import validator from "validator";

export enum LANGUAGE_PREF {
  EN = "en",
  RO = "ro",
}

export interface CreateAccountFormValues {
  email: string;
  password: string;
  language: LANGUAGE_PREF;
}

const useCreateAccountForm = () => {
  const { t, i18n } = useTranslation();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      language: LANGUAGE_PREF.EN,
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
