import { Router } from 'express';

import userRoutes from './user.routes';
import sessionRoutes from './session.routes';

const routes = Router();

routes.use('/user', userRoutes);
routes.use('/session', sessionRoutes);

export default routes;
