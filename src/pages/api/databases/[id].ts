import { Client } from '@notionhq/client';
import { NextApiRequest, NextApiResponse } from 'next';

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export default async function getDatabase(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query as { id: string };

  try {
    const responseDatabase = await notion.databases.retrieve({
      database_id: id,
    });
    const responseQuery = await notion.databases.query({
      database_id: id,
      sorts: [
        {
          property: 'Deadline',
          direction: 'descending',
        },
      ],
    });

    res.send({
      database: responseDatabase,
      results: responseQuery,
    });
  } catch (error) {
    res.send(error);
  }
}
