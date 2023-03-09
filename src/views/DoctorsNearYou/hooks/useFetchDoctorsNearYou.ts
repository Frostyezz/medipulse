import { Profile } from "@/services/graphql/schemas/profile.schema";
import { gql, useLazyQuery } from "@apollo/client";
import { showNotification } from "@mantine/notifications";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const FETCH_DOCTORS_NEAR_YOU = gql`
  query GetDoctorsNearMe($input: GetDoctorsNearMeInput!) {
    getDoctorsNearMe(input: $input) {
      _id
      avatar
      createdAt
      firstName
      lastName
      patientsCount
    }
  }
`;

const useFetchDoctorsNearYou = () => {
  const [fetchDoctors, { data, loading, error }] = useLazyQuery<{
    getDoctorsNearMe: Partial<Profile>[] | null;
  }>(FETCH_DOCTORS_NEAR_YOU, { fetchPolicy: "network-only" });
  const { t } = useTranslation();

  useEffect(() => {
    if (error)
      showNotification({
        title: t("register.error"),
        message: t(error.message),
        color: "red",
      });
  }, [data, error, loading]);

  return { loading, doctors: data?.getDoctorsNearMe, fetchDoctors };
};

export default useFetchDoctorsNearYou;
