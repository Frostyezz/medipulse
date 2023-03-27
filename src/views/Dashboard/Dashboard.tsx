import { useAppSelector } from "@/services/redux/hooks";
import { Flex, Title } from "@mantine/core";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import AppointmentPanel from "./components/AppointmentPanel";
import Stats from "./components/Stats";
const Dashboard: React.FC = () => {
  const profile = useAppSelector((store) => store.profile);
  const { t } = useTranslation();

  return (
    <Flex direction="column" gap={56}>
      <Title>
        {dayjs().hour() < 12
          ? t("dashboard.title.morning", { name: profile.firstName })
          : t("dashboard.title.noon", { name: profile.firstName })}
      </Title>
      <AppointmentPanel />
      <Stats />
    </Flex>
  );
};

export default Dashboard;
