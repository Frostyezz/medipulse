import { Profile } from "@/services/graphql/schemas/profile.schema";
import { useAppDispatch } from "@/services/redux/hooks";
import { SET_PATIENTS } from "@/services/redux/slices/patientsSlice";
import { gql, useQuery } from "@apollo/client";
import { showNotification } from "@mantine/notifications";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const FETCH_PATIENTS = gql`
  query GetPatients {
    getMyPatients {
      _id
      avatar
      firstName
      lastName
      createdAt
    }
  }
`;

const useFetchPatients = () => {
  const { data, error, loading } = useQuery<{
    getMyPatients: Partial<Profile>[];
  }>(FETCH_PATIENTS, { fetchPolicy: "network-only" });

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (error)
      showNotification({
        title: t("register.error"),
        message: t(error.message),
        color: "red",
      });
    else if (!loading && data?.getMyPatients) {
      dispatch(SET_PATIENTS(data.getMyPatients));
    }
  }, [data, error, loading]);

  return loading;
};

export default useFetchPatients;
