import { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { Profile } from "@/services/graphql/schemas/profile.schema";
import { showNotification } from "@mantine/notifications";

const FETCH_PROFILE = gql`
  query GetProfileById($input: GetProfileByIdInput!) {
    getProfileById(input: $input) {
      avatar
      firstName
      lastName
      createdAt
      role
    }
  }
`;

const useFetchProfile = (profileId?: string) => {
  const { t } = useTranslation();
  const { data, error } = useQuery<{
    getProfileById: Partial<Profile>;
  }>(FETCH_PROFILE, { skip: !profileId, variables: { input: { profileId } } });

  useEffect(() => {
    if (error)
      showNotification({
        title: t("register.error"),
        message: t(error.message),
        color: "red",
      });
  }, [error]);

  return data?.getProfileById;
};

export default useFetchProfile;
