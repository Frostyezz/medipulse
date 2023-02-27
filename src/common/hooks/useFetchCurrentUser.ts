import { useEffect } from "react";
import { User } from "@/services/graphql/schemas/user.schema";
import { useAppDispatch } from "@/services/redux/hooks";
import { SET_USER_DATA } from "@/services/redux/slices/userSlice";
import { gql, useQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";

const FETCH_CURRENT_USER = gql`
  query FetchCurrentUser {
    me {
      _id
      email
      profileId
      role
      language
      registerStep
    }
  }
`;

const useFetchCurrentUser = () => {
  const { data, loading, error } = useQuery<{ me: User }>(FETCH_CURRENT_USER);
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (error) console.error(error);
    else if (!loading && data?.me) {
      i18n.changeLanguage(data.me.language);
      dispatch(SET_USER_DATA(data.me));
    }
  }, [data, loading, error, dispatch]);
};

export default useFetchCurrentUser;
