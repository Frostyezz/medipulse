import { Profile } from "@/services/graphql/schemas/profile.schema";
import { ROLES } from "@/services/graphql/types/enums";
import { useAppDispatch, useAppSelector } from "@/services/redux/hooks";
import { SET_PATIENTS } from "@/services/redux/slices/patientsSlice";
import { gql, useQuery } from "@apollo/client";
import { showNotification } from "@mantine/notifications";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const FETCH_PATIENTS = gql`
  query GetPatients {
    getMyPatients {
      _id
      contextId
      avatar
      firstName
      lastName
      createdAt
    }
  }
`;

const useFetchPatients = () => {
  const { role } = useAppSelector((store) => store.user) ?? {};

  const { data, error, loading } = useQuery<{
    getMyPatients: Partial<Profile>[];
  }>(FETCH_PATIENTS, {
    fetchPolicy: "network-only",
    skip: role === ROLES.PATIENT,
  });

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
