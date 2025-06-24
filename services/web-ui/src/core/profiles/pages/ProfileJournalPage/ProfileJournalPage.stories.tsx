import type { Meta, StoryObj } from "@storybook/react-vite";

import { JournalEntryDetails } from "src/api";

import { ProfileJournalPageComponent } from "./ProfileJournalPage.component";

const JOURNAL_ENTRIES: JournalEntryDetails[] = [
  {
    commandName: "Did the thing",
    createdAt: new Date("2020"),
    id: "1",
    payload: {},
    profile: {
      id: 1,
    },
  },
  {
    commandName: "Did the thing again",
    createdAt: new Date("2020"),
    id: "2",
    payload: {},
    profile: {
      id: 1,
    },
  },
];

export default {
  title: "Pages/Profile/Journal",
  component: ProfileJournalPageComponent,
} as Meta;

type Story = StoryObj<typeof ProfileJournalPageComponent>;

export const Default: Story = {
  args: {
    data: JOURNAL_ENTRIES,
  },
};
