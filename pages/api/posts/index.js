import nextConnect from 'next-connect';
import multer from 'multer';
import { posts, getNextId } from '../../../lib/data';

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
  res.json(posts);
});

apiRoute.post((req, res) => {
  const newPost = {
    id: getNextId(),
    title: req.body.title,
    image: req.file ? `/uploads/${req.file.filename}` : null,
  };
  posts.push(newPost);
  res.status(201).json(newPost);
});

export default apiRoute;
export const config = {
  api: {
    bodyParser: false,
  },
};
