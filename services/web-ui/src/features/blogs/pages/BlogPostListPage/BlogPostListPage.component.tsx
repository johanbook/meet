import { Fragment, ReactElement } from "react";

import { BlogPostDetails } from "src/api";

import { BlogPost } from "../../components/BlogPost";

interface BlogPostPageComponentProps {
  data: BlogPostDetails[][];
}

export function BlogPostPageComponent({
  data,
}: BlogPostPageComponentProps): ReactElement {
  return (
    <>
      {data.map((group, groupIndex) => (
        <Fragment key={groupIndex}>
          {group.map((post) => (
            <BlogPost key={post.id} post={post} />
          ))}
        </Fragment>
      ))}
    </>
  );
}
