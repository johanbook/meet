import type { Meta } from "@storybook/react";

import { MatchDetails } from "src/api";

import { MatchesPageDataView } from "./views/MatchesPageData.view";
import { MatchesPageErrorView } from "./views/MatchesPageError.view";
import { MatchesPageLoadingView } from "./views/MatchesPageLoading.view";

const MATCHES_DATA: MatchDetails[] = [
  {
    name: "John",
    profileId: 1,
    lastMessage: "hi",
  },

  {
    name: "Eric",
    profileId: 2,
    lastMessage: "hi",
  },

  {
    name: "Dalene",
    profileId: 3,
    lastMessage: "hi",
  },
];

export default {
  title: "Pages/Matches/Views",
} as Meta;

export const Error = {
  render: () => <MatchesPageErrorView error={"hi" as unknown as Error} />,
};

export const Loading = {
  render: () => <MatchesPageLoadingView />,
};

export const MultipleMatches = {
  render: () => (
    <MatchesPageDataView data={{ notTalkedTo: MATCHES_DATA, talkedTo: [] }} />
  ),
};

export const MultipleMessages = {
  render: () => (
    <MatchesPageDataView data={{ notTalkedTo: [], talkedTo: MATCHES_DATA }} />
  ),
};

export const MultipleMatchesAndMultipleMessages = {
  render: () => (
    <MatchesPageDataView
      data={{ notTalkedTo: MATCHES_DATA, talkedTo: MATCHES_DATA }}
    />
  ),
};
