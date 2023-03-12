import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { useDashboardNavbarStyles } from "./DashboardNavbar.styles";
import { ActionIcon, Burger, Drawer } from "@mantine/core";
import { Menu2 } from "tabler-icons-react";
import DashboardNavbar from "./DashboardNavbarDesktop";
import { useSwipeable } from "react-swipeable";

const MobileDashboardNavbar: React.FC = () => {
  const { classes } = useDashboardNavbarStyles();
  const [opened, { open, close }] = useDisclosure(false);
  const handlers = useSwipeable({
    onSwipedLeft: close,
  });

  return (
    <>
      <ActionIcon
        className={classes.drawerButton}
        onClick={opened ? close : open}
        color="cyan"
        size="lg"
        variant="filled"
      >
        <Burger size="sm" color="white" opened={opened} />
      </ActionIcon>
      <Drawer
        withCloseButton={false}
        opened={opened}
        onClose={close}
        padding={0}
        transitionProps={{ duration: 300 }}
      >
        <div {...handlers}>
          <DashboardNavbar />
        </div>
      </Drawer>
    </>
  );
};

export default MobileDashboardNavbar;
