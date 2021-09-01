import { Client } from '@notionhq/client';
import { NextApiRequest, NextApiResponse } from 'next';

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export default async function getDatabase(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, sorts, sorts_property, sorts_direction } = req.query as {
    id: string;
    sorts: string;
    sorts_property: string;
    sorts_direction: 'ascending' | 'descending';
  };

  try {
    const responseDatabase = await notion.databases.retrieve({
      database_id: id,
    });
    const responseQuery = async () => {
      if (sorts === 'true') {
        return await notion.databases.query({
          database_id: id,
          sorts: [
            {
              property: sorts_property,
              direction: sorts_direction,
            },
          ],
        });
      }

      return await notion.databases.query({
        database_id: id,
      });
    };

    res.send({
      database: responseDatabase,
      results: await responseQuery(),
    });
  } catch (error) {
    res.send(error);
  }
}
