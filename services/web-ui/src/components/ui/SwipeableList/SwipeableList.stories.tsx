import { Card, CardContent, Container, Typography } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { SwipeableList } from ".";

export default {
  title: "Core/SwipeableList",
  component: SwipeableList,
} as Meta;

type Story = StoryObj<typeof SwipeableList>;

export const Default: Story = {
  args: {
    children: ({ data }: any) => (
      <Container maxWidth="md">
        <Card>
          <CardContent>
            <Typography>{data}</Typography>
          </CardContent>
        </Card>
      </Container>
    ),
    data: ["Item-1", "Item-2", "Item-3", "Item-4", "Item-5"],
    getItemId: (item: any) => item,
    onSwipeLeft: () => console.log("Left swipe"),
    onSwipeRight: () => console.log("Right swipe"),
    onRequestData: () =>
      Promise.resolve([
        "New-item-1",
        "New-item-2",
        "New-item-3",
        "New-item-4",
        "New-item-5",
      ]),
  },
};
