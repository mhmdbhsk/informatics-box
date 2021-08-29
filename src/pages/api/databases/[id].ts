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

  try {
    const response = await notion.databases.query({
      database_id: id,
      sorts: [
        {
          property: 'Deadline',
          direction: 'descending',
        },
      ],
    });
    res.send(response.results);
  } catch (error) {
    res.send(error);
  }
}
