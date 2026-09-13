import { useState } from "react";
import { useRouter } from "expo-router";
import dayjs, { Dayjs } from "dayjs";
import { Pressable, ScrollView, Text, View } from "react-native";

import { CreateBookingCommand } from "src/api";
import { bookingsApi } from "src/apis";
import { Screen } from "src/components/nav/Screen";
import {
  Button,
  Select,
  SelectItem,
  TextField,
  Typography,
} from "src/components/ui";
import { required, useForm } from "src/core/forms";
import { Validator } from "src/core/forms/types";
import { CacheKeyEnum, useMutation, useQueryClient } from "src/core/query";
import { useSnackbar } from "src/core/snackbar";
import { useTheme } from "src/core/theme";
import { getDateGrid } from "src/features/bookings/utils";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const ARRIVAL_TIMES: SelectItem[] = [
  { label: "9:00", value: "9" },
  { label: "12:00", value: "12" },
  { label: "15:00", value: "15" },
];

interface BookingFormValues {
  name: string;
  description: string;
}

function optional<T>(): Validator<T> {
  return () => false;
}

interface BookingDateCellProps {
  isSelected: boolean;
  onPress: () => void;
  value: Dayjs;
}

function BookingDateCell({ isSelected, onPress, value }: BookingDateCellProps) {
  const theme = useTheme();

  const isDisabled = value.isBefore(dayjs(), "day");
  const backgroundColor = isDisabled
    ? theme.darkmode
      ? "#303030"
      : "#9e9e9e"
    : isSelected
      ? theme.palette.primary
      : theme.palette.success;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => ({
        alignItems: "center",
        backgroundColor,
        borderRadius: 4,
        flex: 1,
        height: 36,
        justifyContent: "center",
        opacity: pressed ? 0.7 : 1,
      })}
    >
      <Text
        style={{
          color:
            isDisabled || !isSelected ? theme.palette.text.primary : "#ffffff",
          fontSize: 14,
        }}
      >
        {value.format("DD")}
      </Text>
    </Pressable>
  );
}

export default function CreateBookingPage() {
  const router = useRouter();
  const theme = useTheme();
  const snackbar = useSnackbar();
  const queryClient = useQueryClient();

  const form = useForm<BookingFormValues>(
    { name: "", description: "" },
    {
      name: required<BookingFormValues>(),
      description: optional<BookingFormValues>(),
    },
  );

  const [selectedDate, setSelectedDate] = useState<Dayjs | undefined>(
    undefined,
  );
  const [time, setTime] = useState<string>("");

  const { mutate, isPending } = useMutation({
    mutationFn: (command: CreateBookingCommand) =>
      bookingsApi.createBooking({ createBookingCommand: command }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CacheKeyEnum.BookingList] });
      snackbar.success("Booking created");
      router.replace("/bookings");
    },
    onError: () => {
      snackbar.error("Unable to create booking");
    },
  });

  const daysInMonth = getDateGrid();

  function handleBook(): void {
    if (!selectedDate || !time) {
      return;
    }

    const { data, isValid } = form.validate();

    if (!isValid) {
      return;
    }

    const startTime = selectedDate
      .hour(parseInt(time, 10))
      .minute(0)
      .second(0)
      .millisecond(0)
      .toDate();
    const endTime = dayjs(startTime).add(1, "hour").toDate();

    mutate({
      name: data.name,
      description: data.description,
      startTime,
      endTime,
    });
  }

  return (
    <Screen navBackTo="/bookings" title="Create booking">
      <ScrollView style={{ flex: 1 }}>
        <View style={{ gap: 16, padding: theme.spacing(2) }}>
          <TextField
            error={form.state.name.error}
            label="Name"
            onValueChange={(value) => form.setValue({ name: value })}
            value={form.state.name.value}
          />
          <TextField
            label="Description"
            multiline
            onValueChange={(value) => form.setValue({ description: value })}
            value={form.state.description.value}
          />

          <Typography variant="h5">Pick a date</Typography>

          <View style={{ flexDirection: "row", gap: 4 }}>
            {WEEKDAYS.map((weekday) => (
              <View key={weekday} style={{ alignItems: "center", flex: 1 }}>
                <Typography color="textSecondary" variant="body2">
                  {weekday}
                </Typography>
              </View>
            ))}
          </View>

          <View style={{ gap: 4 }}>
            {Object.entries(daysInMonth).map(([week, days]) => (
              <View key={week} style={{ flexDirection: "row", gap: 4 }}>
                {days.map((day) => (
                  <BookingDateCell
                    key={day.format("YYYY-MM-DD")}
                    isSelected={selectedDate?.isSame(day, "day") === true}
                    onPress={() => setSelectedDate(day)}
                    value={day}
                  />
                ))}
              </View>
            ))}
          </View>

          {selectedDate ? (
            <>
              <View style={{ paddingTop: 16 }}>
                <Typography variant="h5">Pick arrival time</Typography>
              </View>
              <Select
                items={ARRIVAL_TIMES}
                onValueChange={setTime}
                value={time}
              />
            </>
          ) : null}

          <Button
            color="primary"
            disabled={!selectedDate || !time || !form.state.name.value}
            loading={isPending}
            onPress={handleBook}
            variant="contained"
          >
            Book
          </Button>
        </View>
      </ScrollView>
    </Screen>
  );
}
