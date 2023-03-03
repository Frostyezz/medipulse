import { useAppDispatch } from "@/services/redux/hooks";
import {
  SET_USER_DATA,
  UserSliceType,
} from "@/services/redux/slices/userSlice";
import { gql, useMutation } from "@apollo/client";
import { showNotification } from "@mantine/notifications";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const CREATE_MEDIC_PROFILE = gql`
  mutation CreateMedic($input: CreateMedicInput!) {
    createMedic(input: $input) {
      _id
      avatar
      contextId
      firstName
      lastName
    }
  }
`;

const useCreateMedicProfile = () => {
  const [createMedicProfile, { data, loading, error }] = useMutation<{
    createMedic: UserSliceType;
  }>(CREATE_MEDIC_PROFILE);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (error)
      showNotification({
        title: t("register.error"),
        message: t(error.message),
        color: "red",
      });
    else if (data?.createMedic)
      dispatch(
        SET_USER_DATA({
          ...(data.createMedic ?? {}),
          profileId: data.createMedic._id,
          registerStep: 3,
        })
      );
  }, [data, error, dispatch]);

  return { createMedicProfile, loading };
};

export default useCreateMedicProfile;
