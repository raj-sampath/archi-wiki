import { validateConfluenceWiki } from "../../src/helpers/jsonToConfluenceWiki.js";

describe("Function: validateConfluenceWiki", () => {
  it("Should return False if at Page Object Is Empty and there should be an Error Object", () => {
    expect(validateConfluenceWiki([]).success).toBe(false);
    expect(validateConfluenceWiki([]).error).toBeDefined();
  });

  it("Should return False if a non standard element is used", () => {
    expect(
      validateConfluenceWiki([{ random: "Some Random Value" }]).success,
    ).toBe(false);
  });

  it("Should return True if at least one Standard Value is used", () => {
    expect(validateConfluenceWiki([{ p: "Some Random Value" }]).success).toBe(
      true,
    );
  });

  it("Should return False if a Table is present and there are no Headers and Rows", () => {
    expect(validateConfluenceWiki([{ table: {} }]).success).toBe(false);
  });

  it("Should return False if a Table is present and there are Headers but no Rows", () => {
    expect(
      validateConfluenceWiki([
        {
          table: {
            headers: ["Column 1"],
          },
        },
      ]).success,
    ).toBe(false);
  });

  it("Should return True if a Table is present and there is at least one Header and Row", () => {
    expect(
      validateConfluenceWiki([
        {
          table: {
            headers: ["Column 1"],
            rows: [["Row 1"]],
          },
        },
      ]).success,
    ).toBe(true);
  });
});
