import { useState, useEffect } from 'react';

export default function Home() {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    if (image) formData.append('image', image);

    const res = await fetch('/api/posts', {
      method: 'POST',
      body: formData,
    });

    const newPost = await res.json();
    setPosts([...posts, newPost]);
    setTitle('');
    setImage(null);
  };

  const handleDelete = async id => {
    await fetch(`/api/posts/${id}`, { method: 'DELETE' });
    setPosts(posts.filter(p => p.id !== id));
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Posts</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          type="file"
          onChange={e => setImage(e.target.files[0])}
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            {post.title}
            {post.image && (
              <div>
                <img src={post.image} alt="" width={100} />
              </div>
            )}
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
