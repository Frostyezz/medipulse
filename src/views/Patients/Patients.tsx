import React from "react";
import { Flex, Divider, Title, Skeleton } from "@mantine/core";
import FilterOptions from "./components/FilterOptions";
import useFetchPatients from "./hooks/useFetchPatients";
import { useAppSelector } from "@/services/redux/hooks";
import PatientCard from "./components/PatientCard";
import { useMediaQuery } from "@mantine/hooks";
import { useTranslation } from "react-i18next";
import { UserOff } from "tabler-icons-react";

const Patients: React.FC = () => {
  const isMobile = useMediaQuery("(max-width: 800px)");
  const loading = useFetchPatients();
  const patients = useAppSelector((store) => store.patients.patients);
  const { t } = useTranslation();

  return (
    <Flex direction="column" sx={{ height: "100%" }}>
      <FilterOptions />
      <Divider my={12} size="md" />
      <Title order={2} mb={12}>
        {t("patients.list.title")}
      </Title>
      {!patients.length && !loading ? (
        <Flex
          direction="column"
          align="center"
          justify="center"
          className="animate__animated animate__fadeIn"
          sx={{ height: "100%" }}
        >
          <UserOff size={60} />
          <Title sx={{ textAlign: "center" }} weight={500} order={3}>
            {t("patients.zeroState")}
          </Title>
        </Flex>
      ) : (
        <Flex wrap="wrap" gap={12} justify={isMobile ? "center" : "start"}>
          {loading
            ? [1, 2].map((idx) => (
                <Skeleton visible height={279} width={300} key={idx} />
              ))
            : patients.map((patient, idx) => (
                <PatientCard {...patient} key={patient._id ?? idx} />
              ))}
        </Flex>
      )}
    </Flex>
  );
};

export default Patients;
