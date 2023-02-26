import { useEffect } from "react";
import { useAppDispatch } from "@/services/redux/hooks";
import { gql, useMutation } from "@apollo/client";
import { showNotification } from "@mantine/notifications";
import {
  SET_USER_DATA,
  UserSliceType,
} from "@/services/redux/slices/userSlice";
import { CreateUserInput } from "@/services/graphql/schemas/user.schema";
import { useTranslation } from "react-i18next";

const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      _id
      email
      language
      registerStep
      role
    }
  }
`;

const useCreateAccount = () => {
  const [createUser, { data, loading, error }] = useMutation<
    { createUser: UserSliceType },
    { input: CreateUserInput }
  >(CREATE_USER);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (error)
      showNotification({
        title: t("register.error"),
        message: t(error.message),
        color: "red",
      });
    else if (data) dispatch(SET_USER_DATA(data.createUser ?? {}));
  }, [data, error, dispatch]);

  return { createUser, loading };
};

export default useCreateAccount;
