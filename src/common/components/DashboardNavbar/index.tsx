import React from "react";
import { useMediaQuery } from "@mantine/hooks";
import MobileDashboardNavbar from "./MobileDashboardNavbar";
import DashboardNavbarDesktop from "./DashboardNavbarDesktop";

const DashboardNavbar: React.FC = () => {
  const isMobile = useMediaQuery("(max-width: 800px)");
  return isMobile ? <MobileDashboardNavbar /> : <DashboardNavbarDesktop />;
};

export default DashboardNavbar;
