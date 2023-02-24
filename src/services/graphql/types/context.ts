import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../schemas/user.schema";

export interface Context {
  req: NextApiRequest;
  res: NextApiResponse;
  user: User | null;
}
