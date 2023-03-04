import { useEffect } from "react";
import { useAppDispatch } from "@/services/redux/hooks";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { showNotification } from "@mantine/notifications";
import { FETCH_CURRENT_USER } from "@/common/hooks/useFetchCurrentUser";
import { User } from "@/services/graphql/schemas/user.schema";
import { Profile } from "@/services/graphql/schemas/profile.schema";
import { SET_USER_DATA } from "@/services/redux/slices/userSlice";
import { SET_PROFILE_DATA } from "@/services/redux/slices/profileSlice";
import { useRouter } from "next/router";
import { ROUTES } from "@/common/utils/routes";

const LOGIN = gql`
  mutation LogIn($input: LoginInput!) {
    login(input: $input)
  }
`;

const useLogin = () => {
  const [login, { data, error, loading }] = useMutation<{ login: boolean }>(
    LOGIN
  );
  const [
    fetchUser,
    { data: userData, loading: userLoading, error: userError },
  ] = useLazyQuery<{
    me: User;
    getMyProfile: Profile;
  }>(FETCH_CURRENT_USER);
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (error) {
      showNotification({
        title: t("register.error"),
        message: t(error.message),
        color: "red",
      });
    } else if (data?.login && !loading) {
      fetchUser();
    }
  }, [data, loading, error]);

  useEffect(() => {
    if (userError) console.error(userError);
    else if (!userLoading && userData?.me && userData?.getMyProfile) {
      i18n.changeLanguage(userData.me.language);
      dispatch(SET_USER_DATA(userData.me));
      dispatch(SET_PROFILE_DATA(userData.getMyProfile));
      router.replace(ROUTES.MEDIC_DASHBOARD);
    }
  }, [userData, userLoading, userError]);

  return { login, loading: loading || userLoading };
};

export default useLogin;
