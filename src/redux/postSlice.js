import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: JSON.parse(localStorage.getItem('moodblog-posts')) || [],
  currentTab: 'feed',
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.unshift(action.payload);
      localStorage.setItem('moodblog-posts', JSON.stringify(state.posts));
    },
    toggleArchive: (state, action) => {
      const postId = action.payload;
      const post = state.posts.find(p => p.id === postId);
      if (post) {
        post.archived = !post.archived;
        localStorage.setItem('moodblog-posts', JSON.stringify(state.posts));
      }
    },
    deletePost: (state, action) => {
      const postId = action.payload;
      state.posts = state.posts.filter(p => p.id !== postId);
      localStorage.setItem('moodblog-posts', JSON.stringify(state.posts));
    },
    addMood: (state, action) => {
      const { postId, mood } = action.payload;
      const post = state.posts.find(p => p.id === postId);
      if (post) {
        post.moods[mood]++;
        localStorage.setItem('moodblog-posts', JSON.stringify(state.posts));
      }
    },
    setTab: (state, action) => {
      state.currentTab = action.payload;
    },
  },
});

export const { addPost, toggleArchive, deletePost, addMood, setTab } = postSlice.actions;
export default postSlice.reducer;