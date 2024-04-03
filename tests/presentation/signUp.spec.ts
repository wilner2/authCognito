import { SignUpController } from "@/presentation/signUp";
import { ParamsIsMissing } from "@/presentation/helpers/excepetions";

describe("signUp Controller", () => {
  test("should return 400 if no email is provided", () => {
    const sut = new SignUpController();
    const request = {
      body: {
        password: "any_password",
        confirmPassword: "any_password",
      },
    };

    const response = sut.handle(request);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(new ParamsIsMissing("email"));
  });

  test("should return 400 if no password is provided", () => {
    const sut = new SignUpController();
    const request = {
      body: {
        email: "any_email@email.com",
        confirmPassword: "any_password",
      },
    };

    const response = sut.handle(request);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(new ParamsIsMissing("password"));
  });
});
