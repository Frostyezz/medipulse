import { useAppDispatch, useAppSelector } from "@/services/redux/hooks";
import { SET_USER_DATA } from "@/services/redux/slices/userSlice";
import { gql, useMutation } from "@apollo/client";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const VERIFY_EMAIL = gql`
  mutation VerifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input)
  }
`;

const RESEND_EMAIL = gql`
  mutation ResendEmail {
    resendValidationCode
  }
`;

const useVerifyEmail = () => {
  const [verifyEmail, { data, error, loading }] = useMutation<{
    verifyEmail: boolean | null;
  }>(VERIFY_EMAIL);
  const [resendEmail, { error: resendError, data: resendData }] = useMutation<{
    resendValidationCode: boolean | null;
  }>(RESEND_EMAIL);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const email = useAppSelector((store) => store.user.email);
  const [cooldown, setCooldown] = useState(false);

  useEffect(() => {
    if (resendError)
      showNotification({
        title: t("register.error"),
        message: t(resendError.message),
        color: "red",
      });
    else if (resendData?.resendValidationCode) {
      showNotification({
        title: t("verify.notify.emailSent.title", { email }),
        message: t("verify.notify.emailSent.subtitle"),
        color: "blue",
        autoClose: 6000,
      });
      setCooldown(true);
      const timeout = setTimeout(() => setCooldown(false), 1000 * 60 * 3);
      return () => clearTimeout(timeout);
    }
  }, [resendError, resendData]);

  useEffect(() => {
    if (error)
      showNotification({
        title: t("register.error"),
        message: t(error.message),
        color: "red",
      });
    else if (!loading && data?.verifyEmail)
      dispatch(SET_USER_DATA({ registerStep: 2 }));
  }, [data, loading, error]);

  return { loading, cooldown, verifyEmail, resendEmail };
};

export default useVerifyEmail;
