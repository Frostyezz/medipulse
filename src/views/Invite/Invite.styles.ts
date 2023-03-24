import { THEME } from "@/services/graphql/types/enums";
import { createStyles } from "@mantine/core";

export const useInviteStyles = createStyles((theme) => ({
  wrapper: {
    backgroundColor: theme.colorScheme === THEME.light ? "#ffffff" : "#141517",
    boxShadow:
      theme.colorScheme === THEME.light
        ? "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
        : "unset",
  },
}));
