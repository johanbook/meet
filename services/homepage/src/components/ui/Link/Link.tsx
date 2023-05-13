import React from "react";
import { Link, LinkProps, useSearchParams } from "react-router-dom";

export default function LinkWrapper({
  to,
  ...props
}: LinkProps): React.ReactElement {
  const searchParams = useSearchParams()[0];

  const href = `${to}?${searchParams.toString()}`;

  return <Link to={href} {...props} />;
}
