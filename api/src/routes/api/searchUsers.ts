import { Router } from 'express';
import { User } from '../../models/models';

const router = Router();

router.post('/', async (req, res) => {
  const searchQuery = req.body.search_query;
  if (!searchQuery) {
    return res.status(400).send('No search query provided');
  }

  try {
    // Perform a case-insensitive partial search
    const users = await User.find({
      name: { $regex: searchQuery, $options: 'i' },
    });
    res.json(users);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).send('Error performing search');
  }
});

export default router;
