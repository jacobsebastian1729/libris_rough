import { Router } from 'express';
import passport from 'passport';

import {
  addBookToUserController,
  createUserController,
  getUserByUserIdController,
  getUserListController,
  logInWithPassword,
  updatePasswordController,
  updateUserByIdController,
  changeUserStatusController,
  userSubscribeAndChangeStatus,
} from '../controllers/user';

const router = Router();

router.post('/', createUserController);
router.get('/', getUserListController);
router.get('/:userId', getUserByUserIdController);
router.post('/login', logInWithPassword);
router.put(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  updateUserByIdController
);
router.put(
  '/password/:userId',
  passport.authenticate('jwt', { session: false }),
  updatePasswordController
);
router.post('/:userId/:bookId', addBookToUserController);
// router.post(
//   '/google-login',
//   passport.authenticate('google-id-token', { session: false }),
//   googleAuthenticate
// );

router.put(
  '/status/:userId',
  passport.authenticate('jwtAdmin', { session: false }),
  changeUserStatusController
);
router.put('/subscribe/:userId', userSubscribeAndChangeStatus);

export default router;
