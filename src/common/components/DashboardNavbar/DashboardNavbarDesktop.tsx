import React from "react";
import { Navbar } from "@mantine/core";
import { useDashboardNavbarStyles } from "./DashboardNavbar.styles";
import Logo from "../Logo";
import DashboardLinks from "./DashboardLinks";
import DashboardProfileMenu from "./DashboardProfileMenu";

const DashboardNavbarDesktop: React.FC = () => {
  const { classes } = useDashboardNavbarStyles();

  return (
    <Navbar
      height={typeof window !== "undefined" ? window.innerHeight : "100vh"}
      width={{ sm: 300 }}
      p="md"
      className={classes.navbar}
    >
      <Navbar.Section mx="auto">
        <Logo width={120} height={120} textLogo />
      </Navbar.Section>

      <Navbar.Section grow mt="xl">
        <DashboardLinks />
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <DashboardProfileMenu />
      </Navbar.Section>
    </Navbar>
  );
};

export default DashboardNavbarDesktop;
