import dayjs from "dayjs";

interface Item {
  createdAt: string;
}

export const calculateMonthDiffPercentage = async (
  items: Item[]
): Promise<{ diffPercentage: number; count: number }> => {
  const currentMonth = dayjs();
  const prevMonth = currentMonth.subtract(1, "month");

  const prevMonthItems = items.filter((appointment) =>
    dayjs(appointment.createdAt).isSame(prevMonth, "month")
  );

  const currentMonthItems = items.filter((appointment) =>
    dayjs(appointment.createdAt).isSame(currentMonth, "month")
  );

  const prevMonthCount = prevMonthItems.length;
  const currentMonthCount = currentMonthItems.length;

  if (prevMonthCount === 0) {
    return {
      diffPercentage: 100,
      count: currentMonthCount,
    };
  }

  const diffPercentage =
    ((currentMonthCount - prevMonthCount) / prevMonthCount) * 100;

  return {
    diffPercentage: diffPercentage > 100 ? 100 : diffPercentage,
    count: currentMonthCount,
  };
};
