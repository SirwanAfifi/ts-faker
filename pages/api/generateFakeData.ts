import { NextApiRequest, NextApiResponse } from "next";
import { generateMockData } from "../../core";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { body } = request;
  const { value, scale, numberMax } = JSON.parse(body);
  const result = await generateMockData(value, { scale, numberMax });
  response.status(200).send(result);
};
