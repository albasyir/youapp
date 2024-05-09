const { generateApi } = require("swagger-typescript-api")
const { resolve } = require("path")

const output = generateApi({
  name: "index",
  url: "http://localhost:3000/docs-json",
  output: resolve(process.cwd(), "./src/sdk/youapp-service"),
  httpClientType: "axios",
  defaultResponseAsSuccess: true,
  extractEnums: true,
  defaultResponseType: "void",
  extractResponseError: true,
  extractRequestBody: true,
  extractResponseBody: true,
  extractRequestParams: true,
  generateResponses: true,
  cleanOutput: true,
  addReadonly: true
});