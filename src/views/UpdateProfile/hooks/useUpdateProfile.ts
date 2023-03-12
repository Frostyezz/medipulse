import { LANGUAGES } from "@/services/graphql/types/enums";
import { useAppDispatch } from "@/services/redux/hooks";
import { SET_PROFILE_DATA } from "@/services/redux/slices/profileSlice";
import { SET_USER_DATA } from "@/services/redux/slices/userSlice";
import { gql, useMutation } from "@apollo/client";
import { showNotification } from "@mantine/notifications";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const UPDATE_PROFILE = gql`
  mutation UpdateProfile($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      schedule {
        color
        daysOfWeek
        display
        endTime
        startTime
      }
      lastName
      firstName
      avatar
    }
  }
`;

const useUpdateProfile = (language: LANGUAGES) => {
  const [updateProfile, { data, loading, error }] = useMutation(UPDATE_PROFILE);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

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
          language,
        })
      );
    }
  }, [data, error, dispatch]);

  return { updateProfile, loading };
};

export default useUpdateProfile;
