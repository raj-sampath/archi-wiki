import { z } from "zod";

/**
 * @typedef {import('src/helpers/types.d.ts').Page} Page
 */

/**
 * Converts an array of JSON components into Confluence Wiki Markup.
 * @param {Page} components - Array of JSON objects representing the components.
 * @returns {string} - The resulting Confluence Wiki Markup string.
 */

export default function jsonToConfluenceWiki(components) {
  return components
    .map((component) => {
      const [type, content] = Object.entries(component)[0];
      switch (type) {
        case "h1":
          return `h1. ${content}`;
        case "h2":
          return `h2. ${content}`;
        case "h3":
          return `h3. ${content}`;
        case "h4":
          return `h4. ${content}`;
        case "h5":
          return `h5. ${content}`;
        case "h6":
          return `h6. ${content}`;
        case "p":
          return `${content}`;
        case "ul":
          return content.map((item) => `* ${item}`).join("\n");
        case "ol":
          return content.map((item) => `# ${item}`).join("\n");
        case "table":
          const headers = content.headers
            .map((header) => `||${header}||`)
            .join("");
          const rows = content.rows
            .map((row) => `|${row.join("|")}|`)
            .join("\n");
          return `${headers}\n${rows}`;
        case "code":
          return `{code:${content.language}}\n${content.code}\n{code}`;
        default:
          return "";
      }
    })
    .join("\n\n");
}

/**
 * Validates the Page Object
 * @param {{[type: string]: any}[]} page - Array of JSON objects representing the components.
 * @returns {import("zod").SafeParseReturnType} - Is the Page Object Valid
 */

export function validateConfluenceWiki(page) {
  const schema = z
    .array(
      z
        .object({
          h1: z.string().optional(),
          h2: z.string().optional(),
          h3: z.string().optional(),
          h4: z.string().optional(),
          h5: z.string().optional(),
          h6: z.string().optional(),
          p: z.string().optional(),
          ul: z.array(z.string()).min(1).optional(),
          ol: z.array(z.string()).min(1).optional(),
          table: z
            .object({
              headers: z.array(z.string()),
              rows: z.array(z.array(z.string())),
            })
            .optional(),
          code: z.object({ language: z.string(), code: z.string() }).optional(),
        })
        .strict()
        .refine((obj) => Object.entries(obj).length !== 1, {
          message: "Only one Confluence Attribute is allowed per row",
        }),
    )
    .min(1);

  return schema.safeParse(page);
}
