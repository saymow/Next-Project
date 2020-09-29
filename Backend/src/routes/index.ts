import { Router } from 'express';

import userRoutes from './user.routes';
import sessionRoutes from './session.routes';
import postRoutes from './post.routes';

const routes = Router();

routes.use('/user', userRoutes);
routes.use('/session', sessionRoutes);
routes.use('/post', postRoutes);

export default routes;
