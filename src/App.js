
import React from 'react';
import './style.css';
import Composer from './components/Composer';
import Tabs from './components/Tabs';
import Post from './components/Post';
import { useSelector, useDispatch } from 'react-redux';
import { toggleArchive, deletePost, addMood, setTab } from './redux/postSlice';

const App = () => {
  const dispatch = useDispatch();
  const { posts, currentTab } = useSelector(state => state.posts);

  const handleMood = (postId, mood) => {
    dispatch(addMood({ postId, mood }));
  };

  const handleArchive = (postId) => {
    dispatch(toggleArchive(postId));
  };

  const handleDelete = (postId) => {
    if (window.confirm('Delete this post?')) {
      dispatch(deletePost(postId));
    }
  };

  const filteredPosts = posts.filter(post => post.archived === (currentTab === 'archive'));

  return (
    <div className="app">
      <header>
        <h1 className="logo">MoodPost</h1>
        <p className="tagline">A moodboard you can write on</p>
      </header>

      <Composer />

      <Tabs currentTab={currentTab} setTab={(tab) => dispatch(setTab(tab))} />

      <section
        className={`posts-container ${currentTab === 'feed' ? 'active' : ''}`}
        id="feedContainer"
      >
        {currentTab === 'feed' && filteredPosts.length === 0 ? (
          <div className="empty-state">
            <i className="fas fa-comment-slash"></i>
            <p>No posts yet. Be the first to share!</p>
          </div>
        ) : (
          filteredPosts.map(post => (
            <Post
              key={post.id}
              post={post}
              handleMood={handleMood}
              handleArchive={handleArchive}
              handleDelete={handleDelete}
            />
          ))
        )}
      </section>

      <section
        className={`posts-container ${currentTab === 'archive' ? 'active' : ''}`}
        id="archiveContainer"
      >
        {currentTab === 'archive' && filteredPosts.length === 0 ? (
          <div className="empty-state">
            <i className="fas fa-archive"></i>
            <p>No archived posts yet</p>
          </div>
        ) : (
          filteredPosts.map(post => (
            <Post
              key={post.id}
              post={post}
              handleMood={handleMood}
              handleArchive={handleArchive}
              handleDelete={handleDelete}
            />
          ))
        )}
      </section>
    </div>
  );
};

export default App;