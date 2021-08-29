import { Client } from '@notionhq/client';
import { NextApiRequest, NextApiResponse } from 'next';

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export default async function getBlocks(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query as { id: string };

  if (id !== 'undefined') {
    try {
      const response = await notion.blocks.children.list({
        block_id: id,
      });
      res.send(response.results);
    } catch (error) {
      res.send(error);
    }
  } else {
    res.end();
  }
}
