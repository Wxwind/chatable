import path from "path";
import { generateApi } from "swagger-typescript-api";

generateApi({
  output: path.resolve(process.cwd(), "../chatable-app/services"),
  url: "http://127.0.0.1:3000/api/json",
  httpClientType: "axios",
  modular: true,
  templates: path.resolve(process.cwd(), "./swaggerTemplate"),
  singleHttpClient: true,
  hooks: {
    onBuildRoutePath: (routeData) => {
      routeData.route = `/api${routeData.route}`;
      return routeData;
    },
  },
  moduleNameIndex: 1,
  generateClient: true,
});
