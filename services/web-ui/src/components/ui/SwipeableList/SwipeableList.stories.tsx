import { Card, CardContent, Container, Typography } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react";

import { SwipeableList } from ".";

export default {
  title: "UI/SwipeableList",
  component: SwipeableList,
} as Meta;

type Story = StoryObj<typeof SwipeableList>;

export const Primary: Story = {
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
    onSwipeLeft: () => alert("Left swipe"),
    onSwipeRight: () => alert("Left swipe"),
    onRequestData: () => Promise.resolve(["New-item-1"]),
  },
};
