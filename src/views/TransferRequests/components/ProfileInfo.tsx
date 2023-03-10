import TimeAgo from "@/common/components/TimeAgo/TimeAgo";
import { Profile } from "@/services/graphql/schemas/profile.schema";
import { ROLES } from "@/services/graphql/types/enums";
import { createStyles, Avatar, Text, Group, Flex } from "@mantine/core";
import { useTranslation } from "react-i18next";

const useStyles = createStyles((theme) => ({
  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[5],
  },

  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

const ProfileInfo: React.FC<Partial<Profile>> = ({
  avatar,
  firstName,
  lastName,
  createdAt,
  role,
}) => {
  const { classes } = useStyles();
  const { t } = useTranslation();

  return (
    <div>
      <Group noWrap>
        <Avatar src={avatar} size={94} radius="md" />
        <div>
          <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
            {t(`roles.${role}`)}
          </Text>

          <Text fz="lg" fw={500} className={classes.name}>
            {role === ROLES.MEDIC && "Dr."} {[firstName, lastName].join(" ")}
          </Text>

          <Group noWrap spacing={10} mt={3}>
            <Text fz="xs" c="dimmed">
              <Flex gap={4}>
                {t("joined")} <TimeAgo date={createdAt ?? ""} />
              </Flex>
            </Text>
          </Group>
        </div>
      </Group>
    </div>
  );
};

export default ProfileInfo;
