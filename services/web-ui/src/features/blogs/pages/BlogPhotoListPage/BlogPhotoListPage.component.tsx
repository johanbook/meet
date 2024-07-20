import { Fragment, ReactElement } from "react";

import { ImageList, ImageListItem, Typography } from "@mui/material";

import { BlogPhotoDetails } from "src/api";

function groupDataByDate(
  data: BlogPhotoDetails[]
): Record<string, BlogPhotoDetails[]> {
  const result: Record<string, BlogPhotoDetails[]> = {};

  for (const item of data) {
    const date = item.createdAt.toDateString();

    if (!(date in result)) {
      result[date] = [];
    }

    result[date].push(item);
  }

  return result;
}

interface GroupProps {
  data: BlogPhotoDetails[];
}

function Group({ data }: GroupProps): ReactElement {
  const groupedData = groupDataByDate(data);

  return (
    <>
      {Object.entries(groupedData).map(([date, entries]) => (
        <Fragment key={date}>
          <Typography sx={{ px: 1, pt: 3, pb: 1 }} variant="body1">
            <b>{date}</b>
          </Typography>

          <ImageList cols={3} gap={8} sx={{ m: 0 }} variant="masonry">
            {entries.map((item) => (
              <ImageListItem key={item.id}>
                <img src={item.url} loading="lazy" />
              </ImageListItem>
            ))}
          </ImageList>
        </Fragment>
      ))}
    </>
  );
}

interface BlogPhotoListPageComponentProps {
  data: BlogPhotoDetails[][];
}

export function BlogPhotoListPageComponent({
  data,
}: BlogPhotoListPageComponentProps): ReactElement {
  return (
    <>
      {data.map((group, groupIndex) => (
        <Group data={group} key={groupIndex} />
      ))}
    </>
  );
}
