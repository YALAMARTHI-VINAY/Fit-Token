import React from 'react';
import { useMousePosition } from '../hooks/useMousePosition';

const MouseFollower: React.FC = () => {
  const { x, y } = useMousePosition();

  return (
    <div
      className="fixed w-5 h-5 bg-white/30 rounded-full pointer-events-none z-50 backdrop-blur-sm transition-all duration-100 ease-out"
      style={{
        left: x - 10,
        top: y - 10,
      }}
    />
  );
};

export default MouseFollower;
