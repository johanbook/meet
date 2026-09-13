import dayjs from "dayjs";

import { Pressable, View } from "react-native";

import { Typography } from "../Typography/Typography";

export interface DateRange {
  from: Date;
  to: Date;
}

export const DATE_SHORTCUTS: Record<string, DateRange> = {
  LastWeek: {
    from: dayjs().subtract(1, "week").toDate(),
    to: dayjs().toDate(),
  },
  LastMonth: {
    from: dayjs().subtract(1, "month").toDate(),
    to: dayjs().toDate(),
  },
  LastYear: {
    from: dayjs().subtract(1, "year").toDate(),
    to: dayjs().toDate(),
  },
};

interface DateRangePickerProps {
  onValueChange: (value: DateRange) => void;
  value: DateRange;
}

function formatRange(range: DateRange): string {
  return `${dayjs(range.from).format("YYYY-MM-DD")} - ${dayjs(range.to).format("YYYY-MM-DD")}`;
}

export function DateRangePicker({
  onValueChange,
  value,
}: DateRangePickerProps) {
  return (
    <View>
      <Typography color="textSecondary" variant="caption">
        {formatRange(value)}
      </Typography>
      {Object.entries(DATE_SHORTCUTS).map(([label, range]) => (
        <Pressable
          accessibilityRole="button"
          key={label}
          onPress={() => onValueChange(range)}
          style={({ pressed }) => ({
            borderColor: "#00000022",
            borderRadius: 16,
            borderWidth: 1,
            margin: 4,
            opacity: pressed ? 0.7 : 1,
            paddingHorizontal: 12,
            paddingVertical: 6,
          })}
        >
          <Typography color="textSecondary" variant="body2">
            {label}
          </Typography>
        </Pressable>
      ))}
    </View>
  );
}