import jsonToConfluenceWiki, {
  validateConfluenceWiki,
} from "../../src/helpers/jsonToConfluenceWiki.js";

/**
 * @typedef {import('src/helpers/types.d.ts').Page} Page
 */

describe("Function: jsonToConfluenceWiki", () => {
  it("Should return Markdown Wiki for H1-H6 & P Elements", () => {
    const page = [
      { h1: "This is a Header" },
      { h2: "This is a Sub Header" },
      { h3: "This is a H3" },
      { h4: "This is a H4" },
      { h5: "This is a H5" },
      { h6: "This is a H6" },
      { p: "This is a P" },
    ];

    expect(jsonToConfluenceWiki(page)).toBe(
      "h1. This is a Header\n\nh2. This is a Sub Header\n\nh3. This is a H3\n\nh4. This is a H4\n\nh5. This is a H5\n\nh6. This is a H6\n\nThis is a P",
    );
  });

  it("Should return Markdown Wiki for OL Elements", () => {
    const page = [{ ol: ["Item 1", "Item 2", "Item 3"] }];
    expect(jsonToConfluenceWiki(page)).toBe("# Item 1\n# Item 2\n# Item 3");
  });

  it("Should return Markdown Wiki for UL Elements", () => {
    const page = [{ ul: ["Item 1", "Item 2", "Item 3"] }];
    expect(jsonToConfluenceWiki(page)).toBe("* Item 1\n* Item 2\n* Item 3");
  });

  it("Should return Markdown Wiki for Table", () => {
    const page = [
      {
        table: {
          headers: ["Key", "Value"],
          rows: [
            ["Viniger", "1"],
            ["Soya Sauce", "2"],
            ["Melon", "3"],
          ],
        },
      },
    ];
    expect(jsonToConfluenceWiki(page)).toBe(
      "||Key||||Value||\n|Viniger|1|\n|Soya Sauce|2|\n|Melon|3|",
    );
  });

  it("Should return Markdown Wiki for Code", () => {
    const page = [
      {
        code: {
          content: "js",
          code: "console.log('Hello World')",
        },
      },
    ];
    expect(jsonToConfluenceWiki(page)).toBe(
      "{code:js}\nconsole.log('Hello World')\n{code}",
    );
  });
});

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

  it("Should return False if more than one key is present in Page Element Row", () => {
    expect(
      validateConfluenceWiki([
        {
          h1: "This is a Header",
          table: {
            headers: ["Column 1"],
            rows: [["Row 1"]],
          },
        },
      ]).success,
    ).toBe(false);
  });

  it("Should return False if a blank Page Element Row is present in the Page Element Row", () => {
    expect(validateConfluenceWiki([{}]).success).toBe(false);
  });
});
