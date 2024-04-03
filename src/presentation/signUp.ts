import { HTTPRequest, HTTPResponse } from "./interfaces/http";
import { ParamsIsMissing } from "./helpers/excepetions";
import { HTTPBadRequest } from "./helpers/httpCode";

export class SignUpController {
  handle(request: HTTPRequest): HTTPResponse {
    const requiredParams = ["email", "password"];
    for (const field of requiredParams) {
      if (!request.body[field]) {
        return HTTPBadRequest(new ParamsIsMissing(field));
      }
    }
  }
}
