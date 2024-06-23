import { Router } from 'express';
import auth from './api/auth';
import searchUsers from './api/users/searchUsers';
import friends from './api/users/friends';
import users from './api/users/users';
import chat from './api/chat/chat';
import message from './api/chat/message';
const router = Router();

router.use('/auth', auth);
router.use('/search_users', searchUsers);
router.use('/friends', friends);
router.use('/users', users);
router.use('/chat', chat);
router.use('/message', message);
export default router;
