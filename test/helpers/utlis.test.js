import {
  createResponse,
  RequestBodySchema,
  hashify,
} from "../../src/helpers/utils.js";
import { HTTP_STATUS_CODES } from "../../src/helpers/constants.js";

describe("Function: hashify", () => {
  it("Should Create Unique Hash for a String, and the function should return the same value always", () => {
    const hash1 = hashify("Hello World");
    const hash2 = hashify("Hello World");
    expect(hash1).toBe(hash2);
  });

  it("Should Create different Hash values for a Strings, no matter how similar they are", () => {
    const hash1 = hashify(" Hello World ");
    const hash2 = hashify("Hello World");
    expect(hash1).not.toBe(hash2);
  });
});

describe("Function: createResponse", () => {
  it("Should Valid Respons object all paramers are supplied", () => {
    const response = {
      statusCode: HTTP_STATUS_CODES.OK,
      headers: { "Content-Type": "application/json" },
      body: "Page Created Successfully",
    };
    expect(
      createResponse(response.statusCode, response.headers, response.body),
    ).toStrictEqual(response);
  });

  it("Should Throw Exception if Invalid Code is provided", () => {
    const response = {
      statusCode: HTTP_STATUS_CODES.OK,
      headers: { "Content-Type": "application/json" },
      body: "Page Created Successfully",
    };
    expect(() =>
      createResponse(999, response.headers, response.body),
    ).toThrowError();
  });
});
