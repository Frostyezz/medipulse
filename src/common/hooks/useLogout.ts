import { useEffect } from "react";
import { useAppDispatch } from "@/services/redux/hooks";
import { RESET_PROFILE_DATA } from "@/services/redux/slices/profileSlice";
import { RESET_USER_DATA } from "@/services/redux/slices/userSlice";
import { gql, useMutation } from "@apollo/client";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { ROUTES } from "../utils/routes";
import { RESET_INVITES } from "@/services/redux/slices/invitesSlice";
import { RESET_TRANSFER_REQUESTS } from "@/services/redux/slices/transferRequests";
import { RESET_PATIENT } from "@/services/redux/slices/patientsSlice";
import { RESET_APPOINTMENTS } from "@/services/redux/slices/appointmentsSlice";
import { useMantineColorScheme } from "@mantine/core";
import { THEME } from "@/services/graphql/types/enums";

const LOGOUT = gql`
  mutation LogOut {
    logout
  }
`;

const useLogout = () => {
  const [logout, { data, error, loading }] = useMutation<{ logout: boolean }>(
    LOGOUT
  );
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { toggleColorScheme } = useMantineColorScheme();

  useEffect(() => {
    if (error) {
      showNotification({
        title: t("register.error"),
        message: t("error.logout"),
        color: "red",
      });
    } else if (data?.logout && !loading) {
      dispatch(RESET_USER_DATA());
      dispatch(RESET_PROFILE_DATA());
      dispatch(RESET_INVITES());
      dispatch(RESET_TRANSFER_REQUESTS());
      dispatch(RESET_PATIENT());
      dispatch(RESET_APPOINTMENTS());
      toggleColorScheme(THEME.light);
      router.replace(ROUTES.ROOT);
    }
  }, [data, loading, error]);

  return logout;
};

export default useLogout;
