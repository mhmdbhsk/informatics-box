// import { Client } from '@notionhq/client';

import useSWR from 'swr';
import fetcher from '../utils/fetcher';

// const notion = new Client({
//   auth: process.env.NOTION_API_KEY,
// });

// export const getDatabases = async (database_id: string) => {
//   try {
//     const response = await notion.databases.query({
//       database_id: database_id,
//       sorts: [
//         {
//           property: 'Deadline',
//           direction: 'descending',
//         },
//       ],
//     });
//     return response.results;
//   } catch (error) {
//     return error;
//   }
// };

// export const getPages = async (page_id: string) => {
//   try {
//     const response = await notion.pages.retrieve({
//       page_id: page_id,
//     });
//     return response;
//   } catch (error) {
//     return error;
//   }
// };

// export const getBlock = async (block_id: string | undefined = '') => {
//   try {
//     const response = await notion.blocks.children.list({
//       block_id: block_id,
//       page_size: 50,
//     });
//     return response.results;
//   } catch (error) {
//     return error;
//   }
// };

export const GetBlocks = (id: string) => {
  const { data, isValidating } = useSWR(`/api/blocks/${id}`, fetcher);
  return { data, isValidating };
};

export const GetDatabase = (id: string) => {
  const { data, isValidating } = useSWR(`/api/databases/${id}`, fetcher);
  return { data, isValidating };
};
