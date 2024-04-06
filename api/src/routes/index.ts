import { Router } from 'express';
import auth from './api/auth';
import searchUsers from './api/searchUsers';
const router = Router();

router.use('/auth', auth);
router.use('/search_users', searchUsers);

export default router;
