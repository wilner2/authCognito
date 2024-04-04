import { HTTPResponse } from "../interfaces/http";

export const HTTPBadRequest = (error: Error): HTTPResponse => {
  return { statusCode: 400, body: error };
};

export const HTTPInternalError = (error: Error): HTTPResponse => {
  return { statusCode: 500, body: error };
};

export const OK = (msg: any): HTTPResponse => {
  return { statusCode: 200, body: msg };
};
