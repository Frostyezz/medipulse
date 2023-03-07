import { CreateInviteInput } from "@/services/graphql/schemas/invite.schema";
import { LANGUAGES, ROLES } from "@/services/graphql/types/enums";
import { useAppSelector } from "@/services/redux/hooks";
import { useForm } from "@mantine/form";
import { useTranslation } from "react-i18next";
import validator from "validator";

const useInviteForm = () => {
  const { t } = useTranslation();
  const language =
    useAppSelector((store) => store.user.language) ?? LANGUAGES.en;

  const form = useForm<CreateInviteInput>({
    initialValues: {
      email: "",
      language,
      role: ROLES.PATIENT,
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
      language: (value) =>
        validator.isEmpty(value ?? "")
          ? t("register.error.language.required")
          : undefined,
      role: (value) =>
        validator.isEmpty(value ?? "") ? t("invite.error.role") : undefined,
    },
  });

  return form;
};

export default useInviteForm;
