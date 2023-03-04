import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { useDashboardNavbarStyles } from "./DashboardNavbar.styles";
import { ActionIcon, Drawer } from "@mantine/core";
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
        onClick={open}
        color="cyan"
        size="lg"
        variant="filled"
      >
        <Menu2 />
      </ActionIcon>
      <Drawer withCloseButton={false} opened={opened} onClose={close}>
        <div {...handlers}>
          <DashboardNavbar />
        </div>
      </Drawer>
    </>
  );
};

export default MobileDashboardNavbar;
