import { HTTPRequest, HTTPResponse } from "./interfaces/http";
import { ParamsIsMissing } from "./helpers/excepetions";
import { HTTPBadRequest, HTTPInternalError, OK } from "./helpers/httpCode";
import { Authentication } from "@/domain/contracts/authentication";

export class SignUpController {
  constructor(private authentication: Authentication) {}
  async handle(request: HTTPRequest): Promise<HTTPResponse> {
    const requiredParams = ["email", "password"];
    for (const field of requiredParams) {
      if (!request.body[field]) {
        return HTTPBadRequest(new ParamsIsMissing(field));
      }
    }
    try {
      await this.authentication.execute(request.body);

      return OK(`User ${request.body.email} created successfully`);
    } catch (error) {
      return HTTPInternalError(error);
    }
  }
}
