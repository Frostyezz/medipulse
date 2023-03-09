import { useEffect } from "react";
import { LANGUAGES, ROLES } from "@/services/graphql/types/enums";
import { useForm } from "@mantine/form";
import { useTranslation } from "react-i18next";
import validator from "validator";
import { CreateUserInput } from "@/services/graphql/schemas/user.schema";
import { useRouter } from "next/router";

const useCreateAccountForm = () => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { id, type } = router.query;

  const form = useForm<CreateUserInput>({
    initialValues: {
      email: "",
      password: "",
      language: LANGUAGES.en,
      role: type ? (type as ROLES) : ROLES.MEDIC,
      medicId: id as string,
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
        return validator.isStrongPassword(value, { minLength: 6 })
          ? undefined
          : t("register.error.email.passwordTooWeak");
      },
      language: (value) =>
        validator.isEmpty(value ?? "")
          ? t("register.error.language.required")
          : undefined,
    },
  });

  useEffect(() => {
    if (id) form.setFieldValue("medicId", id as string);
    if (type) form.setFieldValue("role", type ? (type as ROLES) : ROLES.MEDIC);
  }, [id, type]);

  useEffect(() => {
    if (form.values.language) i18n.changeLanguage(form.values.language);
  }, [form.values.language, i18n]);

  return form;
};

export default useCreateAccountForm;
