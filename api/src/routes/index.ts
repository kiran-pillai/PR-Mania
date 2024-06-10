import { Router } from 'express';
import auth from './api/auth';
import searchUsers from './api/users/searchUsers';
import friends from './api/users/friends';
import users from './api/users/users';
const router = Router();

router.use('/auth', auth);
router.use('/search_users', searchUsers);
router.use('/friends', friends);
router.use('/users', users);
export default router;
