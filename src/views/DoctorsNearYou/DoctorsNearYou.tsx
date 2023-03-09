import React from "react";
import {
  Flex,
  SegmentedControl,
  Text,
  Divider,
  Title,
  Skeleton,
} from "@mantine/core";
import useFetchDoctorsNearYou from "./hooks/useFetchDoctorsNearYou";
import useManageLocation from "./hooks/useManageLocation";
import { useTranslation } from "react-i18next";
import AllowLocationWarning from "./components/AllowLocationWarning";
import { MapOff } from "tabler-icons-react";
import { useMediaQuery } from "@mantine/hooks";
import DoctorCard from "./components/DoctorCard";

const DoctorsNearYou: React.FC = () => {
  const { loading, fetchDoctors, doctors } = useFetchDoctorsNearYou();
  const { coords, maxDistance, setMaxDistance } =
    useManageLocation(fetchDoctors);
  const { t } = useTranslation();
  const isMobile = useMediaQuery("(max-width: 800px)");

  return (
    <Flex direction="column" sx={{ height: "100%" }}>
      <Flex direction="column">
        <Text>{t("doctors.area.label")}</Text>
        <SegmentedControl
          sx={{ width: "200px" }}
          value={String(maxDistance)}
          onChange={(value) => setMaxDistance(Number(value))}
          color="blue"
          data={["50", "100", "150"]}
        />
      </Flex>
      <Divider my={12} size="md" />
      {!coords && <AllowLocationWarning />}
      {!doctors?.length && coords && !loading ? (
        <Flex
          direction="column"
          align="center"
          justify="center"
          className="animate__animated animate__fadeIn"
          sx={{ height: "100%" }}
        >
          <MapOff size={60} />
          <Title sx={{ textAlign: "center" }} weight={500} order={3}>
            {t("doctors.zeroState")}
          </Title>
        </Flex>
      ) : (
        <Flex wrap="wrap" gap={12} justify={isMobile ? "center" : "start"}>
          {loading
            ? [1, 2].map((idx) => (
                <Skeleton visible height={279} width={300} key={idx} />
              ))
            : doctors?.map((doctor, idx) => (
                <DoctorCard {...doctor} key={doctor._id ?? idx} />
              ))}
        </Flex>
      )}
    </Flex>
  );
};

export default DoctorsNearYou;
