import api, { route } from "@forge/api";
import jsonToConfluenceWiki from "./jsonToConfluenceWiki.js";

/**
 * @typedef {import('src/helpers/types.d.ts').Page} Page
 */

/**
 * @param {string} title
 * @param {string} spaceId
 * @param {string} parentId
 * @param {Page} page
 * @returns {Promise<{error}|any>}
 */

export async function createPage(page, title, spaceId, parentId) {
  const body = JSON.stringify({
    spaceId,
    status: "current",
    title,
    parentId,
    body: {
      representation: "wiki",
      value: jsonToConfluenceWiki(page),
    },
  });

  console.log(JSON.stringify(body, null, 2));

  try {
    const response = await api
      .asApp()
      .requestConfluence(route`/wiki/api/v2/pages?root-level=false`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body,
      });

    console.log(`Response: ${response.status} ${response.statusText}`);
    return await response.json();
  } catch (e) {
    return {
      error: e,
    };
  }
}
