import React, { useState } from 'react';

const Post = ({ post, handleMood, handleArchive, handleDelete }) => {
  const [floatingEmojis, setFloatingEmojis] = useState([]);

  const contentWithHashtags = post.content.split(/(#\w+)/g).map((part, index) =>
    part.match(/#\w+/) ? (
      <span key={index} className="hashtag">
        {part}
      </span>
    ) : (
      part
    )
  );

  const animateMood = (mood, emoji) => {
    const id = Date.now();
    setFloatingEmojis(prev => [...prev, { id, mood, emoji }]);
    setTimeout(() => {
      setFloatingEmojis(prev => prev.filter(e => e.id !== id));
    }, 1000);
  };

  return (
    <article className="post" data-id={post.id}>
      <div className="post-content">{contentWithHashtags}</div>
      <div className="post-meta">
        <span className="post-author">{post.author}</span>
        <span className="post-date">{new Date(post.timestamp).toLocaleString()}</span>
      </div>
      <div className="post-actions">
        <div className="mood-actions">
          <button
            className="mood-btn happy"
            data-action="mood"
            data-mood="happy"
            onClick={() => {
              handleMood(post.id, 'happy');
              animateMood('happy', '😊');
            }}
          >
            <span style={{ position: 'relative' }}>
              😊{' '}
              {floatingEmojis.map(
                e =>
                  e.mood === 'happy' && (
                    <span
                      key={e.id}
                      className="floating-emoji"
                      style={{
                        position: 'absolute',
                        fontSize: '1.5rem',
                        animation: 'floatUp 1s forwards',
                        color: 'var(--mood-happy)',
                        left: 0,
                        top: 0,
                      }}
                    >
                      {e.emoji}
                    </span>
                  )
              )}
            </span>{' '}
            <span className="mood-count">{post.moods.happy}</span>
          </button>
          <button
            className="mood-btn sad"
            data-action="mood"
            data-mood="sad"
            onClick={() => {
              handleMood(post.id, 'sad');
              animateMood('sad', '😢');
            }}
          >
            <span style={{ position: 'relative' }}>
              😢{' '}
              {floatingEmojis.map(
                e =>
                  e.mood === 'sad' && (
                    <span
                      key={e.id}
                      className="floating-emoji"
                      style={{
                        position: 'absolute',
                        fontSize: '1.5rem',
                        animation: 'floatUp 1s forwards',
                        color: 'var(--mood-sad)',
                        left: 0,
                        top: 0,
                      }}
                    >
                      {e.emoji}
                    </span>
                  )
              )}
            </span>{' '}
            <span className="mood-count">{post.moods.sad}</span>
          </button>
          <button
            className="mood-btn fire"
            data-action="mood"
            data-mood="fire"
            onClick={() => {
              handleMood(post.id, 'fire');
              animateMood('fire', '🔥');
            }}
          >
            <span style={{ position: 'relative' }}>
              🔥{' '}
              {floatingEmojis.map(
                e =>
                  e.mood === 'fire' && (
                    <span
                      key={e.id}
                      className="floating-emoji"
                      style={{
                        position: 'absolute',
                        fontSize: '1.5rem',
                        animation: 'floatUp 1s forwards',
                        color: 'var(--mood-fire)',
                        left: 0,
                        top: 0,
                      }}
                    >
                      {e.emoji}
                    </span>
                  )
              )}
            </span>{' '}
            <span className="mood-count">{post.moods.fire}</span>
          </button>
        </div>
        <div className="post-controls">
          <button
            className="control-btn"
            data-action="archive"
            onClick={() => handleArchive(post.id)}
          >
            <i className={`fas fa-${post.archived ? 'box-open' : 'archive'}`}></i>
          </button>
          <button
            className="control-btn delete"
            data-action="delete"
            onClick={() => handleDelete(post.id)}
          >
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
    </article>
  );
};

export default Post;