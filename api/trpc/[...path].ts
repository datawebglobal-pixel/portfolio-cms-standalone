// @ts-ignore
import { app as appDist } from "../../dist/app.js";

export default async function handler(req: any, res: any) {
  return appDist(req, res);
}
