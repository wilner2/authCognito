import { SignUpController } from "@/presentation/signUp";

describe("signUp Controller", () => {
  test("should return 400 if no email is provided", () => {
    const sut = new SignUpController();
    const request = {
      password: "any_password",
      confirmPassword: "any_password",
    };

    const response = sut.handle(request);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(new Error("Missing param: email"));
  });
});
