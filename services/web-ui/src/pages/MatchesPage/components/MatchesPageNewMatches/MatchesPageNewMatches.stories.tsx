import type { Meta, StoryObj } from "@storybook/react";

import { MatchesPageNewMatches } from ".";

export default {
  title: "MatchesPage/MatchesPageNewMatches",
  component: MatchesPageNewMatches,
} as Meta;

type Story = StoryObj<typeof MatchesPageNewMatches>;

export const Default: Story = {
  args: {
    matches: [
      {
        name: "John",
        profileId: 1,
      },
      {
        name: "Doe",
        profileId: 2,
      },
      {
        name: "Boe",
        profileId: 3,
      },
    ],
  },
};
