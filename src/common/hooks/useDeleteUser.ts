import { useEffect } from "react";
import { useAppDispatch } from "@/services/redux/hooks";
import { gql, useMutation } from "@apollo/client";
import { RESET_USER_DATA } from "@/services/redux/slices/userSlice";
import { useRouter } from "next/router";
import { ROUTES } from "../utils/routes";

const DELETE_USER = gql`
  mutation DeleteUser {
    deleteUser
  }
`;

const useDeleteUser = (redirectTo: ROUTES | undefined) => {
  const [deleteUser, { error, loading, data }] = useMutation<{
    deleteUser: boolean;
  }>(DELETE_USER);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (error) console.error(error);
    else if (!loading && data?.deleteUser) {
      dispatch(RESET_USER_DATA());
      if (redirectTo) router.replace(redirectTo);
    }
  }, [error, data]);

  return deleteUser;
};

export default useDeleteUser;
