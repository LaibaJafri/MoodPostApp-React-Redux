
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost } from '../redux/postSlice';

const Composer = () => {
  const dispatch = useDispatch();
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [charRemaining, setCharRemaining] = useState(280);
  const [postButtonText, setPostButtonText] = useState('Post');

  const updateCharCount = (e) => {
    const text = e.target.value;
    setContent(text);
    setCharRemaining(280 - text.length);
  };

  const extractHashtags = (text) => {
    const hashtags = text.match(/#\w+/g) || [];
    return [...new Set(hashtags)];
  };

  const createPost = (e) => {
    e.preventDefault();
    const trimmedContent = content.trim();
    if (!trimmedContent || trimmedContent.length > 280) return;

    const newPost = {
      id: Date.now(),
      author: author.trim() || 'Anonymous',
      content: trimmedContent,
      hashtags: extractHashtags(trimmedContent),
      moods: { happy: 0, sad: 0, fire: 0 },
      archived: false,
      timestamp: new Date().toISOString(),
    };

    dispatch(addPost(newPost));
    setAuthor('');
    setContent('');
    setCharRemaining(280);

    setPostButtonText('Posted!');
    setTimeout(() => {
      setPostButtonText('Post');
    }, 2000);
  };

  return (
    <section className="composer">
      <form id="postForm" onSubmit={createPost}>
        <div className="author-input">
          <i className="fas fa-user"></i>
          <input
            type="text"
            id="postAuthor"
            placeholder="Your name (optional)"
            value={author}
            onChange={e => setAuthor(e.target.value)}
          />
        </div>
        <textarea
          className="post-input"
          id="postContent"
          placeholder="What's on your mind? #express"
          maxLength="280"
          value={content}
          onChange={updateCharCount}
        ></textarea>
        <div className="composer-footer">
          <div
            className={`char-counter ${
              charRemaining < 20 ? 'warning' : charRemaining < 0 ? 'error' : ''
            }`}
          >
            <span id="charRemaining">{charRemaining}</span> characters left
          </div>
          <button type="submit" className="post-btn">
            <i className={`fas ${postButtonText === 'Posted!' ? 'fa-check' : 'fa-paper-plane'}`}></i>{' '}
            {postButtonText}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Composer;