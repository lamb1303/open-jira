// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  ok: boolean;
  message: string;
  method: string;
  secret: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const secret = process.env;
  res
    .status(200)
    .json({
      ok: true,
      message: "todo good",
      method: req.method || "",
      secret: process.env.SECRET_KEY!,
    });
  console.log(process.env);
}
