import { HTTP_STATUS_CODES } from "./constants.js";
import winston, { format } from "winston";
const { timestamp, prettyPrint, json, label } = format;
import { z } from "zod";

/**
 * Creates an Instance of Windston Logger
 * The logger is configured to log in JSON format, with a timestamp and a label archi-wiki
 * @type {winston.Logger}
 */
export const Logger = winston.createLogger({
  level: "info",
  format: format.combine(
    timestamp(),
    prettyPrint(),
    label({ label: "archi-wiki" }),
    json(),
  ),
  transports: [new winston.transports.Console()],
});

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
