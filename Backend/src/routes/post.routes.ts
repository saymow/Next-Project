import { Router } from 'express';
import { getRepository } from 'typeorm';
import authenticate from '../middlewares/Authenticate';
import Post from '../models/Post';

const routes = Router();

routes.get('/', async (req, res) => {
  const postsRepository = getRepository(Post);

  const posts = await postsRepository.find({});

  return res.send(posts);
});

routes.get('/:id', async (req, res) => {
  const { id } = req.params;
  const postsRepository = getRepository(Post);

  const posts = await postsRepository.findOne(id);

  return res.send(posts);
});

routes.get('/me', authenticate, async (req, res) => {
  const { id: author_id } = req.user;
  const postsRepository = getRepository(Post);

  const posts = await postsRepository.find({
    where: {
      author_id,
    },
  });

  return res.send(posts);
});

routes.post('/', authenticate, async (req, res) => {
  const { id } = req.user;
  const { title, description, body } = req.body;

  const postsRepository = getRepository(Post);

  const post = postsRepository.create({
    title,
    description,
    body,
    author_id: id,
  });

  await postsRepository.save(post);

  return res.status(201).send(post);
});

routes.delete('/:post_id', authenticate, async (req, res) => {
  const { id } = req.user;
  const { post_id } = req.params;

  const postsRepository = getRepository(Post);

  await postsRepository.delete({
    id: post_id,
    author_id: id,
  });

  return res.send();
});

routes.put('/', authenticate, async (req, res) => {
  const { id: author_id } = req.user;
  const { id, title, description, body } = req.body;

  const postsRepository = getRepository(Post);

  const post = await postsRepository.update(
    {
      author_id,
      id,
    },
    {
      title,
      description,
      body,
    }
  );

  return res.send(post);
});

export default routes;
