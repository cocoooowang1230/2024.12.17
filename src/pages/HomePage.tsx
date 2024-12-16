import React, { useState } from 'react';
import { Calendar, Ticket } from 'lucide-react';
import { missions } from '../data/missions';
import MissionCard from '../components/MissionCard';

const HomePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'survey' | 'social media' | 'video'>('all');
  const [currentDay, setCurrentDay] = useState(1);
  const totalDays = 30;
  const progressPercentage = (currentDay / totalDays) * 100;

  const handleFeedDog = () => {
    if (currentDay < totalDays) {
      setCurrentDay(currentDay + 1);
    }
  };

  const getDogImage = () => {
    if (currentDay >= 30) {
      return "https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80";
    } else if (currentDay >= 15) {
      return "https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80";
    } else {
      return "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80";
    }
  };

  const filteredMissions = activeCategory === 'all' 
    ? missions 
    : missions.filter(mission => mission.category === activeCategory);

  return (
    <div className="space-y-8">
      <div className="bg-custom-card rounded-lg shadow-md p-4 sm:p-6 relative">
        <div className="absolute top-4 right-4 flex space-x-4">
          <button className="text-blue-600 hover:text-blue-800">
            <Calendar size={24} />
          </button>
          <button className="text-blue-600 hover:text-blue-800">
            <Ticket size={24} />
          </button>
        </div>
        
        <div className="flex flex-col items-center">
          <img src={getDogImage()} alt="Dog" className="w-40 h-40 object-cover rounded-full mb-4" />
          <div className="w-full max-w-xs bg-gray-200 rounded-full h-10 mb-2 relative">
            <div 
              className="bg-blue-600 h-10 rounded-full transition-all duration-300" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs font-bold text-white">
              {currentDay}/{totalDays}
            </span>
          </div>
          <button 
            onClick={handleFeedDog}
            className="mb-2 bg-yellow-400 rounded-full p-2 hover:bg-yellow-500 transition-colors"
          >
            <img src="https://img.icons8.com/color/48/000000/dog-bone.png" alt="Feed Dog" className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="bg-custom-card p-4 sm:p-6 rounded-lg">
        <div className="flex flex-wrap justify-center space-x-2 space-y-2 sm:space-y-0 mb-6">
          {['all', 'survey', 'social media', 'video'].map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category as any)}
              className={`px-3 py-1 rounded-full text-sm ${
                activeCategory === category 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredMissions.map((mission) => (
            <MissionCard key={mission.id} {...mission} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;