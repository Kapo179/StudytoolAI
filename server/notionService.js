import { Client } from '@notionhq/client';
import dotenv from 'dotenv';

dotenv.config();

// Initialize the Notion client
const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function getPageContent(pageId) {
  const response = await notion.pages.retrieve({ page_id: pageId });
  return response;
}

export async function getBlockChildren(blockId) {
  const response = await notion.blocks.children.list({ block_id: blockId });
  return response.results;
}