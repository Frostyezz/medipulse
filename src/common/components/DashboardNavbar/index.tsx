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
      <div
        style={{
          padding: isMobile ? "60px 12px 40px 12px" : "50px 50px 50px 350px",
          width: "100%",
        }}
      >
        {children}
      </div>
    </Flex>
  );
};

export default DashboardNavbar;
