"use client";
import React from "react";

type TabProps = {
  tabs: string[];
  activeTab: string;
  onTabClick: (tab: string) => void;
};

const Tabs: React.FC<TabProps> = ({ tabs, activeTab, onTabClick }) => (
  <div className="flex border-b">
    {tabs.map((tab, index) => (
      <div key={tab} className="flex items-center">
        <button
          className={`pb-2 duration-300 hover:border-main hover:text-main ${
            tab === activeTab
              ? "border-b-2 border-main text-main font-bold"
              : "text-gray-500"
          }`}
          onClick={() => onTabClick(tab)}
        >
          {tab}
        </button>
        {index < tabs.length - 1 && (
          <span className="text-gray-500 mx-2 pb-4">_</span>
        )}
      </div>
    ))}
  </div>
);

export default Tabs;
