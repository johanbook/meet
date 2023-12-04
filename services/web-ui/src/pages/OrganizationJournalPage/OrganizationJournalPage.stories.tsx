import type { Meta, StoryObj } from "@storybook/react";

import { JournalEntryDetails } from "src/api";

import { OrganizationJournalPageComponent } from "./OrganizationJournalPage.component";

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
  title: "Pages/Organization/Journal",
  component: OrganizationJournalPageComponent,
} as Meta;

type Story = StoryObj<typeof OrganizationJournalPageComponent>;

export const Default: Story = {
  args: {
    data: JOURNAL_ENTRIES,
  },
};
