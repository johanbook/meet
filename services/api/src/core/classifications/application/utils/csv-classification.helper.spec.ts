import { getCategoryAndLocaleFromPath } from "./csv-classification.helper";

describe(getCategoryAndLocaleFromPath.name, () => {
  it("parses path correctly", () => {
    const { category, locale } = getCategoryAndLocaleFromPath(
      "/my-folder/my-category_en-US.csv",
    );
    expect(category).toBe("my-category");
    expect(locale).toBe("en-US");
  });
});
