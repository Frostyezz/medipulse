import { useEffect } from "react";
import { Invite } from "@/services/graphql/schemas/invite.schema";
import { useAppDispatch } from "@/services/redux/hooks";
import { gql, useMutation } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { showNotification } from "@mantine/notifications";
import { ADD_INVITE } from "@/services/redux/slices/invitesSlice";

const SEND_INVITE = gql`
  mutation SendInvite($input: CreateInviteInput!) {
    createInvite(input: $input) {
      _id
      medicId
      email
      role
      language
      status
    }
  }
`;

const useSendInvite = () => {
  const [sendInvite, { data, loading, error }] = useMutation<{
    createInvite: Invite;
  }>(SEND_INVITE);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (error)
      showNotification({
        title: t("register.error"),
        message: t(error.message),
        color: "red",
      });
    else if (data) {
      dispatch(ADD_INVITE(data.createInvite ?? {}));
      showNotification({
        title: t("invite.success.title"),
        message: "",
        color: "green",
      });
    }
  }, [data, error, dispatch]);

  return { sendInvite, loading };
};

export default useSendInvite;
