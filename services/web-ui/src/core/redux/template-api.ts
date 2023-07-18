import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const templateApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: () => ({}),
});
