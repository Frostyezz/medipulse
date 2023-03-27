import { useAppSelector } from "@/services/redux/hooks";
import { Flex, Grid, SimpleGrid, Skeleton, Title, rem } from "@mantine/core";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import AppointmentPanel from "./components/AppointmentPanel";

const Dashboard: React.FC = () => {
  const profile = useAppSelector((store) => store.profile);
  const { t } = useTranslation();
  console.log(dayjs().hour());

  return (
    <Flex direction="column" gap={56}>
      <Title>
        {dayjs().hour() < 12
          ? t("dashboard.title.morning", { name: profile.firstName })
          : t("dashboard.title.noon", { name: profile.firstName })}
      </Title>
      <AppointmentPanel />
    </Flex>
  );
};

export default Dashboard;
