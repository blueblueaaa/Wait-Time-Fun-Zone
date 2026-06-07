import React from 'react';
import { interactionModes } from '@/data/mockData';

const ModeSwitcher = ({ currentMode, onModeChange }) => {
  return (
    <div className="px-4 py-2 bg-white">
      <div className="grid grid-cols-4 gap-2">
        {interactionModes.map((mode) => {
          const isActive = currentMode === mode.id;
          
          return (
            <button
              key={mode.id}
              onClick={() => onModeChange(mode.id)}
              className={`
                relative p-2.5 rounded-xl text-center transition-all duration-200
                ${isActive 
                  ? 'bg-gray-900 text-white shadow-md' 
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }
              `}
            >
              <div className="text-xl mb-1">{mode.icon}</div>
              <div className="text-xs font-medium leading-tight">{mode.name}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ModeSwitcher;
