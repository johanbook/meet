import { useRouter } from "expo-router";
import { ScrollView } from "react-native";

import { bookingsApi } from "src/apis";
import { Screen } from "src/components/nav/Screen";
import { EmptyState, Fab, List, ListItem, ListItemText, Skeleton } from "src/components/ui";
import { CacheKeyEnum, useQuery } from "src/core/query";
import { ErrorView } from "src/views/ErrorView";

export default function BookingsPage() {
  const router = useRouter();

  const { data, error, isLoading } = useQuery({
    queryKey: [CacheKeyEnum.BookingList],
    queryFn: () => bookingsApi.getBookingList(),
  });

  const fab = (
    <Fab icon="calendarMonth" onPress={() => router.push("/bookings/create")} />
  );

  if (isLoading) {
    return (
      <Screen fab={fab} title="Bookings">
        <List>
          {[0, 1, 2].map((index) => (
            <ListItem key={index}>
              <Skeleton height={16} width="40%" />
              <Skeleton height={14} width="70%" />
            </ListItem>
          ))}
        </List>
      </Screen>
    );
  }

  if (error || !data) {
    return (
      <Screen fab={fab} title="Bookings">
        <ErrorView />
      </Screen>
    );
  }

  if (data.length === 0) {
    return (
      <Screen fab={fab} title="Bookings">
        <EmptyState message="You have no bookings" />
      </Screen>
    );
  }

  return (
    <Screen fab={fab} title="Bookings">
      <ScrollView style={{ flex: 1 }}>
        <List>
          {data.map((booking) => (
            <ListItem key={booking.id}>
              <ListItemText
                primary={booking.name}
                secondary={booking.description}
              />
            </ListItem>
          ))}
        </List>
      </ScrollView>
    </Screen>
  );
}