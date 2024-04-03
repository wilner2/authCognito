import { HTTPResponse } from "../interfaces/http";

export const HTTPBadRequest = (error: Error): HTTPResponse => {
  return { statusCode: 400, body: error };
};
