import { useEffect } from "react";
import { User } from "@/services/graphql/schemas/user.schema";
import { useAppDispatch } from "@/services/redux/hooks";
import { SET_USER_DATA } from "@/services/redux/slices/userSlice";
import { gql, useQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { Profile } from "@/services/graphql/schemas/profile.schema";
import { SET_PROFILE_DATA } from "@/services/redux/slices/profileSlice";
import { useMantineColorScheme } from "@mantine/core";
import { THEME } from "@/services/graphql/types/enums";

export const FETCH_CURRENT_USER = gql`
  query FetchCurrentUser {
    me {
      _id
      email
      profileId
      role
      language
      registerStep
      theme
      completedFTU
      medicId
    }
    getMyProfile {
      _id
      contextId
      avatar
      firstName
      lastName
      role
      medicId
      schedule {
        startTime
        endTime
        display
        daysOfWeek
        color
      }
    }
  }
`;

const useFetchCurrentUser = () => {
  const { data, loading, error } = useQuery<{
    me: User;
    getMyProfile: Profile;
  }>(FETCH_CURRENT_USER);
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const { toggleColorScheme } = useMantineColorScheme();

  useEffect(() => {
    if (error) console.error(error);
    else if (!loading) {
      if (data?.me) {
        i18n.changeLanguage(data.me.language);
        toggleColorScheme(data.me?.theme ?? THEME.light);
        dispatch(SET_USER_DATA(data.me));
      }
      if (data?.getMyProfile) {
        dispatch(SET_PROFILE_DATA(data.getMyProfile));
      }
    }
  }, [data, loading, error, dispatch]);

  return loading;
};

export default useFetchCurrentUser;
