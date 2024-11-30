import api, { route, storage } from "@forge/api";
import jsonToConfluenceWiki from "./jsonToConfluenceWiki.js";
import { hashify } from "./utils.js";

/**
 * @typedef {import('src/helpers/types.d.ts').Page} Page
 * @typedef {import('src/helpers/types.d.ts').ConfulencePageCreateResponse} ConfulencePageCreateResponse
 * @typedef {import('@forge/api').ListResult} ListResult
 */

/**
 * @param {string} title
 * @param {string} spaceId
 * @param {string} parentId
 * @param {Page} page
 * @returns {Promise<{error}|any>}
 */

let PAGE_CREATE_METHOD = "POST";

export async function createPage(page, title, spaceId, parentId) {
  const key = `${parentId}-${title}`;
  const now = new Date().toJSON();

  // Check if the page already exists

  /**
   * @type {import('src/helpers/types.d.ts').KeyValueStorage}
   */

  const existingPage = await storage.get(key);

  const body = JSON.stringify({
    id: existingPage ? existingPage.pageId : undefined,
    spaceId,
    status: "current",
    title,
    parentId,
    body: {
      representation: "wiki",
      value: jsonToConfluenceWiki(page),
    },
    version: existingPage
      ? {
          number: existingPage.version + 1,
          message: `Updated on ${now}`,
        }
      : undefined,
  });

  if (existingPage) {
    const newHash = hashify(JSON.stringify({ title, page, spaceId, parentId }));
    const { hash, date, wiki, pageId: currentPageId } = existingPage;

    // No Change in the Page
    if (newHash === hash) {
      console.log("No Changes Detected");
      return `No Changes Detected on Page ${title} created on ${date}`;
    }

    console.log("Changes Detected");

    // Changes Detected
    const childBody = JSON.stringify({
      spaceId,
      status: "current",
      title: date,
      parentId: currentPageId,
      body: {
        representation: "wiki",
        value: wiki,
      },
    });

    const childBodyResponse = await api
      .asApp()
      .requestConfluence(route`/wiki/api/v2/pages?root-level=false`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: childBody,
      });

    /**
     * @type {ConfulencePageCreateResponse}
     */
    const childBodyResponseJson = await childBodyResponse.json();

    if (childBodyResponseJson.errors) {
      throw new Error(
        childBodyResponseJson.errors.map((e) => e.title).join(", "),
      );
    }

    PAGE_CREATE_METHOD = "PUT";
  }

  console.log(JSON.stringify(body, null, 2));

  let response;

  if (PAGE_CREATE_METHOD === "PUT") {
    response = await api
      .asApp()
      .requestConfluence(route`/wiki/api/v2/pages/${existingPage.pageId}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body,
      });
  } else {
    response = await api
      .asApp()
      .requestConfluence(route`/wiki/api/v2/pages?root-level=false`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body,
      });
  }

  console.log(`Response: ${response.status} ${response.statusText}`);

  /**
   * @type {ConfulencePageCreateResponse}
   */
  const pageCreationResponse = await response.json();

  console.log(
    `Page Creation Response: ${JSON.stringify(pageCreationResponse, null, 2)}`,
  );

  if (pageCreationResponse.errors) {
    throw new Error(pageCreationResponse.errors.map((e) => e.title).join(", "));
  }

  await storage.set(key, {
    hash: hashify(JSON.stringify({ title, page, spaceId, parentId })),
    date: now,
    pageId: pageCreationResponse.id,
    wiki: jsonToConfluenceWiki(page),
    version: pageCreationResponse.version.number,
  });

  return pageCreationResponse;
}

/**
 * @returns {Promise<ListResult>}
 */
export async function getStorageContents() {
  console.log("In Storage Function - Confluence.js");
  return await storage.query().limit(20).getMany();
}
