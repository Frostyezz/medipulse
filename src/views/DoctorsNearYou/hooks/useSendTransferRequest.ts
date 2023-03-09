import { gql, useMutation } from "@apollo/client";
import { showNotification } from "@mantine/notifications";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const SEND_TRANSFER_REQUEST = gql`
  mutation SendTransferRequest($input: CreateTransferRequestInput!) {
    createTransferRequest(input: $input)
  }
`;

const useSendTransferRequest = () => {
  const [sendTransferRequest, { data, error, loading }] = useMutation<{
    createTransferRequest: boolean;
  }>(SEND_TRANSFER_REQUEST);
  const { t } = useTranslation();

  useEffect(() => {
    if (error)
      showNotification({
        title: t(error.message),
        message: "",
        color: "red",
      });
    else if (data?.createTransferRequest && !loading) {
      showNotification({
        title: t("doctors.request.success.title"),
        message: t("doctors.request.success.subtitle"),
        color: "green",
      });
    }
  }, [data, error, loading]);

  return { sendTransferRequest, loading };
};

export default useSendTransferRequest;
