import { describe, expect, it } from "vitest";

import { getValidatedRedirectPath } from "./auth";

describe("getValidatedRedirectPath", () => {
  it("returns the path if it is a valid relative path starting with a single slash", () => {
    expect(getValidatedRedirectPath("/dashboard")).toBe("/dashboard");
    expect(getValidatedRedirectPath("/profile/settings")).toBe(
      "/profile/settings",
    );
  });

  it('returns "/" if the path is empty or not provided', () => {
    expect(getValidatedRedirectPath("")).toBe("/");
    expect(getValidatedRedirectPath(undefined as unknown as string)).toBe("/");
  });

  it('returns "/" if the path starts with double slashes (to prevent open redirect)', () => {
    expect(getValidatedRedirectPath("//malicious.com")).toBe("/");
    expect(getValidatedRedirectPath("///triple")).toBe("/");
  });

  it('returns "/" if the path does not start with a slash', () => {
    expect(getValidatedRedirectPath("dashboard")).toBe("/");
    expect(getValidatedRedirectPath("https://malicious.com")).toBe("/");
  });
});
