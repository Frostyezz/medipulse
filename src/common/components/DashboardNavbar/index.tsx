import React from "react";
import { useMediaQuery } from "@mantine/hooks";
import MobileDashboardNavbar from "./MobileDashboardNavbar";
import DashboardNavbarDesktop from "./DashboardNavbarDesktop";
import { Flex } from "@mantine/core";

interface DashboardNavbarProps {
  children: React.ReactNode;
}

const DashboardNavbar: React.FC<DashboardNavbarProps> = ({ children }) => {
  const isMobile = useMediaQuery("(max-width: 800px)");

  return (
    <Flex gap={24}>
      {isMobile ? <MobileDashboardNavbar /> : <DashboardNavbarDesktop />}
      {children}
    </Flex>
  );
};

export default DashboardNavbar;
