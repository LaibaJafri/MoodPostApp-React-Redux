import React from 'react';

const Tabs = ({ currentTab, setTab }) => {
  return (
    <nav className="tabs">
      <button
        className={`tab ${currentTab === 'feed' ? 'active' : ''}`}
        data-tab="feed"
        onClick={() => setTab('feed')}
      >
        <i className="fas fa-stream"></i> Feed
      </button>
      <button
        className={`tab ${currentTab === 'archive' ? 'active' : ''}`}
        data-tab="archive"
        onClick={() => setTab('archive')}
      >
        <i className="fas fa-archive"></i> Archive
      </button>
    </nav>
  );
};

export default Tabs;