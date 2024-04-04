import { SignUpController } from "@/presentation/controllers/signUp";
import { ParamsIsMissing } from "@/presentation/helpers/excepetions";
import { MockProxy, mock } from "jest-mock-extended";
import { Authentication } from "@/domain/contracts/authentication";

let sut: SignUpController;
let authenticationStub: MockProxy<Authentication>;

beforeAll(() => {
  authenticationStub = mock<Authentication>();
});

beforeEach(() => {
  sut = new SignUpController(authenticationStub);
});
describe("signUp Controller", () => {
  test("should return 400 if no email is provided", async () => {
    const request = {
      body: {
        password: "any_password",
        confirmPassword: "any_password",
        userName: "any_userName",
      },
    };

    const response = await sut.handle(request);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(new ParamsIsMissing("email"));
  });
  test("should return 400 if no userName is provided", async () => {
    const request = {
      body: {
        password: "any_password",
        confirmPassword: "any_password",
        email: "any_email@email.com",
      },
    };

    const response = await sut.handle(request);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(new ParamsIsMissing("userName"));
  });

  test("should return 400 if no password is provided", async () => {
    const request = {
      body: {
        email: "any_email@email.com",
        confirmPassword: "any_password",
        userName: "any_userName",
      },
    };

    const response = await sut.handle(request);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(new ParamsIsMissing("password"));
  });

  test("should return 200 if user created successfully", async () => {
    const request = {
      body: {
        email: "any_email@email.com",
        userName: "any_userName",
        password: "any_password",
        confirmPassword: "any_password",
      },
    };
    const response = await sut.handle(request);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      `User ${request.body.email} created successfully`
    );
  });

  test("should return 500 if internal error", async () => {
    authenticationStub.execute.mockRejectedValueOnce(new Error("Any error"));

    const request = {
      body: {
        email: "any_email@email.com",
        password: "any_password",
        userName: "any_userName",
        confirmPassword: "any_password",
      },
    };
    const response = await sut.handle(request);
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual(new Error("Any error"));
  });
});
