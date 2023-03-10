import { useEffect } from "react";
import { useAppDispatch } from "@/services/redux/hooks";
import { gql, useMutation } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { showNotification } from "@mantine/notifications";
import { REMOVE_TRANSFER_REQUEST } from "@/services/redux/slices/transferRequests";

const PROCESS_TRANSFER_REQUEST = gql`
  mutation ProcessTransferRequest($input: ProcessTransferRequestInput!) {
    processTransferRequest(input: $input)
  }
`;

const useProcessTransferRequest = () => {
  const [processRequest, { data, loading, error }] = useMutation<{
    processTransferRequest: string;
  }>(PROCESS_TRANSFER_REQUEST);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (error)
      showNotification({
        title: t("register.error"),
        message: t(error.message),
        color: "red",
      });
    else if (data?.processTransferRequest && !loading) {
      dispatch(REMOVE_TRANSFER_REQUEST(data.processTransferRequest));
      showNotification({
        title: t("request.success.title"),
        message: "",
        color: "green",
      });
    }
  }, [data, error, dispatch]);

  return { processRequest, loading };
};

export default useProcessTransferRequest;
