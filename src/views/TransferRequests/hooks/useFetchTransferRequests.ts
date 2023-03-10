import { GetTransfersRequestsResult } from "@/services/graphql/schemas/transferRequest.schema";
import { useAppDispatch } from "@/services/redux/hooks";
import { SET_TRANSFER_REQUESTS } from "@/services/redux/slices/transferRequests";
import { gql, useQuery } from "@apollo/client";
import { showNotification } from "@mantine/notifications";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const FETCH_TRANSFER_REQUESTS = gql`
  query GetTransfersRequests {
    getTransferRequests {
      medicProfile {
        avatar
        createdAt
        firstName
        lastName
        role
      }
      patientProfile {
        avatar
        createdAt
        firstName
        lastName
        role
      }
      request {
        transferTo
        patientId
        _id
        createdAt
      }
    }
  }
`;

const useFetchTransferRequests = () => {
  const { data, loading, error } = useQuery<{
    getTransferRequests: GetTransfersRequestsResult[] | null;
  }>(FETCH_TRANSFER_REQUESTS, { fetchPolicy: "network-only" });
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (error)
      showNotification({
        title: t("register.error"),
        message: t(error.message),
        color: "red",
      });
    else if (!loading && data?.getTransferRequests) {
      dispatch(SET_TRANSFER_REQUESTS(data.getTransferRequests));
    }
  }, [data, error, loading]);

  return loading;
};

export default useFetchTransferRequests;
