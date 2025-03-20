import React, { useState, useEffect } from 'react';
import './TabManager.css';



function TabManager() {
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [editingTabId, setEditingTabId] = useState(null);

  // Load from LocalStorage
  useEffect(() => {
    const savedTabs = JSON.parse(localStorage.getItem('tabs'));
    if (savedTabs && savedTabs.length > 0) {
      setTabs(savedTabs);
      setActiveTab(savedTabs[0].id);
    } else {
      const defaultTab = { id: 1, title: 'Home', content: 'MetaQuantum Network' };
      setTabs([defaultTab]);
      setActiveTab(defaultTab.id);
    }
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('tabs', JSON.stringify(tabs));
  }, [tabs]);

  const addTab = () => {
    const newTab = {
      id: Date.now(),
      title: `New Tab`,
      content: inputValue || 'New Tab Content'
    };
    setTabs([...tabs, newTab]);
    setActiveTab(newTab.id);
    setInputValue('');
  };

  const closeTab = (id) => {
    const newTabs = tabs.filter(tab => tab.id !== id);
    setTabs(newTabs);
    if (id === activeTab && newTabs.length) {
      setActiveTab(newTabs[0].id);
    } else if (newTabs.length === 0) {
      const defaultTab = { id: 1, title: 'Home', content: 'MetaQuantum Network' };
      setTabs([defaultTab]);
      setActiveTab(defaultTab.id);
    }
  };

  const updateTabTitle = (id, newTitle) => {
    setTabs(tabs.map(tab => 
      tab.id === id ? { ...tab, title: newTitle } : tab
    ));
  };

  return (
    <div className="tab-manager">
      <div className="window-controls">
        <button className="win-btn" title="Minimize">—</button>
        <button className="win-btn" title="Maximize">□</button>
        <button className="win-btn" title="Close">×</button>
      </div>

      <div className="tab-bar">
        {tabs.map(tab => (
          <div
            key={tab.id}
            className={`tab ${tab.id === activeTab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {editingTabId === tab.id ? (
              <input 
                type="text"
                value={tab.title}
                autoFocus
                onChange={(e) => updateTabTitle(tab.id, e.target.value)}
                onBlur={() => setEditingTabId(null)}
                onKeyDown={(e) => { if (e.key === 'Enter') setEditingTabId(null); }}
              />
            ) : (
              <span onDoubleClick={() => setEditingTabId(tab.id)}>
                {tab.title}
              </span>
            )}
            {tab.id !== 1 && (
              <span 
                className="close-btn" 
                onClick={(e) => { e.stopPropagation(); closeTab(tab.id); }}
                title="Close Tab"
              >×</span>
            )}
          </div>
        ))}
        <button className="add-tab-btn" onClick={addTab} title="Add New Tab">+</button>
      </div>

      <div className="tab-input">
        <button className="reload-btn" title="Reload">⟳</button>
        <input
          type="text"
          placeholder="Enter address or search..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>

      <div className="tab-content">
        {tabs.find(tab => tab.id === activeTab)?.content}
      </div>
    </div>
  );
}

export default TabManager;
