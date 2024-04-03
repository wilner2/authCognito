export class ParamsIsMissing extends Error {
  constructor(paramName: string) {
    super(`Params ${paramName} is missing`);
    this.name = "MissingParamError";
  }
}
