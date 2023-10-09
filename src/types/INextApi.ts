import {NextApiRequest, NextApiResponse} from "next";

interface INextApi {
  req: NextApiRequest;
  res: NextApiResponse
}

export {type INextApi}