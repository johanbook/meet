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
      name: "Erik",
      imageUrl: undefined,
    },
  },
  {
    commandName: "Did the thing again",
    createdAt: new Date("2020"),
    id: "2",
    payload: {},
    profile: {
      id: 1,
      name: "Johan",
      imageUrl:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.pexels.com%2Fphotos%2F45201%2Fkitty-cat-kitten-pet-45201.jpeg&f=1&nofb=1&ipt=54fe246cbebd9e63aa90e53ee71e647b3a337d8c3c5f1ac20eab33a04b1c7fb1&ipo=images",
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
