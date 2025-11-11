import {query} from '../db.js';

export const createPost = async (req, res) => {
    const { content } = req.body;
    console.log("Received content:", content);
    
    try {
        const insertPostQuery = `
            INSERT INTO posts (content)
            VALUES ($1)
            RETURNING id, content, created_at;
        `;
        const result = await query(insertPostQuery, [content]);
        res.json(result.rows[0]);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

export const getAllPosts = async (req, res) => {
    try{
        const getPostsQuery = `
            SELECT id, content, created_at
            FROM posts
            ORDER BY created_at DESC;
        `;
        const result = await query(getPostsQuery);
        res.json(result.rows)
    }catch (error) {
        res.status(400).json({error: error.message});
    }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteQuery = `
      DELETE FROM posts
      WHERE id = $1
      RETURNING id;
    `;
    const result = await query(deleteQuery, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
