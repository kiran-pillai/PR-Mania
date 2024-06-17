import { Router } from 'express';
import { decodeToken } from '../../../utils/utils';
import { User } from '../../../models/models';
const router = Router();

router.post('/', async (req, res) => {
  const decodedToken = decodeToken(req);
  const { id: userId } = decodedToken;
  const searchQuery = req.body.search_query;
  if (!searchQuery) {
    return res.status(400).send('No search query provided');
  }

  try {
    // Perform a case-insensitive partial search
    let users = await User.find({
      _id: { $ne: userId },
      name: { $regex: searchQuery, $options: 'i' },
    }).select('-password');
    res.json(users);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).send('Error performing search');
  }
});

export default router;
