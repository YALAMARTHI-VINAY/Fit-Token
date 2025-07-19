import React, { useState, useEffect } from 'react';
import { useMousePosition } from '../hooks/useMousePosition';

interface DailyGoalProps {
  className?: string;
}

const DailyGoal: React.FC<DailyGoalProps> = ({ className = '' }) => {
  const { x, y } = useMousePosition();
  const [goalData, setGoalData] = useState({
    currentSteps: 8500,
    targetSteps: 10000,
    tokensEarned: 15,
    calories: '2.5K',
    activeMinutes: 45
  });

  // Calculate mouse-based movement (multi-directional)
  const mouseX = (x / window.innerWidth) - 0.5; // -0.5 to 0.5
  const mouseY = (y / window.innerHeight) - 0.5; // -0.5 to 0.5
  
  // Dynamic movement in all directions based on mouse position
  const transformStyle = {
    transform: `translate(${mouseX * -30}px, ${mouseY * -25}px)`,
    transition: 'transform 0.1s ease-out'
  };

  const progress = (goalData.currentSteps / goalData.targetSteps) * 100;

  // Update goal data dynamically every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setGoalData(prev => ({
        ...prev,
        currentSteps: Math.floor(Math.random() * 2000) + 8000,
        tokensEarned: Math.floor(Math.random() * 10) + 10,
        calories: (Math.random() * 1 + 2).toFixed(1) + 'K',
        activeMinutes: Math.floor(Math.random() * 20) + 35
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className={`glass p-8 max-w-md mx-auto ${className}`}
      style={transformStyle}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-white">Daily Goal</h3>
        <div className="bg-white/20 px-3 py-1 rounded-full text-sm text-white">
          🔥 7 day streak
        </div>
      </div>
      
      <div className="mb-6">
        <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden relative">
          <div 
            className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full transition-all duration-500 relative"
            style={{ width: `${Math.min(progress, 100)}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
          </div>
        </div>
        <div className="flex justify-between mt-2 text-white text-sm">
          <span>{goalData.currentSteps.toLocaleString()}</span>
          <span>/ {goalData.targetSteps.toLocaleString()} steps</span>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center text-white">
          <div className="text-2xl font-bold mb-1">{goalData.tokensEarned}</div>
          <div className="text-xs opacity-80">FitTokens</div>
        </div>
        <div className="text-center text-white">
          <div className="text-2xl font-bold mb-1">{goalData.calories}</div>
          <div className="text-xs opacity-80">Calories</div>
        </div>
        <div className="text-center text-white">
          <div className="text-2xl font-bold mb-1">{goalData.activeMinutes}</div>
          <div className="text-xs opacity-80">Minutes</div>
        </div>
      </div>
    </div>
  );
};

export default DailyGoal;
