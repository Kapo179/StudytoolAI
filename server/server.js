import express from 'express';
import { getPageContent, getBlockChildren } from './notionService.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/page/:id', async (req, res) => {
  try {
    const pageId = req.params.id;
    const pageContent = await getPageContent(pageId);
    const blockChildren = await getBlockChildren(pageId);
    res.json({ pageContent, blockChildren });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});