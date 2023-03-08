import { useEffect } from "react";
import { useAppDispatch } from "@/services/redux/hooks";
import { gql, useQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { showNotification } from "@mantine/notifications";
import { SET_INVITES } from "@/services/redux/slices/invitesSlice";
import { Invite } from "@/services/graphql/schemas/invite.schema";

const FETCH_INVITES = gql`
  query GetInvites {
    getInvites {
      _id
      email
      status
      createdAt
    }
  }
`;

const useFetchInvitations = () => {
  const { data, error, loading } = useQuery<{ getInvites: Partial<Invite>[] }>(
    FETCH_INVITES
  );

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (error)
      showNotification({
        title: t("register.error"),
        message: t(error.message),
        color: "red",
      });
    else if (!loading && data?.getInvites) {
      dispatch(SET_INVITES(data.getInvites));
    }
  }, [data, error, loading]);

  return loading;
};

export default useFetchInvitations;
