import path from "path";
import { generateApi } from "swagger-typescript-api";

generateApi({
  output: path.resolve(process.cwd(), "../chatable-app/services/generated"),
  url: "http://127.0.0.1:3000/doc/json",
  httpClientType: "axios",
  modular: true,
  templates: path.resolve(process.cwd(), "./swaggerTemplate"),
  singleHttpClient: true,
  hooks: {
    onBuildRoutePath: (routeData) => {
      // 这里可以修改route
      routeData.route = `${routeData.route}`;
      return routeData;
    },
  },
  moduleNameIndex: 0,
  generateClient: true,
});
