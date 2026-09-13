import { parseBearerToken, verifyAccessToken } from "./access-token";

describe("parseBearerToken", () => {
  it("extracts a bearer token", () => {
    expect(parseBearerToken("Bearer abc.def.ghi")).toBe("abc.def.ghi");
  });

  it("is case-insensitive about the scheme", () => {
    expect(parseBearerToken("bearer abc")).toBe("abc");
  });

  it("rejects non-bearer schemes", () => {
    expect(parseBearerToken("Basic dXNhb2F0")).toBeUndefined();
  });

  it("handles missing headers", () => {
    expect(parseBearerToken()).toBeUndefined();
    expect(parseBearerToken("")).toBeUndefined();
  });
});

function mockFetchResponse(status: number, body: unknown): jest.Mock {
  return jest.fn().mockResolvedValue({
    ok: status >= 200 && status < 300,
    json: async () => body,
  });
}

describe("verifyAccessToken", () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("returns the user id for a valid token", async () => {
    globalThis.fetch = mockFetchResponse(200, {
      session: { userId: "user-1" },
      status: "OK",
    });

    expect(await verifyAccessToken("abc")).toBe("user-1");
  });

  it("denies when the core rejects the token", async () => {
    globalThis.fetch = mockFetchResponse(401, { status: "UNAUTHORISED" });

    expect(await verifyAccessToken("stale")).toBeUndefined();
  });

  it("denies when the core is unreachable", async () => {
    globalThis.fetch = jest.fn().mockRejectedValue(new Error("refused"));

    expect(await verifyAccessToken("abc")).toBeUndefined();
  });

  it("denies malformed responses", async () => {
    globalThis.fetch = mockFetchResponse(200, { status: "OK" });

    expect(await verifyAccessToken("abc")).toBeUndefined();
  });
});
