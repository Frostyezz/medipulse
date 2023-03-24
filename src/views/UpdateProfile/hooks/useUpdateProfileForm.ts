import { EffectCallback, useEffect } from "react";
import { useAppSelector } from "@/services/redux/hooks";
import { useForm } from "@mantine/form";
import { useTranslation } from "react-i18next";
import { UpdateProfileInput } from "@/services/graphql/schemas/profile.schema";
import { LANGUAGES, THEME } from "@/services/graphql/types/enums";
import { useMantineColorScheme } from "@mantine/core";

const useUpdateProfileForm = () => {
  const { t, i18n } = useTranslation();
  const { toggleColorScheme } = useMantineColorScheme();
  const { firstName, lastName, avatar, schedule } = useAppSelector(
    (store) => store.profile
  );
  const { language, theme } = useAppSelector((store) => store.user);

  const form = useForm<UpdateProfileInput>({
    initialValues: {
      firstName: firstName ?? "",
      lastName: lastName ?? "",
      avatar,
      language: language ?? LANGUAGES.en,
      schedule,
      theme: theme ?? THEME.light,
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
    form.setValues({ firstName, lastName, avatar, language, schedule, theme });
  }, [firstName, lastName, avatar, language, schedule, theme]);

  // @ts-ignore
  useEffect(() => {
    if (form.values.language) i18n.changeLanguage(form.values.language);
    // @ts-ignore
    return () => i18n.changeLanguage(language) as EffectCallback;
  }, [form.values.language, i18n, language]);

  useEffect(() => {
    toggleColorScheme(form.values.theme ?? THEME.light);

    return () => toggleColorScheme(theme);
  }, [form.values.theme, theme]);

  return form;
};

export default useUpdateProfileForm;
