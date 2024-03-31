import { Router } from 'express';
import { User } from '../../models/models';

const router = Router();

router.post('/', async (req, res) => {
  const searchQuery = req.body.search_query;
  if (!searchQuery) {
    return res.status(400).send('No search query provided');
  }

  try {
    // Search for users
    const users = await User.find({ $text: { $search: searchQuery } });
    res.json(users); // It's a good practice to use .json() for JSON responses
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).send('Error performing search');
  }
});

export default router;
