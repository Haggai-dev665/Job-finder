import React, { useEffect, useState } from 'react';

const ConfettiAnimation = ({ duration = 3000, onComplete }) => {
  const [particles, setParticles] = useState([]);
  const [isActive, setIsActive] = useState(true);

  const confettiColors = [
    '#000000', '#333333', '#666666', '#999999', '#CCCCCC',
    '#FFFFFF', '#F5F5F5', '#E5E5E5', '#D3D3D3', '#A9A9A9'
  ];

  const createParticle = (index) => ({
    id: index,
    x: Math.random() * window.innerWidth,
    y: -10,
    velX: (Math.random() - 0.5) * 4,
    velY: Math.random() * 3 + 2,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 10,
    color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
    size: Math.random() * 8 + 4,
    gravity: 0.1,
    life: 1.0,
    decay: Math.random() * 0.02 + 0.005
  });

  useEffect(() => {
    if (isActive) {
      setIsActive(true);
      
      // Create initial burst of particles
      const initialParticles = Array.from({ length: 50 }, (_, i) => createParticle(i));
      setParticles(initialParticles);

      const timer = setTimeout(() => {
        setIsActive(false);
        setParticles([]);
        if (onComplete) onComplete();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onComplete, isActive]);

  useEffect(() => {
    if (!isActive) return;

    const animateParticles = () => {
      setParticles(prevParticles => 
        prevParticles
          .map(particle => ({
            ...particle,
            x: particle.x + particle.velX,
            y: particle.y + particle.velY,
            velY: particle.velY + particle.gravity,
            rotation: particle.rotation + particle.rotationSpeed,
            life: particle.life - particle.decay
          }))
          .filter(particle => particle.life > 0 && particle.y < window.innerHeight + 50)
      );
    };

    const interval = setInterval(animateParticles, 16); // ~60fps
    return () => clearInterval(interval);
  }, [isActive]);

  if (!isActive || particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            transform: `rotate(${particle.rotation}deg)`,
            opacity: particle.life
          }}
        >
          <div
            className="rounded-sm"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              boxShadow: `0 0 6px ${particle.color}40`
            }}
          />
        </div>
      ))}
    </div>
  );
};

// Hook for triggering confetti
export const useConfetti = () => {
  const [trigger, setTrigger] = useState(false);

  const fireConfetti = () => {
    setTrigger(false);
    setTimeout(() => setTrigger(true), 10);
  };

  const ConfettiComponent = (props) => (
    <ConfettiAnimation 
      trigger={trigger} 
      onComplete={() => setTrigger(false)}
      {...props} 
    />
  );

  return [fireConfetti, ConfettiComponent];
};

export default ConfettiAnimation;
