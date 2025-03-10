"use client";
import React from "react";

type TabProps = {
  tabs: string[];
  activeTab: string;
  onTabClick: (tab: string) => void;
};

const Tabs: React.FC<TabProps> = ({ tabs, activeTab, onTabClick }) => (
  <div className="flex border-b gap-3">
    {tabs.map((tab) => (
      <div key={tab} className="flex items-center">
        <button
          className={`px-4 py-2 rounded-t-lg duration-300 ${
            tab === activeTab
              ? "bg-orange-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => onTabClick(tab)}
        >
          {tab}
        </button>
      </div>
    ))}
  </div>
);

export default Tabs;
