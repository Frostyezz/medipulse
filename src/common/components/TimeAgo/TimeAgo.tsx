import React from "react";
import { Text, TextProps } from "@mantine/core";
import { useAppSelector } from "@/services/redux/hooks";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/en";
import "dayjs/locale/ro";

dayjs.extend(relativeTime);

const TimeAgo: React.FC<TextProps & { date: string }> = ({
  date,
  ...props
}) => {
  const language = useAppSelector((store) => store.user.language);
  dayjs.locale(language);

  return <Text {...props}>{dayjs().to(dayjs(new Date(Number(date))))}</Text>;
};

export default TimeAgo;
