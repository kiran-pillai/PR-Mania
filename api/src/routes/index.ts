import { Router } from 'express';
import auth from './api/auth';
import searchUsers from './api/searchUsers';
import friends from './api/friends';
const router = Router();

router.use('/auth', auth);
router.use('/search_users', searchUsers);
router.use('/friends', friends);
export default router;
