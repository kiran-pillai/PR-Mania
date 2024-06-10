import { Router } from 'express';
import { User } from '../../../models/models';

const router = Router();

router.post('/', async (req, res) => {
  let userIds = req?.body?.users;
  if (!userIds?.length) {
    return res.status(400).send('No users provided');
  }
  let usersList = [];
  for (let userId of userIds) {
    try {
      const user = await User.findById(userId).select('-password');
      usersList.push(user);
    } catch (err) {
      return res.status(500).send(`Error fetching users ${err}`);
    }
  }
  return res.json(usersList);
});

export default router;
