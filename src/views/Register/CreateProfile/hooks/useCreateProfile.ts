import { ROUTES } from "@/common/utils/routes";
import { ROLES } from "@/services/graphql/types/enums";
import { useAppDispatch, useAppSelector } from "@/services/redux/hooks";
import {
  ProfileSliceType,
  SET_PROFILE_DATA,
} from "@/services/redux/slices/profileSlice";
import { SET_USER_DATA } from "@/services/redux/slices/userSlice";
import { gql, useMutation } from "@apollo/client";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const CREATE_PROFILE = gql`
  mutation CreateProfile($input: CreateProfileInput!) {
    createProfile(input: $input) {
      _id
      avatar
      contextId
      firstName
      lastName
    }
  }
`;

const RedirectPath: Record<ROLES, ROUTES> = {
  [ROLES.MEDIC]: ROUTES.MEDIC_DASHBOARD,
  [ROLES.NURSE]: ROUTES.MEDIC_DASHBOARD,
  [ROLES.PATIENT]: ROUTES.MEDIC_DASHBOARD,
};

const useCreateProfile = () => {
  const [createProfile, { data, loading, error }] = useMutation<{
    createProfile: ProfileSliceType;
  }>(CREATE_PROFILE);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const role = useAppSelector((store) => store.user.role) ?? ROLES.MEDIC;
  const router = useRouter();

  useEffect(() => {
    if (error)
      showNotification({
        title: t("register.error"),
        message: t(error.message),
        color: "red",
      });
    else if (data?.createProfile) {
      dispatch(SET_PROFILE_DATA(data.createProfile));
      dispatch(
        SET_USER_DATA({
          profileId: data.createProfile._id,
          registerStep: 3,
        })
      );
      router.replace(RedirectPath[role]);
    }
  }, [data, error, dispatch]);

  return { createProfile, loading };
};

export default useCreateProfile;
