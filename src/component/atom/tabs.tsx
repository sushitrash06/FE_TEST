import React, { useState } from 'react';

interface TabProps {
    tabs: { label: string }[];
    setActiveTab: React.Dispatch<React.SetStateAction<string>>;
    activeTab: string | null; // Allow activeTab to be null
  }
  

const Tab: React.FC<TabProps> = ({ tabs, activeTab, setActiveTab }) => {

  return (
    <div>
      <div className="flex space-x-4 border-b border-gray-300">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`py-2 px-4 text-sm font-medium ${
              tab.label === activeTab
                ? 'text-blue-500 border-b-2 border-blue-500'
                : 'text-gray-600 hover:text-blue-500'
            }`}
            onClick={() => setActiveTab(tab.label)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tab;
