import React, { useMemo } from "react";
import { TextInput } from "@mantine/core";
import { useTranslation } from "react-i18next";
import _ from "lodash";
import { useAppDispatch } from "@/services/redux/hooks";
import { FILTER_PATIENTS } from "@/services/redux/slices/patientsSlice";

const FilterOptions: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const throttledChangeHandler = useMemo(
    () =>
      _.throttle(
        (event: React.ChangeEvent<HTMLInputElement>) =>
          dispatch(FILTER_PATIENTS(event.target.value)),
        1000
      ),
    []
  );

  return (
    <TextInput
      placeholder={t("patients.filter.name.placeholder") as string}
      label={t("patients.filter.name.label")}
      sx={{ width: "250px" }}
      onChange={throttledChangeHandler}
    />
  );
};

export default FilterOptions;
