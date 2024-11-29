import { createResponse, Logger, RequestBodySchema } from "./helpers/utils.js";
import {
  HTTP_CONTENT_TYPES,
  HTTP_REQUEST_STATUS,
  HTTP_STATUS_CODES,
} from "./helpers/constants.js";
import { validateConfluenceWiki } from "./helpers/jsonToConfluenceWiki.js";
import { createPage } from "./helpers/confluence.js";

/**
 * @typedef {import('src/helpers/types.d.ts').CreatePageRequest} CreatePageRequest
 */

/**
 * @param {import('@forge/api').WebTriggerRequest} event
 * @param {import('@forge/api').WebTriggerContext} context
 * @returns {Promise<import('@forge/api').WebTriggerResponse>}
 */
export async function runAsync(event, context) {
  Logger.info(`Event: ${JSON.stringify(event)}`);

  if (event.method !== "POST") {
    return createResponse(
      HTTP_STATUS_CODES.METHOD_NOT_ALLOWED,
      undefined,
      "Method Not Allowed",
    );
  }

  try {
    /**
     * @type {CreatePageRequest}
     */
    const body = JSON.parse(event.body);

    // Validate the request body
    const response = RequestBodySchema.safeParse(body);

    if (!response.success) {
      return createResponse(
        HTTP_STATUS_CODES.BAD_REQUEST,
        { "Content-Type": [HTTP_CONTENT_TYPES.APPLICATION_JSON] },
        JSON.stringify({
          status: HTTP_REQUEST_STATUS.FAILED,
          error: response.error,
        }),
      );
    }

    // Validate the Page Body
    const pageBodyValidationResponse = validateConfluenceWiki(body.page);
    if (!pageBodyValidationResponse.success) {
      return createResponse(
        HTTP_STATUS_CODES.BAD_REQUEST,
        { "Content-Type": [HTTP_CONTENT_TYPES.APPLICATION_JSON] },
        JSON.stringify({
          status: HTTP_REQUEST_STATUS.FAILED,
          error: pageBodyValidationResponse.error,
        }),
      );
    }

    Logger.info("Request Validated, Now Creating The Page");

    // Create the page
    const createPageResult = await createPage(
      body.page,
      body.title,
      body.spaceId,
      body.parentId,
    );

    return createResponse(
      HTTP_STATUS_CODES.OK,
      { "Content-Type": [HTTP_CONTENT_TYPES.APPLICATION_JSON] },
      JSON.stringify({
        status: HTTP_REQUEST_STATUS.SUCCESS,
        message: createPageResult,
      }),
    );
  } catch (e) {
    return createResponse(
      HTTP_STATUS_CODES.BAD_REQUEST,
      { "Content-Type": [HTTP_CONTENT_TYPES.APPLICATION_JSON] },
      JSON.stringify({
        status: HTTP_REQUEST_STATUS.FAILED,
        error: e.message,
      }),
    );
  }
}
