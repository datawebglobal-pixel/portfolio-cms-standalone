// @ts-ignore
import { app as appDist } from "../../dist/app.js";

export default async function handler(req: any, res: any) {
  if (typeof appDist === 'function') {
    return appDist(req, res);
  }
  return appDist.app(req, res);
}
