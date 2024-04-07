import { HTTPResponse } from "../interfaces/http";
import { ParamsIsMissing } from "../helpers/excepetions";
import { HTTPBadRequest, HTTPInternalError, OK } from "../helpers/httpCode";
import { Authentication } from "@/domain/contracts/authentication";

export class SignUpController {
  constructor(private authentication: Authentication) {}
  async handle(request: any): Promise<HTTPResponse> {
    const requiredParams = ["email", "password", "userName"];
    for (const field of requiredParams) {
      if (!request[field]) {
        return HTTPBadRequest(new ParamsIsMissing(field));
      }
    }
    try {
      await this.authentication.execute(request);

      return OK(`User ${request.email} created successfully`);
    } catch (error) {
      return HTTPInternalError(error);
    }
  }
}
