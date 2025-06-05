import nextConnect from 'next-connect';
import multer from 'multer';
import { posts } from '../../../lib/data';

const upload = multer({ dest: 'public/uploads' });

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Something went wrong: ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single('image'));

apiRoute.get((req, res) => {
  const post = posts.find(p => p.id === parseInt(req.query.id));
  if (!post) return res.status(404).json({ error: 'Not found' });
  res.json(post);
});

apiRoute.put((req, res) => {
  const post = posts.find(p => p.id === parseInt(req.query.id));
  if (!post) return res.status(404).json({ error: 'Not found' });
  post.title = req.body.title || post.title;
  if (req.file) {
    post.image = `/uploads/${req.file.filename}`;
  }
  res.json(post);
});

apiRoute.delete((req, res) => {
  const index = posts.findIndex(p => p.id === parseInt(req.query.id));
  if (index === -1) return res.status(404).json({ error: 'Not found' });
  const [deleted] = posts.splice(index, 1);
  res.json(deleted);
});

export default apiRoute;
export const config = {
  api: {
    bodyParser: false,
  },
};
