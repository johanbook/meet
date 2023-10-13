import type { Meta, StoryObj } from "@storybook/react";

import { JournalEntryDetails } from "src/api";

import { JournalPageComponent } from "./JournalPage.component";

const JOURNAL_ENTRIES: JournalEntryDetails[] = [
  {
    commandName: "Did the thing",
    created: new Date("2020"),
    payload: {},
  },
  {
    commandName: "Did the thing again",
    created: new Date("2020"),
    payload: {},
  },
];

export default {
  title: "Pages/Journal/View",
  component: JournalPageComponent,
} as Meta;

type Story = StoryObj<typeof JournalPageComponent>;

export const Default: Story = {
  args: {
    data: JOURNAL_ENTRIES,
  },
};
