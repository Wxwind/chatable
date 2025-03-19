import path from "path";
import { generateApi } from "swagger-typescript-api";

generateApi({
  output: path.resolve(process.cwd(), "../chatable-app/services"),
  url: "http://127.0.0.1:3000/v1/api-docs",
  httpClientType: "axios",
  modular: true,
  templates: path.resolve(process.cwd(), "./swaggerTemplate"),
  hooks: {},
});
