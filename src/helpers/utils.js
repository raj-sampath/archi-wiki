import { HTTP_STATUS_CODES } from "./constants.js";
import { z } from "zod";
import crypto from "crypto";

/**
 *
 * @param statusCode {number}
 * @param headersValues {{[key: string]: any}}
 * @param body {any}
 * @returns {{headers, body, statusCode}}
 */

export function createResponse(statusCode, headersValues = {}, body) {
  if (Object.values(HTTP_STATUS_CODES).indexOf(statusCode) === -1) {
    throw new Error(`Invalid status code: ${statusCode}`);
  }

  return {
    statusCode,
    headers: headersValues,
    body,
  };
}

export const RequestBodySchema = z.object({
  parentId: z.string().min(1),
  spaceId: z.string().min(1),
  title: z.string().min(3),
  page: z.array(z.object({})).min(1),
});

/**
 *
 * @param value { Object }
 * @returns {string}
 */
export function hashify(value) {
  return crypto.createHash("md5").update(value).digest("hex");
}
