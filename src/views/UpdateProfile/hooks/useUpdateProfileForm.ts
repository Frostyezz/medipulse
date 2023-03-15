import { EffectCallback, useEffect } from "react";
import { useAppSelector } from "@/services/redux/hooks";
import { useForm } from "@mantine/form";
import { useTranslation } from "react-i18next";
import { UpdateProfileInput } from "@/services/graphql/schemas/profile.schema";
import { LANGUAGES } from "@/services/graphql/types/enums";

const useUpdateProfileForm = () => {
  const { t, i18n } = useTranslation();
  const { firstName, lastName, avatar, schedule } = useAppSelector(
    (store) => store.profile
  );
  const { language } = useAppSelector((store) => store.user);

  const form = useForm<UpdateProfileInput>({
    initialValues: {
      firstName: firstName ?? "",
      lastName: lastName ?? "",
      avatar,
      language: language ?? LANGUAGES.en,
      schedule,
    },
    validateInputOnBlur: true,
    validate: {
      firstName: (value) =>
        value ? undefined : t("createProfile.error.firstName"),
      lastName: (value) =>
        value ? undefined : t("createProfile.error.lastName"),
    },
  });

  useEffect(() => {
    form.setValues({ firstName, lastName, avatar, language, schedule });
  }, [firstName, lastName, avatar, language, schedule]);

  useEffect(() => {
    if (form.values.language) i18n.changeLanguage(form.values.language);
    // @ts-ignore
    return () => i18n.changeLanguage(language) as EffectCallback;
  }, [form.values.language, i18n, language]);

  return form;
};

export default useUpdateProfileForm;
