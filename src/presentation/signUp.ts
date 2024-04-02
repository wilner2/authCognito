export class SignUpController {
  handle(request: any): any {
    if (!request.email) {
      return {
        statusCode: 400,
        body: new Error("Missing param: email"),
      };
    }
  }
}
